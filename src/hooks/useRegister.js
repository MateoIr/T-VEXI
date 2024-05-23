import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/users";

export const useRegister = () => {
  const mutation = useMutation({ mutationFn: registerUser });
  return mutation;
};
