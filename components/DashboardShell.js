import React from "react";
import {
  Flex,
  Icon,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useAuth } from "@/lib/auth";
import AddSiteModal from "./AddSiteModal";

const DashboardShell = ({ sites, children }) => {
  const { user, signout } = useAuth();

  return (
    <Flex flexDirection="column" height="100vh">
      <Flex justifyContent="space-between" backgroundColor="white" py={5} px={8}>
        <Stack isInline spacing={4} align="center">
          <NextLink href="/" passHref>
            <Icon name="logo" color="black" size="24px" mr={8} />
          </NextLink>
          <NextLink href="/dashboard" passHref>
            <Link mr={4}>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link mr={4}>Feedback</Link>
          </NextLink>
        </Stack>
        <Flex alignItems="center" justifyContent="space-around">
          <Button onClick={signout} mr={4}>
            Logout
          </Button>
          <Avatar size="sm" src={user?.photoUrl} />
        </Flex>
      </Flex>
      <Flex backgroundColor="blackAlpha.50" height="100%" overflow="visible">
        <Flex
          justifyContent="flex-start"
          direction="column"
          alignItems="stretch"
          ml="auto"
          mr="auto"
          maxWidth="1000px"
          width="100%"
        >
          <Breadcrumb pt={12} width="100%">
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontWeight="400" fontSize="sm">
                {sites ? "Sites" : "Feedback"}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justifyContent="space-between">
            <Heading mt={2} mb={6}>
              {sites ? "My Sites" : "My Feedback"}
            </Heading>
            {sites ? <AddSiteModal text="+ Add Site" /> : null}
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
