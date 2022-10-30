import { RefObject } from "react";
import {
  AlertDialog,
  // AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

type DeleteAlertDialogProps = {
  isOpen: boolean;
  cancelRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
  onDeleteUser: () => void;
};

export default function DeleteAlertDialog(props: DeleteAlertDialogProps) {
  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={props.cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            ほんとうに退会しますか？
          </AlertDialogHeader>

          {/* <AlertDialogBody></AlertDialogBody> */}

          <AlertDialogFooter>
            <Button onClick={props.onClose}>やめとく</Button>
            <Button colorScheme="red" onClick={props.onDeleteUser} ml={3}>
              退会
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
