import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Center,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import { Book } from "mocks/types";

export const BooksPost = () => {
  // 実際にはなんらかの認証情報を持っている想定
  const [isAuth, setIsAuth] = useState<any>();

  useEffect(() => {
    // 実際にはなんらかの認証情報を持っている想定
    setIsAuth(sessionStorage.getItem("is-authenticated"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: {
      // errors,
      isSubmitting,
    },
  } = useForm({
    mode: "onBlur",
  });

  const post = async (values: any) => {
    // console.log(values);
    await axios
      .post("/post", values)
      .then((res) => {
        console.log(res.data);
        alert(`${values.title} ${values.description} 投稿しました。`);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 403) {
          alert(error.response.data.message);
          return;
        }
        if (error.response.status === 400) {
          alert(error.response.data.message);
          return;
        }
      });
  };

  return (
    <Container>
      <Box fontSize="sm" fontWeight="bold" mb="2">
        {isAuth ? `認証ユーザー` : `ゲストユーザー`}
      </Box>
      <Stack as="form" spacing="4" onSubmit={handleSubmit(post)}>
        <FormControl>
          <FormLabel>タイトル</FormLabel>
          <Input {...register("title")} />
          <FormHelperText>タイトルは必須です。</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>説明文</FormLabel>
          <Textarea {...register("description")} />
          <FormHelperText>説明文は任意です。</FormHelperText>
        </FormControl>
        <Center>
          <Button
            colorScheme="cyan"
            type="submit"
            color="white"
            isLoading={isSubmitting}
          >
            投稿
          </Button>
        </Center>
        <Center fontSize="sm">ログインは必須です。</Center>
      </Stack>
    </Container>
  );
};
