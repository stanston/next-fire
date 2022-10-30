import { useSetAtom, useAtomValue } from "jotai";
import { isOpenLoginModal, isOpenDrawer, authUser } from "lib/atom";
import Link from "next/link";
import {
  Flex,
  Box,
  Button,
  // useDisclosure,
  Avatar,
} from "@chakra-ui/react";

export default function Nav() {
  const setLoginModal = useSetAtom(isOpenLoginModal);
  const setDrawer = useSetAtom(isOpenDrawer);
  const auth = useAtomValue(authUser);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const openLoginModal = () => {
    setLoginModal(true);
  };

  const openDrawer = () => {
    setDrawer(true);
  };

  return (
    <Flex
      as="nav"
      justifyContent="end"
      alignItems="center"
      gap="4"
      position="fixed"
      h="14"
      right="4"
      zIndex="10"
    >
      {!auth.uid ? (
        <Flex as="ul" gap="2">
          <Box as="li">
            <Button
              color="white"
              variant="outline"
              _hover={{ color: "cyan.600", bgColor: "white" }}
              onClick={openLoginModal}
            >
              ログイン
            </Button>
          </Box>
          <Box as="li">
            <Link href="/signup" passHref>
              <Button colorScheme="pink">新規登録</Button>
            </Link>
          </Box>
        </Flex>
      ) : (
        <Avatar
          as="button"
          name={auth.displayName ? auth.displayName : ""}
          src={auth.photoURL ? auth.photoURL : ""}
          onClick={openDrawer}
        />
      )}
    </Flex>
  );
}
