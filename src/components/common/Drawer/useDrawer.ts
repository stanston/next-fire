import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { isOpenDrawer, authUser } from "lib/atom";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "lib/firebase";
import { useToast } from "@chakra-ui/react";

export const useDrawer = () => {
  const router = useRouter();

  const [drawer, setDrawer] = useAtom(isOpenDrawer);
  const [authAtom, setAuthAtom] = useAtom(authUser);
  const resetAuth = useResetAtom(authUser);

  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (authAtom.uid) {
        const userRef = doc(db, "users", authAtom.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          // console.log(userDoc.data().id);
          setAuthAtom((prev) => ({
            ...prev,
            id: userDoc.data().id,
          }));
        }
      }
    })();
  }, [authAtom.id]);

  const closeDrawer = () => {
    setDrawer(false);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // setAuthAtom("");
        resetAuth();
        closeDrawer();
        router.push("/");
        toast({
          title: "ログアウトしました",
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return {
    drawer,
    closeDrawer,
    authAtom,
    logout,
  };
};
