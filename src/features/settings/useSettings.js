import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"], // uniuquely identify query to caches
    queryFn: getSettings, // retrun promise(async function)
  });

  return { isLoading, error, settings };
}
