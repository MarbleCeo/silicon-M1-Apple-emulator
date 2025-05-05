
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmulatorStore } from "@/store/emulatorStore";
import { Play, Trash2 } from "lucide-react";
import { useState } from "react";

export function Console() {
  const { consoleOutput, clearConsole, sendCommand } = useEmulatorStore();
  const [command, setCommand] = useState("");
  
  const handleSendCommand = () => {
    if (command.trim()) {
      sendCommand(command);
      setCommand("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendCommand();
    }
  };
  
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Console</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={clearConsole}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Console
        </Button>
      </div>
      
      <Tabs defaultValue="emulator" className="flex-1 flex flex-col">
        <TabsList className="w-full md:w-auto md:inline-grid grid-cols-3 mb-4">
          <TabsTrigger value="emulator">Emulator</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="guest">Guest OS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="emulator" className="flex-1 flex flex-col">
          <ConsoleContent 
            output={consoleOutput.emulator}
            command={command}
            onCommandChange={setCommand}
            onSendCommand={handleSendCommand}
            onKeyDown={handleKeyDown}
          />
        </TabsContent>
        
        <TabsContent value="system" className="flex-1 flex flex-col">
          <ConsoleContent 
            output={consoleOutput.system}
            command={command}
            onCommandChange={setCommand}
            onSendCommand={handleSendCommand}
            onKeyDown={handleKeyDown}
          />
        </TabsContent>
        
        <TabsContent value="guest" className="flex-1 flex flex-col">
          <ConsoleContent 
            output={consoleOutput.guest}
            command={command}
            onCommandChange={setCommand}
            onSendCommand={handleSendCommand}
            onKeyDown={handleKeyDown}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ConsoleContent({
  output,
  command,
  onCommandChange,
  onSendCommand,
  onKeyDown
}: {
  output: string[];
  command: string;
  onCommandChange: (value: string) => void;
  onSendCommand: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <ScrollArea className="flex-1 bg-black rounded-md p-4 mb-4 apple-scrollbar">
        <div className="terminal text-white text-sm space-y-1">
          {output.map((line, index) => {
            // Colorize output based on content
            let className = "";
            if (line.toLowerCase().includes("error")) {
              className = "text-red-400";
            } else if (line.toLowerCase().includes("warning")) {
              className = "text-yellow-400";
            } else if (line.startsWith("$")) {
              className = "text-green-400";
            }
            
            return (
              <div key={index} className={className}>
                {line}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      
      <div className="flex gap-2">
        <Input
          value={command}
          onChange={(e) => onCommandChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter command..."
          className="font-mono"
        />
        <Button onClick={onSendCommand}>
          <Play className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </>
  );
}
