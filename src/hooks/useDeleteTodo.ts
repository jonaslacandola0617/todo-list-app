import { deleteTodo } from "@/services/todosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["completed"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archived"],
      });
    },
  });

  return mutation;
}

export default useDeleteTodo;
