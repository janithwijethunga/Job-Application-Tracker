"use server";

import { getSession } from "@/lib/auth/auth";
import { mongoDb } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { ObjectId, Filter, Document } from "mongodb";
import { revalidatePath } from "next/cache";

function getFilter(userId: string): Filter<Document> {
  return ObjectId.isValid(userId)
    ? ({ _id: new ObjectId(userId) } as Filter<Document>)
    : ({ _id: userId } as any);
}

// Helper to extract Cloudinary public_id from existing URL
function getCloudinaryPublicIdFromUrl(url: string): string | null {
  try {
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;

    const pathAfterUpload = url.slice(uploadIndex + "/upload/".length);
    const pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, "");
    return pathWithoutVersion.replace(/\.[^/.]+\$/, "");
  } catch {
    return null;
  }
}

// 1. Upload Avatar into "jobright/avatars" & Clean Old Avatar
export async function uploadAvatarAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };

    const collection = mongoDb.collection("user");

    // Retrieve existing user record to check for an old avatar
    const currentUser = await collection.findOne(getFilter(session.user.id), {
      projection: { image: 1, avatarPublicId: 1 },
    });

    const oldPublicId =
      currentUser?.avatarPublicId ||
      (currentUser?.image && currentUser.image.includes("res.cloudinary.com")
        ? getCloudinaryPublicIdFromUrl(currentUser.image)
        : null);

    // Delete existing avatar from Cloudinary
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId, {
          resource_type: "image",
          invalidate: true,
        });
      } catch (err) {
        console.warn("Could not delete previous avatar:", err);
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Unique filename without folder prefix
    const fileName = `avatar_${session.user.id}_${Date.now()}`;

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "jobright/avatars", // Targets the jobright/avatars folder
          public_id: fileName,
          overwrite: true,
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto", fetch_format: "webp" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const secureUrl = uploadResult.secure_url;
    const fullPublicId = uploadResult.public_id; // Will be "jobright/avatars/avatar_..."

    await collection.updateOne(getFilter(session.user.id), {
      $set: {
        image: secureUrl,
        avatarPublicId: fullPublicId,
      },
    });

    revalidatePath("/profile");
    return { success: true, url: secureUrl };
  } catch (error: any) {
    console.error("Avatar Upload Error:", error);
    return { success: false, error: error.message || "Failed to upload avatar" };
  }
}

// 2. Upload CV into "jobright/cvs"
export async function uploadCVAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };

    const collection = mongoDb.collection("user");

    // Check if an existing CV is already stored and delete it from Cloudinary
    const currentUser = await collection.findOne(getFilter(session.user.id), {
      projection: { cv: 1 },
    });

    if (currentUser?.cv?.publicId) {
      try {
        await cloudinary.uploader.destroy(currentUser.cv.publicId, {
          resource_type: "raw",
          invalidate: true,
        });
      } catch (err) {
        console.warn("Could not delete previous CV:", err);
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const sizeInMb = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    // Extract original extension (e.g., "pdf" or "docx")
    const extension = file.name.split(".").pop() || "pdf";

    // For raw resources, include the extension directly in the public ID
    const fileName = `cv_${session.user.id}_${Date.now()}.${extension}`;

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "jobright/cvs",
          public_id: fileName,
          resource_type: "raw",
          type: "upload",
          access_mode: "public",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const cvData = {
      name: file.name,
      size: sizeInMb,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      uploadedAt: new Date(),
    };

    await collection.updateOne(getFilter(session.user.id), {
      $set: { cv: cvData },
    });

    revalidatePath("/profile");
    return { success: true, cv: { ...cvData, uploadedAt: "Just now" } };
  } catch (error: any) {
    console.error("CV Upload Error:", error);
    return { success: false, error: error.message || "Failed to upload CV" };
  }
}

// 3. Delete CV
export async function deleteCVAction() {
  try {
    const session = await getSession();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const collection = mongoDb.collection("user");
    const userDoc = await collection.findOne(getFilter(session.user.id), {
      projection: { cv: 1 },
    });

    if (userDoc?.cv?.publicId) {
      await cloudinary.uploader.destroy(userDoc.cv.publicId, {
        resource_type: "raw",
        invalidate: true,
      });
    }

    await collection.updateOne(getFilter(session.user.id), {
      $unset: { cv: "" },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error: any) {
    console.error("CV Delete Error:", error);
    return { success: false, error: error.message || "Failed to delete CV" };
  }
}

// 4. Retrieve CV Metadata
export async function getCVAction() {
  try {
    const session = await getSession();
    if (!session?.user?.id) return null;

    const collection = mongoDb.collection("user");
    const userDoc = await collection.findOne(getFilter(session.user.id), {
      projection: { cv: 1 },
    });

    if (!userDoc?.cv) return null;

    return {
      name: userDoc.cv.name,
      size: userDoc.cv.size,
      url: userDoc.cv.url,
      uploadedAt: new Date(userDoc.cv.uploadedAt).toLocaleDateString(),
    };
  } catch (error) {
    console.error("Fetch CV Error:", error);
    return null;
  }
}