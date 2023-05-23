import { useWarpGetJobs } from "@/hooks/useWarpGetJobs";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Job } from "@/utils/job";

type WarpClosedJobsProps = {
  warpControllerAddress: string;
};

export const WarpClosedJobs = ({
  warpControllerAddress,
}: WarpClosedJobsProps) => {
  const [warpCancelledJobs, setWarpCancelledJobs] = useState<Job[]>([]);
  const [warpCancelledJobCount, setWarpCancelledJobCount] = useState(0);

  //Failed, Evicted, Cancelled
  const getWarpCancelledJobsResult = useWarpGetJobs({
    warpControllerAddress,
    status: "Cancelled",
  }).jobsResult.data;

  useEffect(() => {
    if (!getWarpCancelledJobsResult) {
      return;
    }
    setWarpCancelledJobCount(getWarpCancelledJobsResult.totalCount);
    setWarpCancelledJobs(getWarpCancelledJobsResult.jobs);
  }, [getWarpCancelledJobsResult]);

  const onClick = () => {};

  return (
    <Flex align="center" justify="center" direction="column">
      <Box>closed limit swap count {warpCancelledJobCount}</Box>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>closed limit swaps</TableCaption>
          <Thead>
            <Tr>
              <Th>job id</Th>
              <Th>detail</Th>
              <Th>action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {warpCancelledJobs.map((job) => (
              <Tr key={job.id}>
                <Td>{job.id}</Td>
                <Td>to be added</Td>
                <Td>
                  <Button onClick={onClick}>to be added</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
