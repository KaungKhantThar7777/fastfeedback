import React from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/core";

import DashboardShell from "./DashboardShell";
import AddSiteModal from "./AddSiteModa";

const EmptyState = () => (
  <DashboardShell>
    <Flex
      backgroundColor="white"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      p={12}
      pb={6}
      borderRadius={8}
    >
      <Heading mb={3} fontWeight="medium">
        You haven't add any sites.
      </Heading>
      <Text mb={3}>Let's get started.</Text>
      <AddSiteModal />
    </Flex>
  </DashboardShell>
);

export default EmptyState;
