import { useState, useRef, useEffect } from "react";
import { useAtomValue } from "jotai";
import { authUser } from "lib/atom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";

export const useGetUserIds = () => {
  const auth = useAtomValue(authUser);
  // const [ids, setIds] = useState<string[]>([]);
  const [ids] = useState<string[]>([]);

  const didLogRef = useRef(false);
  useEffect(() => {
    if (didLogRef.current === false) {
      didLogRef.current = true;
      (async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.docs.map((doc) => {
          // console.log(doc.id, " => ", doc.data());
          ids.push(doc.data().id);
        });
        // console.log(ids);

        // 自分のidは確保
        const index = ids.indexOf(auth.id);
        ids.splice(index, 1);
        // console.log(ids);
      })();
    }
  }, []);

  return {
    ids,
  };
};
