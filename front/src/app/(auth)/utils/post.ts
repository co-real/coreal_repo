import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

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
