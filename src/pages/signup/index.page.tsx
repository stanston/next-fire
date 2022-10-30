import Link from "next/link";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import Meta from "components/common/Meta";
import Breadcrumb from "components/parts/Breadcrumb";
import Hero from "components/parts/Hero";

import { useSignup } from ".";

export default function Signup() {
  const { handleSubmit, onSignup, errors, register, isSubmitting } =
    useSignup();

  return (
    <>
      <Meta pageTitle="新規登録" />
      <Breadcrumb current="新規登録" />

      <Hero
        title="新規登録"
        // text={[
        //   <Box as="span" color="red.500" key="0">
        //     *
        //   </Box>,
        //   "は必須項目です。",
        // ]}
        text="すべて必須項目です。"
        isCenter
      />

      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSignup)}>
        {/* <FormControl isInvalid={!!errors.name} isRequired> */}
        <FormControl isInvalid={!!errors.name}>
          {/* FormControlをisRequiredにするとReact Hook Formが動かないため、アスタリスクを追加 */}
          {/* <FormLabel htmlFor="name">ニックネーム</FormLabel> */}
          <FormLabel htmlFor="name">
            ニックネーム
            <Box as="span" color="red.500" ml="1">
              *
            </Box>
          </FormLabel>
          <Input id="name" placeholder="ぷう太郎" {...register("name")} />
          <FormErrorMessage>
            {errors.name && (errors.name.message as any)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">
            メールアドレス
            <Box as="span" color="red.500" ml="1">
              *
            </Box>
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="example@poo.com"
            {...register("email")}
          />
          <FormErrorMessage>
            {errors.email && (errors.email.message as any)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">
            パスワード
            <Box as="span" color="red.500" ml="1">
              *
            </Box>
          </FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="8文字以上で入力してください"
            {...register("password")}
          />
          <FormErrorMessage>
            {errors.password && (errors.password.message as any)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.confirm}>
          <FormLabel htmlFor="confirm">
            パスワードの確認
            <Box as="span" color="red.500" ml="1">
              *
            </Box>
          </FormLabel>
          <Input
            id="confirm"
            type="password"
            placeholder="パスワードとおなじ値を入力してください"
            {...register("confirm")}
          />
          <FormErrorMessage>
            {errors.confirm && (errors.confirm.message as any)}
          </FormErrorMessage>
        </FormControl>
        <Stack direction="row" spacing="4" justifyContent="center">
          <Button
            type="submit"
            colorScheme="pink"
            color="white"
            // isDisabled={!isValid}
            isLoading={isSubmitting}
          >
            登録する
          </Button>
          <Link href="/">
            <Button>ホームへ戻る</Button>
          </Link>
        </Stack>
      </Stack>
    </>
  );
}
