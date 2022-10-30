import { useAtom } from "jotai";
import { isOpenLoginModal } from "lib/atom";
import {
  // getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "lib/firebase";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { UserInput } from "types";
import { schemaLogin } from "lib/schemas";

export const useLogin = () => {
  const [loginModal, setLoginModal] = useAtom(isOpenLoginModal);

  // const auth = getAuth();

  const toast = useToast();

  const closeLoginModal = () => {
    reset();
    setLoginModal(false);
  };

  const successAction = () => {
    closeLoginModal();
    toast({
      title: "ログインしました",
      // status: "success",
      // duration: 3000,
      // render: () => <Box bg="cyan.600">ログインしました</Box>,
    });
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    socialLogin(provider);
  };
  const twitterLogin = () => {
    const provider = new TwitterAuthProvider();
    socialLogin(provider);
  };

  const socialLogin = async (
    provider: GoogleAuthProvider | TwitterAuthProvider
  ) => {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          await updateDoc(userRef, {
            timestamp: serverTimestamp(),
          })
            .then(() => {
              successAction();
            })
            .catch((e) => {
              alert(e);
            });
        } else {
          await setDoc(userRef, {
            uid: user.uid,
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: serverTimestamp(),
            timestamp: serverTimestamp(),
          })
            .then(() => {
              successAction();
            })
            .catch((e) => {
              alert(e);
            });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>({
    mode: "onBlur",
    resolver: yupResolver(schemaLogin),
  });

  const passwordLogin = async (values: UserInput) => {
    // console.log(values);

    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          timestamp: serverTimestamp(),
        })
          .then(() => {
            successAction();
          })
          .catch((e) => {
            alert(e);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return {
    loginModal,
    closeLoginModal,
    handleSubmit,
    passwordLogin,
    googleLogin,
    twitterLogin,
    errors,
    register,
    isSubmitting,
  };
};
