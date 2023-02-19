import { signInWithPopup, signOut } from "firebase/auth";
import React, { Dispatch, SetStateAction } from "react";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

type Props = {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const Logout = (props: Props) => {
  const navigate = useNavigate();
  const logoutWithGoogle = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      props.setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <div>
      <p>ログアウトすする</p>
      <button onClick={logoutWithGoogle}>ログアウト</button>
    </div>
  );
};
