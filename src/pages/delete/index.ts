import { useRef } from "react";
import { useRouter } from "next/router";
// import { useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { authUser } from "lib/atom";
import { deleteUser } from "firebase/auth";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "lib/firebase";
import { useDisclosure, useToast } from "@chakra-ui/react";

export const useDelete = () => {
  const router = useRouter();
  // const setAuth = useSetAtom(authUser);
  const resetAuth = useResetAtom(authUser);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const user = auth.currentUser;

  const onDeleteUser = async () => {
    if (user) {
      await deleteDoc(doc(db, "users", user.uid));

      const q = query(collection(db, "posts"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      try {
        await deleteUser(user)
          .then(() => {
            // setAuth("");
            resetAuth();
            router.push("/");
            toast({
              title: "退会しました",
              status: "error",
            });
          })
          .catch((error) => {
            alert(error);
          });
      } catch (e) {
        alert(e);
      }
    }
  };

  return {
    onOpen,
    isOpen,
    cancelRef,
    onClose,
    onDeleteUser,
  };
};
