import { Button, Code, Flex, Heading, Icon, Text } from "@chakra-ui/core";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { user, signInWithGithub, signout } = useAuth();
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
      {user ? (
        <Button>
          <Link href="/dashboard">
            <a>View Dashboard</a>
          </Link>
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={() => signInWithGithub()}>
          Sign in
        </Button>
      )}
    </Flex>
  );
}
