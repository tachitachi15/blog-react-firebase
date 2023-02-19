import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export class Post {
  constructor(
    readonly title: string,
    readonly postsText: string,
    readonly author: {
      username: string;
      id: string;
    },
    readonly id?: string
  ) {}
}

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: Post): DocumentData {
    return {
      title: post.title,
      postsText: post.postsText,
      author: {
        username: post.author.username,
        id: post.author.id,
      },
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Post {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      postsText: data.postsText,
      author: {
        username: data.author.username,
        id: data.author.id,
      },
    };
  },
};
