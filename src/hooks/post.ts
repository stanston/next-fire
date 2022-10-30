import { useAtomValue } from "jotai";
import { authUser } from "lib/atom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "lib/firebase";
import { useToast } from "@chakra-ui/react";
import type { PostInput } from "types";

export const usePost = () => {
  const auth = useAtomValue(authUser);
  const toast = useToast();

  const post = async (values: PostInput) => {
    // console.log(values);
    if (values.type === "下痢") {
      values.type = 0;
    } else if (values.type === "フツウ") {
      values.type = 1;
    } else if (values.type === "カタメ") {
      values.type = 2;
    }

    if (!values.comment) {
      delete values.comment;
    }

    await addDoc(collection(db, "posts"), {
      uid: auth.uid,
      ...values,
      timestamp: serverTimestamp(),
    }).then(() => {
      toast({
        title: "うんこしました",
      });
    });
  };

  return {
    post,
  };
};
