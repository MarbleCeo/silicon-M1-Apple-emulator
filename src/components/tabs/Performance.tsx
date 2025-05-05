
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmulatorStore } from "@/store/emulatorStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from 'recharts';

export function Performance() {
  const { performanceData } = useEmulatorStore();
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Performance</h2>
        <div className="text-sm text-muted-foreground">
          Refresh Rate: 5s
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="disk">Disk I/O</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="shadow-apple">
              <CardHeader className="pb-2">
                <CardTitle>CPU Usage</CardTitle>
                <CardDescription>Past 30 minutes</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData.cpu} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0071e3" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0071e3" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="usage" stroke="#0071e3" fillOpacity={1} fill="url(#colorCpu)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-apple">
              <CardHeader className="pb-2">
                <CardTitle>Memory Usage</CardTitle>
                <CardDescription>Past 30 minutes</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData.memory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#34c759" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#34c759" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="usage" stroke="#34c759" fillOpacity={1} fill="url(#colorMem)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-apple lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Disk I/O</CardTitle>
                <CardDescription>Read/Write operations</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData.disk} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="read" fill="#007bff" name="Read (MB/s)" />
                      <Bar dataKey="write" fill="#ff9500" name="Write (MB/s)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="cpu" className="space-y-4">
          <Card className="shadow-apple">
            <CardHeader>
              <CardTitle>CPU Usage</CardTitle>
              <CardDescription>Detailed CPU utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData.cpuDetailed}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="user" stroke="#0071e3" name="User" />
                    <Line type="monotone" dataKey="system" stroke="#5e5ce6" name="System" />
                    <Line type="monotone" dataKey="idle" stroke="#8e8e93" name="Idle" />
                    <Line type="monotone" dataKey="iowait" stroke="#ff3b30" name="I/O Wait" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Average Load" 
              value="1.24" 
              change="+0.08" 
              changeType="increase" 
            />
            <StatCard 
              title="Max CPU" 
              value="78%" 
              change="-5%" 
              changeType="decrease" 
            />
            <StatCard 
              title="Context Switches" 
              value="1.2K/s" 
              change="+120" 
              changeType="increase" 
            />
            <StatCard 
              title="Interrupts" 
              value="856/s" 
              change="-42" 
              changeType="decrease" 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="memory" className="space-y-4">
          <Card className="shadow-apple">
            <CardHeader>
              <CardTitle>Memory Usage</CardTitle>
              <CardDescription>Detailed memory allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData.memoryDetailed}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" stackId="1" dataKey="used" stroke="#34c759" fill="#34c759" name="Used" />
                    <Area type="monotone" stackId="1" dataKey="cached" stroke="#5ac8fa" fill="#5ac8fa" name="Cached" />
                    <Area type="monotone" stackId="1" dataKey="buffers" stroke="#ffcc00" fill="#ffcc00" name="Buffers" />
                    <Area type="monotone" stackId="1" dataKey="free" stroke="#e5e5ea" fill="#e5e5ea" name="Free" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Memory" 
              value="16.0 GB" 
              change="0" 
              changeType="neutral" 
            />
            <StatCard 
              title="Active Memory" 
              value="5.8 GB" 
              change="+0.4 GB" 
              changeType="increase" 
            />
            <StatCard 
              title="Swap Used" 
              value="0.2 GB" 
              change="-0.1 GB" 
              changeType="decrease" 
            />
            <StatCard 
              title="Page Faults" 
              value="42/s" 
              change="-8" 
              changeType="decrease" 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="disk" className="space-y-4">
          <Card className="shadow-apple">
            <CardHeader>
              <CardTitle>Disk I/O</CardTitle>
              <CardDescription>Read and write operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData.diskDetailed}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="read" stroke="#007bff" name="Read (MB/s)" />
                    <Line type="monotone" dataKey="write" stroke="#ff9500" name="Write (MB/s)" />
                    <Line type="monotone" dataKey="iops" stroke="#af52de" name="IOPS" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Read" 
              value="2.4 GB" 
              change="+0.8 GB" 
              changeType="increase" 
            />
            <StatCard 
              title="Total Write" 
              value="1.2 GB" 
              change="+0.3 GB" 
              changeType="increase" 
            />
            <StatCard 
              title="Average Latency" 
              value="4.2 ms" 
              change="-0.8 ms" 
              changeType="decrease" 
            />
            <StatCard 
              title="Disk Utilization" 
              value="24%" 
              change="+5%" 
              changeType="increase" 
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  change, 
  changeType 
}: { 
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
}) {
  return (
    <Card className="shadow-apple">
      <CardContent className="pt-6">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm font-medium text-muted-foreground mt-1">{title}</div>
        <div className={`text-xs mt-2 ${
          changeType === "increase" 
            ? "text-green-600" 
            : changeType === "decrease" 
              ? "text-red-600" 
              : "text-muted-foreground"
        }`}>
          {changeType === "increase" && "↑ "}
          {changeType === "decrease" && "↓ "}
          {change} from previous
        </div>
      </CardContent>
    </Card>
  );
}
