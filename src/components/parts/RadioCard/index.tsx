import { useRadio, UseRadioProps, Box, Grid, Image } from "@chakra-ui/react";

// https://codesandbox.io/s/gh-discussion-5333-l6ltv?file=/src/App.tsx:341-381
type RadioCardProps = {
  radioProps: UseRadioProps;
  // children?: React.ReactNode;
  label: string;
  image: string;
  register: any;
};

export default function RadioCard({
  radioProps,
  label,
  image,
  register,
}: RadioCardProps) {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box
      as="label"
      flex="1"
      display="flex"
      textAlign="center"
      {...register("type")}
    >
      <input {...input} />
      <Grid
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        _checked={{
          bgColor: "gray.200",
          borderColor: "gray.200",
        }}
        // _focus={{
        //   boxShadow: "outline",
        // }}
        px={4}
        py={2}
        alignItems="center"
        gap="2"
        transition="background-color 200ms"
      >
        <Image src={image} alt={label} />
        <Box as="span" fontSize="sm" fontWeight="bold" mt="auto">
          {label}
        </Box>
      </Grid>
    </Box>
  );
}
