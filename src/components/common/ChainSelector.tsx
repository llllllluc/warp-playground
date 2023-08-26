import { Flex, Select } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

import { CHAIN_NEUTRON, CHAIN_TERRA } from "@/utils/constants";
import useCurrentChain from "@/hooks/useCurrentChain";

export const ChainSelector = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { currentChain } = useCurrentChain();

  const handleSelectChange = (event: any) => {
    const selectedOption = event.target.value;
    router.push(`${pathname}/?chain=${selectedOption}`);
  };

  return (
    <Flex direction="row" align="center" justify="center">
      Current chain
      <Select defaultValue={currentChain} onChange={handleSelectChange}>
        <option value={CHAIN_TERRA}>Terra</option>
        <option value={CHAIN_NEUTRON}>Neutron</option>
        {/* <option value={CHAIN_OSMOSIS}>Osmosis</option> */}
      </Select>
    </Flex>
  );
};
