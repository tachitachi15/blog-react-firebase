import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import { collection, addDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Post, postConverter } from "../model/Post";

type Props = {
  isAuth: boolean;
};

export const CreatePost = (props: Props) => {
  const [title, setTitle] = useState<string>();
  const [postText, setPostText] = useState<string>();
  const navigate = useNavigate();

  const createPost = async () => {
    const collRef = collection(db, "posts").withConverter(postConverter);
    if (title && postText && auth.currentUser && auth.currentUser.displayName) {
      const post = new Post(title, postText, {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      });
      await addDoc(collRef, post);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!props.isAuth) navigate("/");
  }, []);

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>記事を投稿する</h1>
        <div className="inputPost">
          <div>タイトル</div>
          <input
            type="text"
            placeholder="タイトルを記入"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputPost">
          <div>投稿</div>
          <textarea
            placeholder="投稿内容を記入"
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
        </div>
        <button className="postButton" onClick={createPost}>
          投稿する
        </button>
      </div>
    </div>
  );
};
