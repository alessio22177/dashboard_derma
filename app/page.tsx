import { DashboardHeader } from "@/components/dashboard-header";
import { MetadataFormV2 } from "@/components/metadata-form-v2";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <>
      <DashboardHeader>
        <MetadataFormV2 />
      </DashboardHeader>
      <Toaster position="top-right" richColors />
    </>
  );
}
