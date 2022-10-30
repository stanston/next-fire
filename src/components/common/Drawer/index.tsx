import { useDrawer } from "./useDrawer";
import Link from "next/link";
import {
  Link as LinkChakra,
  Box,
  // Drawer
  Drawer as DrawerChakra,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Avatar,
  List,
  ListItem,
} from "@chakra-ui/react";

export default function Drawer() {
  const { drawer, closeDrawer, authAtom, logout } = useDrawer();

  return (
    <DrawerChakra isOpen={drawer} placement="right" onClose={closeDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <Link href={`/${authAtom.id}`} passHref>
          <LinkChakra
            transition="background-color 200ms"
            _hover={{ bgColor: "gray.200" }}
            onClick={closeDrawer}
          >
            <DrawerHeader display="flex" gap="2">
              <Avatar
                name={authAtom.displayName ? authAtom.displayName : ""}
                src={authAtom.photoURL ? authAtom.photoURL : ""}
              />
              <Box>
                <Box>{authAtom.displayName}</Box>
                <Box fontSize="xs">@{authAtom.id}</Box>
              </Box>
            </DrawerHeader>
          </LinkChakra>
        </Link>
        <DrawerBody>
          <List>
            <ListItem>
              <Link href="/edit" passHref>
                <Button
                  colorScheme="cyan"
                  variant="ghost"
                  justifyContent="start"
                  w="full"
                  onClick={closeDrawer}
                >
                  プロフィールを変更
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/delete" passHref>
                <Button
                  colorScheme="red"
                  variant="ghost"
                  justifyContent="start"
                  w="full"
                  onClick={closeDrawer}
                >
                  退会
                </Button>
              </Link>
            </ListItem>
          </List>
        </DrawerBody>

        <DrawerFooter>
          <Button w="full" onClick={logout}>
            ログアウト
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerChakra>
  );
}
