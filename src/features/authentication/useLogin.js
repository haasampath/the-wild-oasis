import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); // set manually react query cache ["user"] since same query key it will not refetch
      navigate("/dashboard", { replace: true }); // prevent back button delete history
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
