"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function InstructorsRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const address = params.get("address")?.trim();

    if (!address) {
      params.delete("instructors");
      const query = params.toString();
      router.replace(query ? `/drive?${query}` : "/drive");
      return;
    }

    params.set("instructors", "1");
    router.replace(`/drive?${params.toString()}`);
  }, [router, searchParams]);

  return null;
}

export default function DriveInstructorsPage() {
  return (
    <Suspense fallback={null}>
      <InstructorsRedirect />
    </Suspense>
  );
}
