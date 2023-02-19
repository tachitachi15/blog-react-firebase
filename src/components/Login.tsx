import { signInWithPopup } from "firebase/auth";
import React, { Dispatch, SetStateAction } from "react";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

type Props = {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const Login = (props: Props) => {
  const navigate = useNavigate();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", "1");
      props.setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div>
      <p>ログインして始める</p>
      <button onClick={loginWithGoogle}>グーグルでログイン</button>
    </div>
  );
};
