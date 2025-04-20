import { getTodosCompleted } from "@/services/todosApi";
import { useQuery } from "@tanstack/react-query";

function useCompleted() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["completed"],
    queryFn: getTodosCompleted,
  });

  return { isLoading, data, error };
}

export default useCompleted;
