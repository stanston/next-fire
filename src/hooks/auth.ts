import { useEffect } from "react";
import { useAtom } from "jotai";
import { authUser } from "lib/atom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "lib/firebase";

export const useAuth = () => {
  const [authAtom, setAuthAtom] = useAtom(authUser);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // setAuthAtom(user);
        setAuthAtom({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          id: user.uid,
        });
        // console.log(authAtom);
      }
    });
  }, []);
};
