"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignupMutation } from "../utils/post";

/* 유효성 검사 */

const signupSchema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요."),
    email: z.string().min(1, "중복된 이메일입니다."),
    companyName: z.string().min(1, "회사명을 입력해 주세요."),
    password: z.string().min(8, "비밀번호가 8자 이상이 되도록 해 주세요."),
    confirmPassword: z.string().min(1, "비밀번호 확인은 필수입니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

/* 타입 정의 */

type FormData = z.infer<typeof signupSchema>;

interface FormFieldProps {
  label: string;
  name: keyof FormData;
  type: string;
  register: ReturnType<typeof useForm<FormData>>["register"];
  error?: string;
}

/* 폼 필드의 컴포넌트 구성*/
//TODO : 로그인에서도 사용가능한 컴포넌트분리

const FormField = ({ label, name, type, register, error }: FormFieldProps) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      {...register(name)}
      className="shadow appearance-none border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      type={type}
      placeholder={label}
    />
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  //TODO : 토스트알람으로 result -> code 비교후 알람띄우기 , message로 알람내용 띄우기

  const signupMutation = useSignupMutation();
  const onSubmit = async (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...submitData } = data;
    const result = await signupMutation.mutateAsync(submitData);
    console.log(result);
  };

  return (
    <div className="border-4 border-gray-400 rounded-lg p-8 w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <FormField
          label="이름"
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
        />
        <FormField
          label="아이디"
          name="email"
          type="text"
          register={register}
          error={errors.email?.message}
        />
        <FormField
          label="회사명"
          name="companyName"
          type="text"
          register={register}
          error={errors.companyName?.message}
        />
        <FormField
          label="비밀번호"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <FormField
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword?.message}
        />
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="submit"
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}
