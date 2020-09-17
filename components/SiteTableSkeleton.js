import React from "react";
import { Box, Skeleton } from "@chakra-ui/core";
import { Table, Tr, Th, Td } from "./Table";

const SkeletonRow = ({ width }) => (
  <Box as="tr">
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box>
);

const SiteTableSkeleton = () => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width="155px" />
        <SkeletonRow width="205px" />
        <SkeletonRow width="100px" />
        <SkeletonRow width="160px" />
        <SkeletonRow width="175px" />
      </tbody>
    </Table>
  );
};

export default SiteTableSkeleton;
