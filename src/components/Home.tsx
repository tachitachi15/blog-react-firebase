import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  WithFieldValue,
} from "firebase/firestore";
import "./Home.css";
import { auth, db } from "../firebase";
import { Post, postConverter } from "../model/Post";

export const Home = () => {
  const [postList, setPostList] = useState<Array<Post>>([]);

  const getPosts = async () => {
    const collRef = collection(db, "posts").withConverter(postConverter);
    const snapshot = await getDocs(collRef);
    const posts = snapshot.docs.map((doc) => doc.data());
    setPostList(posts);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.href = "/";
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="postContents" key={post.id}>
            <div className="postHeader">
              <h1>{post.title}</h1>
            </div>
            <div className="postTextContainer">{post.postsText}</div>
            <div className="nameAndDeleteButton">
              <h3>{post.author.username}</h3>
              {post.author.id === auth.currentUser?.uid && (
                <button
                  className="deleteButton"
                  onClick={() => {
                    post.id && handleDelete(post.id);
                  }}
                >
                  削除
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
