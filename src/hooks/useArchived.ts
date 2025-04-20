import { getTodosArchived } from "@/services/todosApi";
import { useQuery } from "@tanstack/react-query";

function useArchived() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["archived"],
    queryFn: getTodosArchived,
  });

  return { isLoading, data, error };
}

export default useArchived;
