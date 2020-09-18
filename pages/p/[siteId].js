import Feedback from "@/components/Feedback";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/core";
import { useRef, useState } from "react";
import { createFeedback } from "@/lib/db";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  console.log({ sites });
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const [allFeedbacks, setAllFeedbacks] = useState(initialFeedback);
  const { user } = useAuth();
  const router = useRouter();
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      provider: user.provider,
      createdAt: new Date().toISOString(),
      siteId: router.query.siteId,
      status: "pending",
      text: inputRef.current.value,
    };

    setAllFeedbacks([newFeedback, ...allFeedbacks]);
    createFeedback(newFeedback);
  }
  return (
    <Box display="flex" flexDirection="column" width="full" maxWidth="700px" margin="0 auto">
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputRef} type="comment" id="comment" />
          <Button fontWeight="medium" mt={3} type="submit">
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedbacks.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
