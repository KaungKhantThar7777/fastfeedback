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
  Text,
  Button,
} from "@chakra-ui/core";
import { useAuth } from "@/lib/auth";

const DashboardShell = ({ children }) => {
  const { user } = useAuth();
  console.log({ user });

  return (
    <Flex flexDirection="column" height="100vh">
      <Flex justifyContent="space-between" backgroundColor="white" py={5} px={8}>
        <Stack isInline spacing={4} align="center">
          <Icon name="logo" color="black" />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems="center" justifyContent="space-around">
          <Link mr={4}>Account</Link>
          <Avatar size="sm" src={user.photoUrl} />
        </Flex>
      </Flex>
      <Flex backgroundColor="blackAlpha.50" height="100%" overflow="visible">
        <Flex
          justifyContent="flex-start"
          alignItems="stretch"
          ml="auto"
          mr="auto"
          maxWidth="1000px"
          width="100%"
        >
          <Breadcrumb py={12} width="100%">
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontWeight="400" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
            <Heading mt={2} mb={6}>
              My Sites
            </Heading>
            {children}
          </Breadcrumb>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;