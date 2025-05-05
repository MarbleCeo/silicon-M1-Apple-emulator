
import { create } from 'zustand';

// Sample data for the charts
const generateTimeData = (count: number, baseValue: number, variance: number) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const time = new Date(now.getTime() - (count - i) * 60000);
    return {
      time: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`,
      usage: Math.max(0, Math.min(100, baseValue + Math.random() * variance - variance / 2)),
      read: Math.random() * 10,
      write: Math.random() * 8,
      iops: Math.random() * 200 + 50,
      user: Math.random() * 40 + 10,
      system: Math.random() * 30 + 5,
      idle: Math.random() * 50 + 20,
      iowait: Math.random() * 10,
      used: Math.random() * 8 + 4,
      cached: Math.random() * 3 + 1,
      buffers: Math.random() * 2 + 0.5,
      free: Math.random() * 4 + 2,
    };
  });
};

interface EmulatorState {
  status: string;
  sidebarOpen: boolean;
  activeTab: string;
  systemInfo: {
    architecture: string;
    cores: number;
    memoryTotal: number;
    memoryUsed: number;
    diskSize: number;
    cpuUser: number;
    cpuSystem: number;
  };
  settings: {
    hardware: {
      cpuCores: number;
      cpuModel: string;
      memory: number;
      memoryBallooning: boolean;
      resolution: string;
      gpuAcceleration: boolean;
    };
    boot: {
      mode: string;
      diskImage: string;
      args: string;
      autoStart: boolean;
    };
    advanced: {
      qemuPath: string;
      logLevel: string;
      extraArgs: string;
      kvmEnabled: boolean;
      headless: boolean;
    };
  };
  consoleOutput: {
    emulator: string[];
    system: string[];
    guest: string[];
  };
  diskImages: any[];
  logs: any[];
  performanceData: {
    cpu: any[];
    memory: any[];
    disk: any[];
    cpuDetailed: any[];
    memoryDetailed: any[];
    diskDetailed: any[];
  };
  
  // Actions
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
  toggleEmulator: () => void;
  refreshEmulator: () => void;
  clearConsole: () => void;
  sendCommand: (command: string) => void;
  updateSettings: (section: string, key: string, value: any) => void;
  addDiskImage: (image: any) => void;
  removeDiskImage: (id: string) => void;
}

export const useEmulatorStore = create<EmulatorState>((set) => ({
  status: "stopped",
  sidebarOpen: true,
  activeTab: "dashboard",
  systemInfo: {
    architecture: "arm64 (Apple Silicon)",
    cores: 4,
    memoryTotal: 16,
    memoryUsed: 5.2,
    diskSize: 64,
    cpuUser: 35,
    cpuSystem: 18,
  },
  settings: {
    hardware: {
      cpuCores: 4,
      cpuModel: "m1",
      memory: 8,
      memoryBallooning: true,
      resolution: "1920x1080",
      gpuAcceleration: true,
    },
    boot: {
      mode: "normal",
      diskImage: "macos.img",
      args: "",
      autoStart: false,
    },
    advanced: {
      qemuPath: "/usr/local/bin/qemu-system-aarch64",
      logLevel: "info",
      extraArgs: "",
      kvmEnabled: true,
      headless: false,
    },
  },
  consoleOutput: {
    emulator: [
      "QEMU for Apple Silicon starting...",
      "Loading EFI firmware...",
      "Allocated 8192 MB memory",
      "CPU model: Apple M1 (4 cores)",
      "Graphics acceleration: enabled",
      "Boot order: hd0",
      "$ _"
    ],
    system: [
      "$ cd /path/to/qemu-t8030",
      "$ ./build.sh",
      "Building QEMU dependencies...",
      "Configuring QEMU...",
      "Building QEMU...",
      "QEMU build complete.",
      "$ _"
    ],
    guest: [
      "Starting macOS...",
      "Loading kernel...",
      "Darwin Kernel Version 21.0.0",
      "Boot args: -v",
      "ACPI initialized",
      "Found CPU0: Apple M1 Core",
      "Memory: 8192 MB",
      "macOS > _"
    ],
  },
  diskImages: [
    {
      id: "1",
      name: "macos.img",
      size: 16 * 1024 * 1024 * 1024,
      path: "/path/to/macos.img",
      date: "2023-04-15T10:30:00Z",
      type: "QCOW2"
    },
    {
      id: "2",
      name: "installer.img",
      size: 12 * 1024 * 1024 * 1024,
      path: "/path/to/installer.img",
      date: "2023-02-28T14:22:10Z",
      type: "RAW"
    }
  ],
  logs: [
    {
      timestamp: "2023-05-10 14:32:45",
      level: "info",
      type: "emulator",
      message: "QEMU emulator initialized"
    },
    {
      timestamp: "2023-05-10 14:33:12",
      level: "info",
      type: "system",
      message: "Loading EFI firmware"
    },
    {
      timestamp: "2023-05-10 14:33:18",
      level: "warning",
      type: "hardware",
      message: "GPU acceleration partially supported"
    },
    {
      timestamp: "2023-05-10 14:33:25",
      level: "info",
      type: "guest",
      message: "Guest OS booting"
    },
    {
      timestamp: "2023-05-10 14:34:10",
      level: "error",
      type: "emulator",
      message: "Failed to initialize audio device",
      details: "Error: Device 'hda-output' not found in registry"
    },
    {
      timestamp: "2023-05-10 14:35:02",
      level: "info",
      type: "system",
      message: "Network interfaces configured"
    },
    {
      timestamp: "2023-05-10 14:35:30",
      level: "debug",
      type: "emulator",
      message: "Memory allocation: 8192MB"
    },
    {
      timestamp: "2023-05-10 14:36:15",
      level: "info",
      type: "guest",
      message: "macOS kernel loaded successfully"
    },
    {
      timestamp: "2023-05-10 14:37:22",
      level: "warning",
      type: "hardware",
      message: "USB controller in compatibility mode"
    },
    {
      timestamp: "2023-05-10 14:38:45",
      level: "error",
      type: "guest",
      message: "Kernel panic detected",
      details: "panic(cpu 0 caller 0xffffff8010abc1e3): \"Unable to find driver for this platform: \"Apple M1\".\""
    }
  ],
  performanceData: {
    cpu: generateTimeData(30, 40, 30),
    memory: generateTimeData(30, 50, 20),
    disk: generateTimeData(30, 5, 8),
    cpuDetailed: generateTimeData(60, 40, 30),
    memoryDetailed: generateTimeData(60, 50, 20),
    diskDetailed: generateTimeData(60, 5, 8),
  },

  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  toggleEmulator: () => set(state => {
    if (state.status === "running") {
      return { 
        status: "stopped",
        consoleOutput: {
          ...state.consoleOutput,
          emulator: [...state.consoleOutput.emulator, "Stopping QEMU emulator...", "QEMU stopped."]
        }
      };
    } else {
      return { 
        status: "waiting",
        consoleOutput: {
          ...state.consoleOutput,
          emulator: [...state.consoleOutput.emulator, "Starting QEMU emulator...", "Initializing virtual hardware..."]
        }
      };
    }
  }),
  
  refreshEmulator: () => set(state => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    return {
      status: state.status === "waiting" ? "running" : state.status,
      consoleOutput: {
        ...state.consoleOutput,
        emulator: [...state.consoleOutput.emulator, `[${timeString}] Refreshing emulator state...`]
      }
    };
  }),
  
  clearConsole: () => set(state => ({
    consoleOutput: {
      emulator: [],
      system: [],
      guest: []
    }
  })),
  
  sendCommand: (command) => set(state => ({
    consoleOutput: {
      ...state.consoleOutput,
      emulator: [...state.consoleOutput.emulator, `$ ${command}`, "Executing command...", "Command completed."]
    }
  })),
  
  updateSettings: (section, key, value) => set(state => ({
    settings: {
      ...state.settings,
      [section]: {
        ...state.settings[section as keyof typeof state.settings],
        [key]: value
      }
    }
  })),
  
  addDiskImage: (image) => set(state => ({
    diskImages: [...state.diskImages, image]
  })),
  
  removeDiskImage: (id) => set(state => ({
    diskImages: state.diskImages.filter(image => image.id !== id)
  }))
}));
