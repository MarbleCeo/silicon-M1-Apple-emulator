
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEmulatorStore } from "@/store/emulatorStore";
import { 
  CpuIcon, FileIcon, HardDriveIcon, 
  MonitorIcon, SettingsIcon, TerminalIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  icon: React.ElementType;
  label: string;
  value: string;
};

const navItems: NavItem[] = [
  { icon: MonitorIcon, label: "Dashboard", value: "dashboard" },
  { icon: HardDriveIcon, label: "Disk Images", value: "disk-images" },
  { icon: SettingsIcon, label: "Settings", value: "settings" },
  { icon: TerminalIcon, label: "Console", value: "console" },
  { icon: CpuIcon, label: "Performance", value: "performance" },
  { icon: FileIcon, label: "Logs", value: "logs" },
];

export function Sidebar() {
  const { sidebarOpen, activeTab, setActiveTab } = useEmulatorStore();

  if (!sidebarOpen) return null;

  return (
    <div className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4">
        <h2 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">
          Emulator Controls
        </h2>
      </div>
      <Separator />
      <div className="py-4 flex-1">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant="ghost"
              className={cn(
                "w-full justify-start text-slate-800 font-medium text-sm",
                activeTab === item.value && "bg-slate-100"
              )}
              onClick={() => setActiveTab(item.value)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
      <Separator />
      <div className="p-4">
        <div className="rounded-md bg-slate-50 p-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <StatusIndicator status={useEmulatorStore().status} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                {getStatusText(useEmulatorStore().status)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  return (
    <div className={`status-indicator ${status}`} />
  );
}

function getStatusText(status: string): string {
  switch (status) {
    case "running":
      return "Emulator Running";
    case "stopped":
      return "Emulator Stopped";
    case "waiting":
      return "Starting Emulator...";
    default:
      return "Unknown Status";
  }
}
