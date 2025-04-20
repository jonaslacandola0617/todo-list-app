import { ITodo } from "@/utils/types";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getTodos() {
  const res = await fetch(`${apiUrl}?completed=false&archived=false`);

  if (!res.ok) console.log(res.statusText);
  const { data } = await res.json();

  const todos: ITodo[] = data.todos;

  return todos;
}

export async function getTodosCompleted() {
  const res = await fetch(`${apiUrl}?completed=true`);

  if (!res.ok) console.log(res.statusText);
  const { data } = await res.json();

  const completed: ITodo[] = data.todos;

  return completed;
}

export async function getTodosArchived() {
  const res = await fetch(`${apiUrl}?archived=true`);

  if (!res.ok) console.log(res.statusText);
  const { data } = await res.json();

  const archived: ITodo[] = data.todos;

  return archived;
}

export async function createTodo(newTodo: { title: string; priority: string }) {
  const res = await fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (!res.ok)
    throw new Error(
      "Cannot create todo, input all fields and make sure there are no duplicates"
    );

  const { data } = await res.json();

  const todo: ITodo = data.todo;

  return todo;
}

export async function updateTodo(query: Record<string, any>, id: string) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });
  const { data } = await res.json();

  const todo: ITodo = data.todo;

  return todo;
}

export async function deleteTodo(id: string) {
  const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error(`Failed to delete to do with id ${id}`);
  }
}
