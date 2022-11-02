import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";
// import type { User, Post } from "types";

export type PieData = {
  name: string;
  value: number;
};

export type BarData = {
  name: string | null;
  下痢: number;
  フツウ: number;
  カタメ: number;
};

export const useId = () => {
  const router = useRouter();
  const queryId = router.query.id;
  // console.log(queryId);

  const [user, setUser] = useState<any>("");
  const [posts, setPosts] = useState<any[]>([]);

  const [pie, setPie] = useState<PieData[]>([]);
  const [bar, setBar] = useState<BarData[]>([]);

  useEffect(() => {
    (async () => {
      if (queryId) {
        const q = query(collection(db, "users"), where("id", "==", queryId));
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.map((doc) => {
          setUser(doc.data());
        });
        // console.log(user);

        if (user) {
          const q = query(
            collection(db, "posts"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.docs.map((doc) => {
            // setPosts((prev: []) => [...prev, doc.data()]);
            posts.push(doc.data());
          });
          // console.log(posts);

          const countType: number[] = [0, 0, 0];

          posts.forEach(({ type }) => {
            if (type === 0) {
              countType[0]++;
            } else if (type === 1) {
              countType[1]++;
            } else if (type === 2) {
              countType[2]++;
            }
          });

          // console.log(countType);

          setPie([
            {
              name: "下痢",
              value: countType[0],
            },
            {
              name: "フツウ",
              value: countType[1],
            },
            {
              name: "カタメ",
              value: countType[2],
            },
          ]);

          setBar([
            {
              // name: "累計",
              name: null,
              下痢: countType[0],
              フツウ: countType[1],
              カタメ: countType[2],
            },
          ]);
        }
      }
    })();
  }, [queryId, user.uid]);

  return {
    user,
    posts,
    pie,
    bar,
  };
};
