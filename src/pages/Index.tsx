
import { Layout } from "@/components/Layout";
import { Toaster } from "sonner";

const Index = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Toaster position="top-right" />
      <Layout />
    </div>
  );
};

export default Index;
