import { ReactElement } from "react";
import Link from "next/link";

// import Layout from "components/common/Layout";
import PostLayout from "components/common/PostLayout";

import {
  Text,
  Container,
  Box,
  HStack,
  Link as LinkChakra,
  Avatar,
  Image,
  Stack,
  Heading,
  Center,
  Divider,
  SkeletonCircle,
  SkeletonText,
  Button,
} from "@chakra-ui/react";

import { formatDistance } from "date-fns";
import ja from "date-fns/locale/ja";

import Meta from "components/common/Meta";
import Hero from "components/parts/Hero";

import { useHome } from ".";

export default function Home() {
  const {
    currentAuth,
    totalUsers,
    error,
    data,
    users,
    currentType,
    replaceBr,
    isLast,
    isValidating,
    leadMore,
  } = useHome();

  return (
    <>
      <Meta />
      <Hero title="今日のうんこ💩" text={currentAuth()} />

      <p>{totalUsers} ユーザーがリストされています</p>

      <Container display="grid" gap="8">
        {error && <Text>failed to load</Text>}
        {data &&
          data.map((posts) => {
            return posts.map((post: any, index: number) => {
              return (
                <Box key={index}>
                  <HStack spacing="8" align="start">
                    {users.map((user: any) => {
                      if (user.uid === post.uid) {
                        return (
                          <Link href={`/${user.id}`} key={user.uid} passHref>
                            <LinkChakra position="relative">
                              <Avatar
                                boxSize="160px"
                                name={user.displayName ? user.displayName : ""}
                                src={user.photoURL ? user.photoURL : ""}
                              />
                              <Box
                                position="absolute"
                                bgColor="white"
                                p="2"
                                borderWidth="4px"
                                borderColor="cyan.600"
                                top="-2"
                                right="-2"
                                borderRadius="full"
                              >
                                <Image
                                  boxSize="40px"
                                  src={currentType(post.type, "image")}
                                  alt={currentType(post.type, "label")}
                                />
                              </Box>
                            </LinkChakra>
                          </Link>
                        );
                      }
                    })}

                    <Stack flex="1" spacing="2">
                      {users.map((user: any) => {
                        if (user.uid === post.uid) {
                          return (
                            <Link href={`/${user.id}`} key={user.uid} passHref>
                              <LinkChakra
                                display="flex"
                                alignItems="center"
                                gap="2"
                                _hover={{ color: "cyan.600" }}
                              >
                                <Heading size="sm">{user.displayName}</Heading>
                                <Text>@{user.id}</Text>
                              </LinkChakra>
                            </Link>
                          );
                        }
                      })}
                      {post.comment && (
                        <Text
                          // fontSize="lg"
                          py="2"
                          px="4"
                          borderWidth="2px"
                          borderColor="gray.400"
                          borderRadius="md"
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: replaceBr(post.comment),
                            }}
                          />
                        </Text>
                      )}
                      <Box
                        as="time"
                        display="block"
                        color="gray.600"
                        fontSize="sm"
                        textAlign="right"
                      >
                        {/* {post.timestamp && post.timestamp.toDate().toLocaleString()} */}
                        {post.timestamp &&
                          formatDistance(post.timestamp.toDate(), new Date(), {
                            addSuffix: true,
                            locale: ja,
                          })}
                      </Box>
                    </Stack>
                  </HStack>
                  {!isLast && (
                    <Center height="50px">
                      <Divider orientation="vertical" borderColor="black" />
                    </Center>
                  )}
                </Box>
              );
            });
          })}
        {isValidating && (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        )}
      </Container>
      {!isLast && (
        <Button colorScheme="cyan" size="lg" color="white" onClick={leadMore}>
          もっと見る
        </Button>
      )}
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    // <Layout>
    <PostLayout>{page}</PostLayout>
    // </Layout>
  );
};
