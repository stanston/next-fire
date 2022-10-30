import { Box, Container } from "@chakra-ui/react";

export default function Footer() {
  const year: number = new Date().getFullYear();

  return (
    <Box as="footer" bgColor="gray.200" textAlign="right" py="2">
      <Container as="p" maxW="960">
        <small>&copy; {year} Stan.</small>
      </Container>
    </Box>
  );
}
