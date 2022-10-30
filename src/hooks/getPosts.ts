// import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "lib/firebase";

const limitPage: number = 10;

const fetcher = async (ref: string, nextCursor: any[]) => {
  const posts: any = [];
  const postsCollection = collection(db, ref);
  const postsOrderBy = orderBy("timestamp", "desc");
  const postsLimit = limit(limitPage);

  // const querySnapshot = await getDocs(postsCollection, postsOrderBy);
  let querySnapshot = await getDocs(
    query(postsCollection, postsOrderBy, postsLimit)
  );

  if (nextCursor) {
    // const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const lastVisible = nextCursor[querySnapshot.docs.length - 1].timestamp;
    // console.log(lastVisible);

    querySnapshot = await getDocs(
      query(postsCollection, postsOrderBy, startAfter(lastVisible), postsLimit)
    );
  }

  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
    // setPosts((prev: []) => [...prev, doc.data()]);
    // posts = [...posts, doc.data()];
  });
  // console.log(posts);
  return posts;
};

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  // if (previousPageData && !previousPageData.data) return null;

  if (pageIndex === 0) return `posts`;

  return [`posts`, previousPageData];
};

export const useGetPosts = () => {
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    getKey,
    fetcher
    // {
    // https://swr.vercel.app/ja/docs/revalidation
    // refreshInterval: 1000,
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
    // or Global Settings https://swr.vercel.app/ja/docs/global-configuration
    // }
  );
  // console.log(data);

  return {
    data,
    error,
    limitPage,
    setSize,
    size,
    mutate,
    isValidating,
  };
};
