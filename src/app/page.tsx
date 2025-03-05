"use client";

import { useEffect, useState } from "react";
import Home from "@/teknesis/components/Home";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <Home />;
}
