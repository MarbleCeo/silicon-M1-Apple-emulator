
import { ChevronLeft, ChevronRight, Menu, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmulatorStore } from "@/store/emulatorStore";

export function Navbar() {
  const { toggleSidebar, sidebarOpen, status, toggleEmulator, refreshEmulator } = useEmulatorStore();

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-14 flex items-center px-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <h1 className="text-lg font-medium ml-2">QEMU M1 Silicon GUI</h1>
      </div>
      
      <div className="ml-auto flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshEmulator}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
        
        <Button 
          variant={status === "running" ? "destructive" : "default"} 
          size="sm"
          onClick={toggleEmulator}
        >
          {status === "running" ? "Stop Emulator" : "Start Emulator"}
        </Button>
      </div>
    </div>
  );
}
