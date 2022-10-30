import { RefObject } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

type PostAlertDialogProps = {
  isOpen: boolean;
  cancelRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
};

export default function PostAlertDialog(props: PostAlertDialogProps) {
  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={props.cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            ログイン/登録してね
          </AlertDialogHeader>
          <AlertDialogBody>
            うんこの記録はログイン/登録後におこなうことができます。
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={props.onClose}>わかった</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
