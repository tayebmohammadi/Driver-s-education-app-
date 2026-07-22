"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DriveBookPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/drive?book=1");
  }, [router]);

  return null;
}
