import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function AppLayout() {
  return (
    <div className="max-w-[90%] mx-auto py-8 md:max-w-[80%] xl:max-w-1/2">
      <Outlet />
      <Toaster position="top-right" richColors />
    </div>
  );
}
