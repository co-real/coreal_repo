import axiosInstance from "@/libs/axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface SignupData {
  email: string;
  password: string;
  name: string;
  companyName: string;
}

const signup = async (data: SignupData) => {
  const response = await axiosInstance.post("/auths/signup", data);
  return response.data;
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
  });
};
