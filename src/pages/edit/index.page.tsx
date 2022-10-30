import Link from "next/link";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import Meta from "components/common/Meta";
import Breadcrumb from "components/parts/Breadcrumb";
import Hero from "components/parts/Hero";

import { useEdit } from ".";

export default function Signup() {
  const { handleSubmit, editUser, errors, register, isSubmitting } = useEdit();

  return (
    <>
      <Meta pageTitle="プロフィール変更" />
      <Breadcrumb current="プロフィール変更" />

      <Hero title="プロフィール変更" isCenter />

      <Stack as="form" spacing="4" onSubmit={handleSubmit(editUser)}>
        <FormControl isInvalid={!!errors.name}>
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
        <FormControl isInvalid={!!errors.id}>
          <FormLabel htmlFor="id">
            ユーザーID
            <Box as="span" color="red.500" ml="1">
              *
            </Box>
          </FormLabel>
          <Input id="id" placeholder="example@poo.com" {...register("id")} />
          <FormErrorMessage>
            {errors.id && (errors.id.message as any)}
          </FormErrorMessage>
          <FormHelperText>ユーザーURL等に使用されます。</FormHelperText>
        </FormControl>
        <FormControl isInvalid={!!errors.image}>
          <FormLabel htmlFor="image">サムネイル画像</FormLabel>
          <Input id="image" type="file" {...register("image")} />
          <FormErrorMessage>
            {errors.image && (errors.image.message as any)}
          </FormErrorMessage>
        </FormControl>
        <Stack direction="row" spacing="4" justifyContent="center">
          <Button
            type="submit"
            colorScheme="pink"
            color="white"
            isLoading={isSubmitting}
          >
            変更する
          </Button>
          <Link href="/">
            <Button>ホームへ戻る</Button>
          </Link>
        </Stack>
      </Stack>
    </>
  );
}
