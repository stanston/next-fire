import { usePost } from "components/common/Post/usePost";
import { Box, Button } from "@chakra-ui/react";
import Modal from "components/common/Post/Modal";
import AlertDialog from "components/common/Post/AlertDialog";

export default function Post() {
  const {
    onOpen,
    auth,
    isOpen,
    closeModal,
    handleSubmit,
    post,
    group,
    options,
    getRadioProps,
    errors,
    register,
    isSubmitting,
    cancelRef,
    onClose,
  } = usePost();

  return (
    <>
      <Box position="sticky" right="4" bottom="4" zIndex="1">
        <Button
          // colorScheme="white"
          position="absolute"
          bgColor="white"
          fontSize="6xl"
          w="32"
          h="32"
          border="8px"
          borderColor="cyan.600"
          right="4"
          bottom="4"
          borderRadius="full"
          onClick={onOpen}
        >
          💩
        </Button>
      </Box>

      {auth.uid ? (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          handleSubmit={handleSubmit}
          post={post}
          group={group}
          options={options}
          getRadioProps={getRadioProps}
          errors={errors}
          register={register}
          isSubmitting={isSubmitting}
        />
      ) : (
        <AlertDialog isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} />
      )}
    </>
  );
}
