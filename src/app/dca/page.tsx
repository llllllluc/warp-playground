import { Metadata } from "next";

import { DcaOrderPage } from "@/components/page/DcaOrder";

export const metadata: Metadata = {
  title: "Warp Playground | DCA Order",
  description: "Dollar Cost Average into your favorite crypto assets",
};

const Page = () => {
  return <DcaOrderPage />;
};

export default Page;
