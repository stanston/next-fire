import dynamic from "next/dynamic";
import { Stack, Avatar, Text, Heading, Box } from "@chakra-ui/react";

// import IdPie from "./IdPie";
const IdPie = dynamic(() => import("./Pie"), { ssr: false });
const IdBar = dynamic(() => import("./Bar"), { ssr: false });

import Meta from "components/common/Meta";

import { useId } from ".";

export default function Id() {
  const { user, posts, pie, bar } = useId();

  return (
    <>
      <Meta pageTitle={user.displayName} />

      <Stack align="center" spacing="2" mb="12">
        <Avatar
          boxSize="240px"
          name={user.displayName}
          src={user.photoURL ? user.photoURL : ""}
        />
        <Text fontSize="sm">@{user.id}</Text>
        <Heading as="h1" size="md">
          {user.displayName}
        </Heading>
      </Stack>

      <Heading size="lg" fontWeight="normal" textAlign="center">
        累計のうんこ
      </Heading>
      <Box fontSize="6xl" textAlign="center" mb="4">
        {posts.length}
        <Box as="span" fontSize="lg" fontWeight="normal" ml="2">
          回
        </Box>
      </Box>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing="8"
        textAlign="center"
        mb="12"
      >
        <Stack spacing="4" flex="1">
          <Heading as="h3" size="md">
            種類別割合
          </Heading>
          <IdPie data={pie} />
        </Stack>
        <Stack spacing="4" flex="1">
          <Heading as="h3" size="md">
            種類別回数
          </Heading>
          <IdBar data={bar} />
        </Stack>
      </Stack>

      <Heading size="lg" fontWeight="normal" textAlign="center" mb="4">
        今週のうんこ
      </Heading>
      <Text textAlign="center">など</Text>
    </>
  );
}
