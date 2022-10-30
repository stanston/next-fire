import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { authUser } from "lib/atom";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "lib/firebase";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { UserInput } from "types";
import { useSchemaEdit } from "lib/schemas";

export const useEdit = () => {
  const [authAtom, setAuthAtom] = useAtom(authUser);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>({
    mode: "onBlur",
    resolver: yupResolver(useSchemaEdit()),
    // defaultValues: {
    // name: user.displayName,
    // id: user.id,
    // },
  });

  const resetAsyncForm = useCallback(async () => {
    if (authAtom.uid) {
      const docRef = doc(db, "users", authAtom.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const doc = docSnap.data();
        // reset(doc);
        reset({
          name: doc.displayName,
          id: doc.id,
        });
      }
      // else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      // }
    }
  }, [authAtom, reset]);

  // データの取得が完了したら再度初期化
  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);

  const editImage = (image: File[]) => {
    const storageRef = ref(storage, `users/${authAtom.uid}/${image[0].name}`);
    // uploadBytes(storageRef, image[0]).then((snapshot) => {
    uploadBytes(storageRef, image[0])
      .then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
              photoURL: url,
            })
              .then(async () => {
                await updateDoc(doc(db, "users", authAtom.uid), {
                  photoURL: url,
                }).then(() => {
                  setAuthAtom((prev) => ({
                    ...prev,
                    photoURL: url,
                  }));
                });
              })
              .catch((error) => {
                alert(error.message);
              });
          }
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const editUser = async (values: UserInput) => {
    // console.log(values.image);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: values.name,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
        .then(async () => {
          await updateDoc(doc(db, "users", authAtom.uid), {
            displayName: values.name,
            id: values.id,
            // timestamp: serverTimestamp(),
          }).then(() => {
            if (values.image.length) {
              editImage(values.image);
            }
            setAuthAtom((prev) => ({
              ...prev,
              displayName: values.name,
              id: values.id,
            }));
            toast({
              title: "変更しました",
            });
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return {
    handleSubmit,
    editUser,
    errors,
    register,
    isSubmitting,
  };
};
