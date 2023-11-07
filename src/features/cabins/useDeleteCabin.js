import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi, // sam as (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      // run when excute success to refresh and invalidating cache
      queryClient.invalidateQueries({
        queryKey: ["cabins"], // invalidate same named query and refresh
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteCabin };
}
