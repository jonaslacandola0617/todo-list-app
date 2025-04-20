import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useCreateTodo from "@/hooks/useCreateTodo";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const mutation = useCreateTodo();

  function createTodo() {
    mutation.mutate(
      { title, priority },
      {
        onSuccess: () => toast.success(`"${title}" has been created`),
        onError: (err) => toast.error(err.message),
      }
    );
  }

  return (
    <Dialog>
      <div className="flex items-center justify-between">
        <DialogTrigger>
          <Button className="p-6">
            <span>Add Todo</span>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Todo</DialogTitle>
            <DialogDescription>
              What task would you like to add to help you stay organized today?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Priority
              </Label>
              <Select
                onValueChange={(val) => setPriority(val)}
                defaultValue="medium"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={createTodo}>Add Todo</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
