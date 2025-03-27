"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

type Errors = {
  id: string;
  name: string;
  password: string;
  image: string;
}

export default async function SignUp(_: any,formData: FormData) {

    let shouldRedirect = false;

    const errors:Errors = {
      id: '',
      name: '',
      password: '',
      image: ''
    };
    let hasError: boolean = false;

    if(!formData.get('id') || !(formData.get('id') as string)?.trim()){
      errors.id = '아이디를 입력해주세요.';
      hasError = true;
    }
    if(!formData.get('name') || !(formData.get('name') as string)?.trim()){
      errors.name = '닉네임을 입력해주세요.';
      hasError = true;
    }
    if(!formData.get('password') || !(formData.get('password') as string)?.trim()){
      errors.password = '비밀번호를 입력해주세요.';
      hasError = true;
    }
    if(!formData.get('image')){
      errors.image = '이미지를 선택해주세요.';
      hasError = true;
    }

    if (hasError) {
      return {
        status: false,
        errors
      };
    }

    formData.set('nickname', formData.get('name') as string);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,{
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      
      if(response.status === 403){
        return {
          status : false,
          errors: null,
          message : "이미 존재하는 아이디입니다."
        };
      } else if(response.status === 400){
        const errorData = await response.json();
        return {
          status : false,
          errors: null,
          message : errorData.data[0]
        };
      }
      
      // 응답 본문을 한 번만 파싱하고 결과를 저장
      const userData = await response.json();
      console.log(userData);

      shouldRedirect = true;

      const signInResult = await signIn("credentials", { // 아이디, 비밀번호 로그인
        username: formData.get('id'),
        password: formData.get('password'),
        redirect: false
      });
      
      console.log('Sign in result:', signInResult);
    } catch (error) {
      return {
        status : false,
        errors: null,
        message : `알 수 없는 에러가 발생했습니다. : ${error}`
      };
    }
    
    
    if(shouldRedirect){
     redirect('/home');
    }

    return {
      status: true,
      errors: null
    };
};