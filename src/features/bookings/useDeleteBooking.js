import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi, // sam as (id) => deletebooking(id),
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      // run when excute success to refresh and invalidating cache
      queryClient.invalidateQueries({
        queryKey: ["Bookings"], // invalidate same named query and refresh
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteBooking };
}
