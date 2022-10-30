// import Link from "next/link";
import NextLink from "next/link";
// import { Flex, Center, Link as LinkChakra } from "@chakra-ui/react";
import { Flex, Center, Link } from "@chakra-ui/react";

import { siteMeta } from "lib/meta";
const { siteTitle } = siteMeta;

export default function Header() {
  return (
    <Flex
      as="header"
      position="fixed"
      bgColor="primary"
      fontSize="2xl"
      px="4"
      w="full"
      h="14"
      zIndex="10"
    >
      <Center as="p">
        <NextLink href="/" passHref>
          {/* <LinkChakra color="white">
            {siteTitle}
          </LinkChakra> */}
          <Link color="white">{siteTitle}</Link>
        </NextLink>
      </Center>
    </Flex>
  );
}
