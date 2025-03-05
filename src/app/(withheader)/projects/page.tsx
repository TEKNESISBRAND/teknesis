"use client";

import { useEffect, useState } from "react";
import ProjectsPage from "@/teknesis/components/ProjectsPage";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <ProjectsPage />;
}
