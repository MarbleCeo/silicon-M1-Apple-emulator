
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useEmulatorStore } from "@/store/emulatorStore";
import { Download, Search } from "lucide-react";
import { useState } from "react";

export function Logs() {
  const { logs } = useEmulatorStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [logType, setLogType] = useState("all");
  const [logLevel, setLogLevel] = useState("all");
  
  // Filter logs based on search term, log type and log level
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === "" || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = logType === "all" || log.type === logType;
    
    const matchesLevel = logLevel === "all" || log.level === logLevel;
    
    return matchesSearch && matchesType && matchesLevel;
  });
  
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">System Logs</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>
      
      <Card className="mb-4 p-3 flex flex-wrap gap-3 shadow-apple">
        <div className="relative w-full md:w-auto flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={logType} onValueChange={setLogType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Log type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="emulator">Emulator</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="guest">Guest OS</SelectItem>
              <SelectItem value="hardware">Hardware</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={logLevel} onValueChange={setLogLevel}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Log level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
      
      <div className="flex-1 bg-slate-50 rounded-md border border-slate-200 overflow-hidden">
        <ScrollArea className="h-full apple-scrollbar">
          <div className="divide-y divide-slate-200">
            {filteredLogs.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                No logs match your filter criteria
              </div>
            ) : (
              filteredLogs.map((log, index) => (
                <LogEntry key={index} log={log} />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filteredLogs.length} of {logs.length} log entries
      </div>
    </div>
  );
}

function LogEntry({ log }: { log: any }) {
  return (
    <div className="p-3 hover:bg-slate-100 transition-colors">
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center gap-2">
          <LogLevelBadge level={log.level} />
          <span className="font-medium">[{log.type}]</span>
        </div>
        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
      </div>
      <p className="text-sm">{log.message}</p>
      {log.details && (
        <>
          <Separator className="my-2" />
          <div className="text-xs font-mono bg-slate-100 p-2 rounded">
            {log.details}
          </div>
        </>
      )}
    </div>
  );
}

function LogLevelBadge({ level }: { level: string }) {
  const levelClasses = {
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    debug: "bg-green-100 text-green-800",
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelClasses[level as keyof typeof levelClasses]}`}>
      {level}
    </span>
  );
}
