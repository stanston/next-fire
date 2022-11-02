import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import {
  Stack,
  Box,
  Button,
  Spinner,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Center,
} from "@chakra-ui/react";
import Hero from "components/parts/Hero";
import { useForm } from "react-hook-form";
import { Book } from "mocks/types";

// const fetcher = (url: any) => {
//   const books = axios.get(url).then((res) => {
//     return res.data;
//   });
//   // console.log(books);
//   return books;
// };
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Msw() {
  // 実際にはなんらかの認証情報を持っている想定
  const [isAuth, setIsAuth] = useState<any>();

  const { data: books, error } = useSWR("/books", fetcher);

  useEffect(() => {
    // 実際にはなんらかの認証情報を持っている想定
    setIsAuth(sessionStorage.getItem("is-authenticated"));
  }, []);

  const login = () => {
    axios.post("/login").then((res) => {
      // 実際にはなんらかの認証情報を持っている想定
      setIsAuth(res.data.user);
      console.log(res);
      alert(res.data.message);
    });
  };

  const logout = () => {
    axios.post("/logout").then((res) => {
      // 実際にはなんらかの認証情報を持っている想定
      setIsAuth(null);
      console.log(res);
      alert(res.data.message);
    });
  };

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
        books.push(res.data); // 擬似的に描画するだけ
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
    <>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          こんにちは {isAuth ? `認証ユーザー` : `ゲストユーザー`}さん
          <Box as="span" display="block" fontSize="sm">
            ※実際にはなんらかの認証情報を持っている想定
          </Box>
        </Box>
        <Stack direction="row" spacing="4">
          <Button colorScheme="cyan" color="white" onClick={login}>
            ログイン
          </Button>
          <Button onClick={logout}>ログアウト</Button>
        </Stack>
      </Stack>

      <Hero title="本" text="本のデータです。" isCenter />

      <Container>
        <Heading mb="4">Type</Heading>
        <Box mb="8">
          book = {"{"}
          <br />
          &nbsp;&nbsp;title: string;
          <br />
          &nbsp;&nbsp;description?: string;
          <br />
          {"}"}
        </Box>

        <Heading mb="4">Get</Heading>

        <TableContainer whiteSpace="normal" mb="8">
          {error && <Box>エラー</Box>}
          {!books && <Spinner />}
          {books && (
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>タイトル</Th>
                  <Th>説明</Th>
                </Tr>
              </Thead>
              <Tbody>
                {books.map((book: Book, index: number) => (
                  <Tr key={index}>
                    <Td>{book.title}</Td>
                    <Td>{book.description}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </TableContainer>

        <Heading mb="4">Post</Heading>
        <Box as="form" onSubmit={handleSubmit(post)}>
          <Stack spacing="4" mb="4">
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
          </Stack>
          <Center mb="2">
            <Button
              colorScheme="cyan"
              type="submit"
              color="white"
              width="auto"
              isLoading={isSubmitting}
            >
              投稿
            </Button>
          </Center>
          <Center fontSize="sm">ログインは必須です。</Center>
        </Box>
      </Container>
    </>
  );
}
