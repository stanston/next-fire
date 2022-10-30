import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  HStack,
  FormControl,
  Textarea,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import RadioCard from "components/parts/RadioCard";

type ValueType = {
  label: string;
  image: string;
};
type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
  post: (values: any) => void;
  group: any;
  options: ValueType[];
  getRadioProps: any;
  errors: any;
  register: any;
  isSubmitting: boolean;
};

export default function PostModal(props: PostModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={props.handleSubmit(props.post)}>
        <ModalHeader textAlign="center">うんこしました</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="4">
            <FormControl as="fieldset" isInvalid={!!props.errors.type}>
              <HStack {...props.group} align="">
                {props.options.map((value: ValueType) => {
                  // const radio = getRadioProps({ value });
                  const radio = props.getRadioProps({ value: value.label });
                  // console.log(radio);
                  return (
                    <RadioCard
                      key={value.label}
                      radioProps={{ ...radio }}
                      label={value.label}
                      image={value.image}
                      register={props.register}
                    />
                  );
                })}
              </HStack>
              <FormErrorMessage>
                {props.errors.type && (props.errors.type.message as any)}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!props.errors.comment}>
              <Textarea
                placeholder="このうんこの思い出を語ってください"
                {...props.register("comment")}
              />
              <FormErrorMessage>
                {props.errors.comment && (props.errors.comment.message as any)}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter justifyContent="center" gap="4">
          <Button
            type="submit"
            colorScheme="cyan"
            color="white"
            isLoading={props.isSubmitting}
          >
            Poo!! 💩
          </Button>
          <Button onClick={props.onClose}>不発</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
