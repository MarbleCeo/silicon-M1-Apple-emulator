
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEmulatorStore } from "@/store/emulatorStore";

export function Dashboard() {
  const { status, systemInfo } = useEmulatorStore();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Card className="shadow-apple">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">System Status</CardTitle>
          <CardDescription>Current emulator status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`status-indicator ${status}`} />
            <div className="text-lg font-medium">
              {status === "running" ? "Running" : status === "waiting" ? "Starting..." : "Stopped"}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-apple">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">CPU Usage</CardTitle>
          <CardDescription>Current CPU utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>User: {systemInfo.cpuUser}%</span>
                <span className="text-muted-foreground">{systemInfo.cpuUser}/100</span>
              </div>
              <Progress value={systemInfo.cpuUser} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>System: {systemInfo.cpuSystem}%</span>
                <span className="text-muted-foreground">{systemInfo.cpuSystem}/100</span>
              </div>
              <Progress value={systemInfo.cpuSystem} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-apple">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Memory Usage</CardTitle>
          <CardDescription>Current memory allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Used: {systemInfo.memoryUsed} GB</span>
              <span className="text-muted-foreground">
                {systemInfo.memoryUsed}/{systemInfo.memoryTotal} GB
              </span>
            </div>
            <Progress 
              value={(systemInfo.memoryUsed / systemInfo.memoryTotal) * 100} 
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-apple md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Emulator Configuration</CardTitle>
          <CardDescription>Current system configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Architecture</h3>
              <p className="mt-1">{systemInfo.architecture}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">CPU Cores</h3>
              <p className="mt-1">{systemInfo.cores}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">RAM</h3>
              <p className="mt-1">{systemInfo.memoryTotal} GB</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Disk</h3>
              <p className="mt-1">{systemInfo.diskSize} GB</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-apple lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Commands</CardTitle>
          <CardDescription>Frequently used emulator commands</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <CommandCard
              title="Update QEMU"
              description="Update the QEMU emulator to the latest version"
              command="git pull && make"
            />
            <CommandCard
              title="Clean Build"
              description="Rebuild the emulator from scratch"
              command="make clean && make"
            />
            <CommandCard
              title="Start with Verbose"
              description="Run the emulator with verbose logging"
              command="./run.sh -v"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CommandCard({ 
  title, 
  description, 
  command 
}: { 
  title: string;
  description: string;
  command: string;
}) {
  return (
    <div className="rounded-md border border-slate-200 p-3 hover:bg-slate-50 transition-colors">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
      <div className="mt-2 code-block text-xs p-2">
        $ {command}
      </div>
    </div>
  );
}
