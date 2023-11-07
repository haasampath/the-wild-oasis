import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin, //newCabin => createCabin(newcabin)
    onSuccess: () => {
      toast.success("new cabn successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // reset(); // reset form send to calling onsubmit success on mutate, here one is the one before custom hook apply fromold code
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createCabin, isCreating };
}
