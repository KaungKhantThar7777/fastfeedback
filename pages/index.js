import { Button, Code, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/core";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { user, signInWithGithub, signInWithGoogle } = useAuth();
  return (
    <Flex as="main" direction="column" align="center" justify="center" h="100vh">
      <Head>
        <title>Fast Feedback</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
      </Head>

      <Icon name="logo" color="black" size="64px" />
      <Heading>Fast Feedback</Heading>
      {user ? (
        <Button>
          <Link href="/dashboard">
            <a>View Dashboard</a>
          </Link>
        </Button>
      ) : (
        <Stack isInline>
          <Button
            leftIcon="github"
            mt={4}
            size="lg"
            onClick={() => signInWithGithub()}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: "gray.700" }}
            _active={{ bg: "gray.800", transform: "scale(0.95)" }}
          >
            Sign In With Github
          </Button>

          <Button
            leftIcon="google"
            mt={4}
            size="lg"
            onClick={() => signInWithGoogle()}
            backgroundColor="white"
            variant="outline"
            color="gray.900"
            fontWeight="medium"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.100", transform: "scale(0.95)" }}
          >
            Sign In With Google
          </Button>
        </Stack>
      )}
    </Flex>
  );
}
