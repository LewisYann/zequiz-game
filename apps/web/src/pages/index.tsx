import type { NextPage } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Head from "next/head";
import { Flex, Text, Link, Code, Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <Flex direction="column" align="center" justify="center" py="3" h="100vh">
      <Head>
        <title>Start-Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        direction="column"
        align="center"
        justify="center"
        w="full"
        flex="1"
        px="20"
      >
        <Heading as="h1" fontSize="6xl" fontWeight="bold">
          Welcome to{" "}
          <Link color="blue.600">La Zone Test!</Link>
        </Heading>

        <Text mt="3" fontSize="2xl">
          Get started by editing{" "}
          <Code
            p="3"
            fontSize="lg"
            bgColor="black.100"
            borderRadius="md"
            className="font-mono"
          >
            part one
          </Code>
        </Text>

        <Flex
          wrap="wrap"
          align="center"
          justify="space-around"
          maxW={["full", "4xl"]}
          mt="6"
        >
          <NextLink href="/login" passHref>
            <Link
              p="6"
              mt="6"
              w="96"
              border="1px"
              rounded="xl"
              color="blue.600"
              textAlign="left"
            >
              <Heading fontSize="2xl" fontWeight="bold">
                Login &rarr;
              </Heading>
              <Text mt="4" size="xl">
                Get login
              </Text>
            </Link>
          </NextLink>

          <NextLink href="/register" passHref>
            <Link
              p="6"
              mt="6"
              w="96"
              border="1px"
              rounded="xl"
              color="blue.600"
              textAlign="left"
            >
              <Heading as="h3" fontSize="2xl" fontWeight="bold">
                Register &rarr;
              </Heading>
              <Text mt="4" size="xl">
                Get register
              </Text>
            </Link>
          </NextLink>


        </Flex>
      </Flex>


    </Flex>
  );
};

export default Home;
