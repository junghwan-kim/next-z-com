"use client";

import style from './signup.module.css';
import onSubmit from '../_lib/signup';
import BackButton from './BackButton';
import Form from "next/form";
import { useActionState, useEffect } from "react";
import ErrorMessage from './ErrorMessage';

export default function SignupModal() {
  const [state, formAction, isPending] = useActionState(onSubmit ,null);


  return (

      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">아이디</label>
                <input id="id" name='id' className={style.input} type="text" placeholder="" />
                {state?.errors?.id && <ErrorMessage message={state.errors.id} />}
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                <input id="name" name='name' className={style.input} type="text" placeholder="" />
                {state?.errors?.name && <ErrorMessage message={state.errors.name} />}
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                <input id="password" name='password' className={style.input} type="password" placeholder="" />
                {state?.errors?.password && <ErrorMessage message={state.errors.password} />}
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">프로필</label>
                <input required id="image" name='image' className={style.input} type="file" accept="image/*" />
                {state?.errors?.image && <ErrorMessage message={state.errors.image} />}
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type='submit' className={style.actionButton} disabled={isPending}>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    );
}