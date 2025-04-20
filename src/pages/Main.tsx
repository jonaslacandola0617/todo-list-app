import useTodos from "@/hooks/useTodos";
import TodoCard from "@/components/TodoCard";

import CreateTodo from "@/components/CreateTodo";
import useCompleted from "@/hooks/useCompleted";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import useArchived from "@/hooks/useArchived";

export default function Main() {
  const [isOpenCompleted, setIsOpenCompleted] = useState(false);
  const [isOpenArchived, setIsOpenArchived] = useState(false);
  const [isOpenTodo, setIsOpenTodo] = useState(true);

  const { data: todos } = useTodos();
  const { data: completed } = useCompleted();
  const { data: archived } = useArchived();

  return (
    <div className="flex flex-col gap-8">
      <CreateTodo />

      <div className="flex flex-col gap-8">
        <Separator />
        <Collapsible
          open={isOpenTodo}
          onOpenChange={setIsOpenTodo}
          className="flex flex-col gap-4"
        >
          <div className="w-full flex items-center justify-between">
            <p>To do</p>
            <CollapsibleTrigger>
              <ChevronsUpDown />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-4">
            {!todos?.length ? (
              <p className="text-sm text-gray-400">
                There are no todos, create one now
              </p>
            ) : (
              ""
            )}
            {todos?.map((todo) => (
              <TodoCard key={todo._id} todo={todo} />
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />
        <Collapsible
          open={isOpenCompleted}
          onOpenChange={setIsOpenCompleted}
          className="flex flex-col gap-4"
        >
          <div className="w-full flex items-center justify-between">
            <p>Completed</p>
            <CollapsibleTrigger>
              <ChevronsUpDown />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-4">
            {!completed?.length ? (
              <p className="text-sm text-gray-400">
                There are no completed todos
              </p>
            ) : (
              ""
            )}
            {completed?.map((todo) => (
              <TodoCard key={todo._id} todo={todo} />
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />
        <Collapsible
          open={isOpenArchived}
          onOpenChange={setIsOpenArchived}
          className="flex flex-col gap-4"
        >
          <div className="w-full flex items-center justify-between">
            <p>Archived</p>
            <CollapsibleTrigger>
              <ChevronsUpDown />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-4">
            {!archived?.length ? (
              <p className="text-sm text-gray-400">
                There are no archive todos
              </p>
            ) : (
              ""
            )}
            {archived?.map((todo) => (
              <TodoCard key={todo._id} todo={todo} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
