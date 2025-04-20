import { updateTodo } from "@/services/todosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdate() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ query, id }: { query: Record<string, any>; id: string }) =>
      updateTodo(query, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["completed"] });
      queryClient.invalidateQueries({ queryKey: ["archived"] });
    },
  });

  return mutation;
}

export default useUpdate;
