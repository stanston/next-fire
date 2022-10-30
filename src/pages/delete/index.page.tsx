import Link from "next/link";
import { Stack, Button } from "@chakra-ui/react";
import { useDelete } from ".";
import Meta from "components/common/Meta";
import Breadcrumb from "components/parts/Breadcrumb";
import Hero from "components/parts/Hero";
import DeleteAlertDialog from "pages/delete/AlertDialog";

export default function Delete() {
  const { onOpen, isOpen, cancelRef, onClose, onDeleteUser } = useDelete();

  return (
    <>
      <Meta pageTitle="退会" />
      <Breadcrumb current="退会" />

      <Hero title="退会" isCenter />

      <Stack direction="row" spacing="4" justifyContent="center">
        <Button type="submit" colorScheme="red" onClick={onOpen}>
          退会する
        </Button>
        <Link href="/">
          <Button>ホームへ戻る</Button>
        </Link>
      </Stack>

      <DeleteAlertDialog
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onDeleteUser={onDeleteUser}
      />
    </>
  );
}
