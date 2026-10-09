// app/profile/cv-actions.ts
"use server";

import { getSession } from "@/lib/auth/auth";
import { mongoDb } from "@/lib/mongodb";
import { ObjectId, Filter, Document } from "mongodb";
import { revalidatePath } from "next/cache";

function getFilter(userId: string): Filter<Document> {
  return ObjectId.isValid(userId)
    ? { _id: new ObjectId(userId) as any }
    : { _id: userId as any };
}

// 1. Upload & save CV directly to user document
export async function uploadCVAction(cvPayload: {
  name: string;
  size: string;
  data: string; // Base64 Data URL
}) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const collection = mongoDb.collection("user");

    await collection.updateOne(getFilter(session.user.id), {
      $set: {
        cv: {
          name: cvPayload.name,
          size: cvPayload.size,
          data: cvPayload.data,
          uploadedAt: new Date(),
        },
      },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error: any) {
    console.error("CV Upload Error:", error);
    return { success: false, error: error.message || "Failed to upload CV" };
  }
}

// 2. Remove CV from user document
export async function deleteCVAction() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const collection = mongoDb.collection("user");

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

// 3. Fetch stored CV on page load
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
      uploadedAt: new Date(userDoc.cv.uploadedAt).toLocaleDateString(),
      data: userDoc.cv.data,
    };
  } catch (error) {
    console.error("Fetch CV Error:", error);
    return null;
  }
}
