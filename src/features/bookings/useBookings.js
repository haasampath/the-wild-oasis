import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "" };

  // sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // query
  const {
    isLoading,
    data: { data: bookings, count } = {}, // {} by default will not exist data so used default
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // when filter changed queryKey changed so re fetch data
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // prefetiching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // take next page data prior to click
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // take next page data prior to click
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return {
    isLoading,
    bookings,
    count,
    error,
  };
}
