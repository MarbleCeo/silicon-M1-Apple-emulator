
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useEmulatorStore } from "@/store/emulatorStore";
import { Dashboard } from "./tabs/Dashboard";
import { Settings } from "./tabs/Settings";
import { Console } from "./tabs/Console";
import { DiskImages } from "./tabs/DiskImages";
import { Performance } from "./tabs/Performance";
import { Logs } from "./tabs/Logs";

export function Layout() {
  const { activeTab, sidebarOpen } = useEmulatorStore();
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "disk-images":
        return <DiskImages />;
      case "settings":
        return <Settings />;
      case "console":
        return <Console />;
      case "performance":
        return <Performance />;
      case "logs":
        return <Logs />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className={`flex-1 overflow-auto transition-all duration-200 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}
