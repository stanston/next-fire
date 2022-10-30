import { useRef } from "react";
import { useAtomValue } from "jotai";
import { authUser } from "lib/atom";
import { useDisclosure, useRadioGroup } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { PostInput } from "types";
import { schemaPost } from "lib/schemas";
import { usePost as usePostHook } from "hooks/post";

import { useGetPosts } from "hooks/getPosts";

export const usePost = () => {
  const auth = useAtomValue(authUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { post: postHook } = usePostHook();
  const { mutate, data } = useGetPosts();

  // const options = ["下痢", "フツウ", "カタメ"];
  const options = [
    { label: "下痢", image: "/images/soft.webp" },
    { label: "フツウ", image: "/images/normal.webp" },
    { label: "カタメ", image: "/images/hard.webp" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    mode: "onBlur",
    resolver: yupResolver(schemaPost),
    defaultValues: {
      // type: options[1].label,
      type: "",
    },
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "type",
    // defaultValue: "フツウ",
    // defaultValue: options[1].label,
    onChange: console.log,
  });

  const group = getRootProps();

  const resetAction = () => {
    reset();
    onClose();
  };

  const post = (valueｓ: PostInput) => {
    postHook(valueｓ);
    mutate(data);
    // console.log(data);
    resetAction();
  };

  const closeModal = () => {
    resetAction();
  };

  return {
    onOpen,
    auth,
    isOpen,
    closeModal,
    handleSubmit,
    post,
    group,
    options,
    getRadioProps,
    errors,
    register,
    isSubmitting,
    cancelRef,
    onClose,
  };
};
