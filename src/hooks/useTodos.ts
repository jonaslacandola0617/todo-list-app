import { getTodos } from "@/services/todosApi";
import { useQuery } from "@tanstack/react-query";

function useTodos() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return { isLoading, data, error };
}

export default useTodos;
