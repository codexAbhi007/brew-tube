"use client";
import { trpc } from "@/trpc/client";

const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({
    text: "Abhirup",
  });
  return <div>PageClient sayds : {data.greeting}</div>;
};
export default PageClient;
