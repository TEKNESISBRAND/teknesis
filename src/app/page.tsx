import React from "react";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("@/teknesis/components/Home"), {
  ssr: false,
});

const Page = () => {
  return <>{typeof window !== "undefined" && <Home />}</>;
};

export default Page;
