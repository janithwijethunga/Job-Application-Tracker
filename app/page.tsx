import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black mb-6 text-6xl font-bold">
              A Better Way to track your Job Applications and Interviews
            </h1>
            <p className="text-muted-foreground mb-10 text-xl">
              Capture, organize and track your job applications and interviews
              in one place.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="h-12 px-8 text-lg font-medium">
                Start For Free
                <ArrowRight className="ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Free forever. No Credit card Required
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
