import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl font-bold text-text-primary">
        404
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-8">
        <Button href="/">Go Home</Button>
      </div>
    </div>
  );
}
