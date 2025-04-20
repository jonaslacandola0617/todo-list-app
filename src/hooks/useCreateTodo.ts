import { createTodo } from "@/services/todosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return mutation;
}

export default useCreateTodo;
