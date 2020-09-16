import React from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/core";

import DashboardShell from "./DashboardShell";

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Flex
      backgroundColor="white"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      p={12}
      borderRadius={8}
    >
      <Heading mb={2}>Get feedback on your website instantly.</Heading>
      <Text pb={2}>Start grow with us.</Text>
      <Button>Upgrade to Starter</Button>
    </Flex>
  </DashboardShell>
);

export default FreePlanEmptyState;
