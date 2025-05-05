
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmulatorStore } from "@/store/emulatorStore";
import { toast } from "sonner";

export function Settings() {
  const { settings, updateSettings } = useEmulatorStore();
  
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Emulator Settings</h2>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="hardware">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-4">
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="boot">Boot Options</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hardware" className="space-y-4">
          <Card className="shadow-apple">
            <CardHeader>
              <CardTitle>CPU Configuration</CardTitle>
              <CardDescription>
                Configure the virtual CPU settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="cpu-cores">CPU Cores</Label>
                  <span className="text-sm text-muted-foreground">{settings.hardware.cpuCores} cores</span>
                </div>
                <Slider 
                  id="cpu-cores"
                  min={1}
                  max={8}
                  step={1}
                  value={[settings.hardware.cpuCores]}
                  onValueChange={(value) => updateSettings("hardware", "cpuCores", value[0])}
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="cpu-model">CPU Model</Label>
                <Select 
                  value={settings.hardware.cpuModel} 
                  onValueChange={(value) => updateSettings("hardware", "cpuModel", value)}
                >
                  <SelectTrigger id="cpu-model">
                    <SelectValue placeholder="Select a CPU model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m1">Apple M1</SelectItem>
                    <SelectItem value="m1pro">Apple M1 Pro</SelectItem>
                    <SelectItem value="m1max">Apple M1 Max</SelectItem>
                    <SelectItem value="m1ultra">Apple M1 Ultra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-apple">
            <CardHeader>
              <CardTitle>Memory Settings</CardTitle>
              <CardDescription>
                Configure the virtual memory allocation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="memory">System Memory</Label>
                  <span className="text-sm text-muted-foreground">{settings.hardware.memory} GB</span>
                </div>
                <Slider 
                  id="memory"
                  min={2}
                  max={16}
                  step={2}
                  value={[settings.hardware.memory]}
                  onValueChange={(value) => updateSettings("hardware", "memory", value[0])}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="swap">Enable Memory Ballooning</Label>
                  <p className="text-sm text-muted-foreground">
                    Dynamically adjust memory allocation
                  </p>
                </div>
                <Switch 
                  id="swap"
                  checked={settings.hardware.memoryBallooning}
                  onCheckedChange={(value) => updateSettings("hardware", "memoryBallooning", value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-apple">
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Configure the virtual display output
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="resolution">Screen Resolution</Label>
                <Select 
                  value={settings.hardware.resolution} 
                  onValueChange={(value) => updateSettings("hardware", "resolution", value)}
                >
                  <SelectTrigger id="resolution">
                    <SelectValue placeholder="Select a resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1280x720">1280 × 720 (HD)</SelectItem>
                    <SelectItem value="1920x1080">1920 × 1080 (Full HD)</SelectItem>
                    <SelectItem value="2560x1440">2560 × 1440 (QHD)</SelectItem>
                    <SelectItem value="3840x2160">3840 × 2160 (4K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="acceleration">GPU Acceleration</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable hardware acceleration
                  </p>
                </div>
                <Switch 
                  id="acceleration"
                  checked={settings.hardware.gpuAcceleration}
                  onCheckedChange={(value) => updateSettings("hardware", "gpuAcceleration", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="boot" className="space-y-4">
          <Card className="shadow-apple">
            <CardHeader>
              <CardTitle>Boot Options</CardTitle>
              <CardDescription>
                Configure how the emulator boots
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="boot-mode">Boot Mode</Label>
                <Select 
                  value={settings.boot.mode} 
                  onValueChange={(value) => updateSettings("boot", "mode", value)}
                >
                  <SelectTrigger id="boot-mode">
                    <SelectValue placeholder="Select a boot mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="recovery">Recovery Mode</SelectItem>
                    <SelectItem value="diagnostics">Diagnostics</SelectItem>
                    <SelectItem value="verbose">Verbose</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="boot-image">Boot Image</Label>
                <Select 
                  value={settings.boot.diskImage} 
                  onValueChange={(value) => updateSettings("boot", "diskImage", value)}
                >
                  <SelectTrigger id="boot-image">
                    <SelectValue placeholder="Select a boot image" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macos.img">macos.img</SelectItem>
                    <SelectItem value="installer.img">installer.img</SelectItem>
                    <SelectItem value="recovery.img">recovery.img</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="boot-args">Boot Arguments</Label>
                <Input 
                  id="boot-args"
                  value={settings.boot.args}
                  onChange={(e) => updateSettings("boot", "args", e.target.value)}
                  placeholder="-v debug=0x100" 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Custom kernel boot arguments
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-boot">Auto Boot</Label>
                  <p className="text-sm text-muted-foreground">
                    Start the emulator automatically
                  </p>
                </div>
                <Switch 
                  id="auto-boot"
                  checked={settings.boot.autoStart}
                  onCheckedChange={(value) => updateSettings("boot", "autoStart", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card className="shadow-apple">
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
              <CardDescription>
                Advanced emulator configuration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="qemu-path">QEMU Path</Label>
                <Input 
                  id="qemu-path"
                  value={settings.advanced.qemuPath}
                  onChange={(e) => updateSettings("advanced", "qemuPath", e.target.value)}
                  placeholder="/usr/local/bin/qemu" 
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="log-level">Log Level</Label>
                <Select 
                  value={settings.advanced.logLevel} 
                  onValueChange={(value) => updateSettings("advanced", "logLevel", value)}
                >
                  <SelectTrigger id="log-level">
                    <SelectValue placeholder="Select log level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="trace">Trace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="qemu-args">Additional QEMU Arguments</Label>
                <Input 
                  id="qemu-args"
                  value={settings.advanced.extraArgs}
                  onChange={(e) => updateSettings("advanced", "extraArgs", e.target.value)}
                  placeholder="-device usb-mouse -usb" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="kvm">Enable KVM Acceleration</Label>
                  <p className="text-sm text-muted-foreground">
                    Use KVM virtualization when available
                  </p>
                </div>
                <Switch 
                  id="kvm"
                  checked={settings.advanced.kvmEnabled}
                  onCheckedChange={(value) => updateSettings("advanced", "kvmEnabled", value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="headless">Headless Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Run without a graphical display
                  </p>
                </div>
                <Switch 
                  id="headless"
                  checked={settings.advanced.headless}
                  onCheckedChange={(value) => updateSettings("advanced", "headless", value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-apple bg-red-50 border-red-100">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription className="text-red-500">
                These actions are potentially destructive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="destructive"
                className="w-full"
                onClick={() => toast.error("This action requires confirmation", {
                  description: "Please confirm this action in a real implementation"
                })}
              >
                Reset All Settings to Default
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
