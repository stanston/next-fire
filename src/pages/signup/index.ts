import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { authUser } from "lib/atom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "lib/firebase";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { UserInput } from "types";
import { schemaSignin } from "lib/schemas";

export const useSignup = () => {
  const router = useRouter();
  const setAuth = useSetAtom(authUser);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      // isValid,
      isSubmitting,
    },
  } = useForm<UserInput>({
    mode: "onBlur",
    // criteriaMode: 'all',
    resolver: yupResolver(schemaSignin),
  });

  const onSignup = async (values: UserInput) => {
    // console.log(values);

    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: values.name,
        })
          .then(async () => {
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              id: user.uid,
              displayName: user.displayName,
              createdAt: serverTimestamp(),
              timestamp: serverTimestamp(),
            }).then(() => {
              setAuth({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                id: user.uid,
              });
              router.push("/");
              toast({
                title: "登録しました",
              });
            });
            // .catch((e) => {
            //   alert(e);
            // });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return {
    handleSubmit,
    onSignup,
    errors,
    register,
    isSubmitting,
  };
};
