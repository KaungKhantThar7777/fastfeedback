import { Button, Code, Heading, Text } from "@chakra-ui/core";
import Head from "next/head";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { user, signInWithGithub, signout } = useAuth();
  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Fast Feedback</Heading>

        <Text>
          Current user: <Code>{user ? user.email : "None"}</Code>
        </Text>
        <Button onClick={() => signInWithGithub()}>Sign in</Button>

        {user && <Button onClick={() => signout()}>Sign out</Button>}
      </main>
    </div>
  );
}
