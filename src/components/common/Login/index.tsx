import { useLogin } from "./useLogin";
import {
  Box,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";

export default function Login() {
  const {
    loginModal,
    closeLoginModal,
    handleSubmit,
    passwordLogin,
    googleLogin,
    twitterLogin,
    errors,
    register,
    isSubmitting,
  } = useLogin();

  return (
    <Modal isOpen={loginModal} onClose={closeLoginModal}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(passwordLogin)}>
        <ModalHeader textAlign="center">ログイン</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="4">
            <Button colorScheme="red" w="full" onClick={googleLogin}>
              Googleアカウントでログイン
            </Button>
            <Button
              colorScheme="twitter"
              color="white"
              w="full"
              onClick={twitterLogin}
            >
              Twitterアカウントでログイン
            </Button>
            <Divider />
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
                placeholder="パスワードを入力"
                {...register("password")}
              />
              <FormErrorMessage>
                {errors.password && (errors.password.message as any)}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter justifyContent="center" gap="4">
          <Button
            type="submit"
            colorScheme="cyan"
            color="white"
            isLoading={isSubmitting}
          >
            ログイン
          </Button>
          <Button onClick={closeLoginModal}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
