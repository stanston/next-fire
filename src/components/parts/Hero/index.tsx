import { Stack, Heading, Text } from "@chakra-ui/react";

type HeroType = {
  isCenter: boolean;
  title: string;
  text?: string | Array<string | JSX.Element>;
};
Hero.defaultProps = {
  isCenter: false,
};

export default function Hero(props: HeroType) {
  const currentCenter = () => {
    if (props.isCenter) {
      return "center";
    }
  };

  return (
    <Stack spacing="4" align={currentCenter()} mb="8">
      <Heading as="h1" size="2xl">
        {props.title}
      </Heading>
      <Text fontSize="lg">{props.text}</Text>
    </Stack>
  );
}
