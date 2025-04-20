import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Archive, Trash } from "lucide-react";
import { ITodo } from "@/utils/types";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import useDeleteTodo from "@/hooks/useDeleteTodo";
import useUpdate from "@/hooks/useUpdate";
import { Badge } from "./ui/badge";

export default function TodoCard({ todo }: { todo: ITodo }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const _delete = useDeleteTodo();
  const update = useUpdate();

  function deleteTodo() {
    _delete.mutate(todo._id);
  }

  function toggleCheck() {
    if (!isCompleted) {
      setIsCompleted((curr) => !curr);
      update.mutate({ query: { completed: true }, id: todo._id });
    }
  }

  function onArchived() {
    if (!todo.archived)
      update.mutate({ query: { archived: true }, id: todo._id });
    else update.mutate({ query: { archived: false }, id: todo._id });
  }

  return (
    <Card className="flex flex-row items-center">
      <CardHeader className="max-w-1">
        <Checkbox
          checked={isCompleted}
          onClick={toggleCheck}
          disabled={isCompleted}
        />
      </CardHeader>
      <CardContent className="w-full flex items-center gap-2">
        <Badge
          className={`p-2 rounded-full ${
            todo.priority === "low"
              ? "bg-yellow-500"
              : todo.priority === "medium"
              ? "bg-lime-500"
              : "bg-red-500"
          }`}
        ></Badge>
        <p className={isCompleted ? "dark:text-gray-600" : ""}>{todo.title}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" onClick={onArchived}>
          <Archive color="oklch(55.1% 0.027 264.364)" />
        </Button>
        <Dialog>
          <DialogTrigger className="hover:cursor-pointer">
            <Trash size={16} color="oklch(55.1% 0.027 264.364)" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Do you want to remove this task from your list?
              </DialogTitle>
              <DialogDescription>
                Deleting this task will remove it from your records. This action
                is irreversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={deleteTodo}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
