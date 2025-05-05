
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEmulatorStore } from "@/store/emulatorStore";
import { Download, FileIcon, HardDriveIcon, Plus, Trash2, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export function DiskImages() {
  const { diskImages, addDiskImage, removeDiskImage } = useEmulatorStore();
  const [open, setOpen] = useState(false);
  
  const handleImageUpload = (formData: any) => {
    // In a real app, we would handle file upload here
    const newImage = {
      id: Date.now().toString(),
      name: formData.name,
      size: formData.size,
      path: `/path/to/${formData.name}`,
      date: new Date().toISOString(),
      type: formData.type
    };
    
    addDiskImage(newImage);
    setOpen(false);
    toast.success("Disk image added successfully!");
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Disk Images</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Disk Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <NewDiskImageForm onSubmit={handleImageUpload} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {diskImages.length === 0 ? (
          <EmptyState />
        ) : (
          diskImages.map((image) => (
            <DiskImageCard 
              key={image.id} 
              image={image} 
              onRemove={removeDiskImage}
            />
          ))
        )}
      </div>
    </div>
  );
}

function DiskImageCard({ 
  image, 
  onRemove 
}: { 
  image: any;
  onRemove: (id: string) => void;
}) {
  return (
    <Card className="shadow-apple">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{image.name}</CardTitle>
            <CardDescription>
              {new Date(image.date).toLocaleDateString()} · {formatBytes(image.size)}
            </CardDescription>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onRemove(image.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-100 rounded-md flex items-center justify-center">
            <HardDriveIcon className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Type: {image.type}</p>
            <p className="text-sm text-slate-500">Path: {image.path}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => toast.success(`Selected ${image.name} as boot disk`)}
        >
          Select as Boot Disk
        </Button>
      </CardFooter>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
      <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <HardDriveIcon className="h-6 w-6 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium mb-1">No Disk Images</h3>
      <p className="text-slate-500 mb-4 max-w-md">
        You haven't added any disk images yet. Upload an existing image or create a new one.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Disk Image
          </Button>
        </DialogTrigger>
        <DialogContent>
          <NewDiskImageForm onSubmit={() => {}} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NewDiskImageForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "macos.img",
    size: "16 GB",
    type: "QCOW2",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Disk Image</DialogTitle>
        <DialogDescription>
          Create a new disk image or upload an existing one
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Image Name</Label>
          <Input 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="macos.img" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input 
              id="size" 
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="16 GB" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Format</Label>
            <Input 
              id="type" 
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="QCOW2" 
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="rounded-md border-2 border-dashed border-slate-200 p-6 text-center">
          <div className="mb-3 flex justify-center">
            <FileIcon className="h-8 w-8 text-slate-400" />
          </div>
          <div className="mb-4">
            <p className="text-sm text-slate-600">
              Drag and drop your disk image here, or
            </p>
            <p>
              <Button 
                variant="link" 
                className="text-primary font-medium text-sm"
              >
                browse files
              </Button>
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Supports .img, .iso, .qcow2, .raw (max 64GB)
          </p>
        </div>
      
        <DialogFooter>
          <Button type="submit">Save Disk Image</Button>
        </DialogFooter>
      </form>
    </>
  );
}

function formatBytes(bytes: number) {
  if (typeof bytes === 'string') return bytes;
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
