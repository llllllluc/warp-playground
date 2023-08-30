import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Msg, MsgSend } from "@terra-money/feather.js";
import useMyWallet from "@/hooks/useMyWallet";
import { useConnectedWallet, useWallet } from "@terra-money/wallet-kit";

type CreateAndBroadcastTxModalProps = {
  msgs: Msg[];
  buttonText: string;
  disabled: boolean;
};

const CreateAndBroadcastTxModal = ({
  msgs,
  buttonText,
  disabled,
}: CreateAndBroadcastTxModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentChainId, post, connectionStatus } = useMyWallet();

  const onCreateAndBroadcastTx = () => {
    setIsProcessing(true);

    post({
      chainID: currentChainId,
      msgs: [
        new MsgSend(
          "terra1903a3ymy0klyzgvf2eguype6lvv83v0y50w48y",
          "terra1903a3ymy0klyzgvf2eguype6lvv83v0y50w48y",
          { uluna: "100" }
        ),
      ],
    })
      .then((postResponse) => {
        console.log(JSON.stringify(postResponse, null, 2));
      })
      .catch((e) => {})
      .finally(() => {
        setIsProcessing(false);
      });

    // simulate({
    //   messages: msgs,
    //   wallet: wallet,
    // })
    //   .then((result) => {
    //     return broadcast({
    //       wallet,
    //       messages: msgs,
    //       mobile: isMobile(),
    //       // use automatic gas estimation
    //       feeAmount: result.fee!.amount[0].amount,
    //       gasLimit: result.fee!.gas,
    //     });
    //   })
    //   .catch((error) => {
    //     // TODO: think about how to handle error
    //     console.log("in simulate", error);
    //     alert(error.message);
    //     throw error;
    //   })
    //   // broadcast({
    //   //   wallet,
    //   //   messages: msgs,
    //   //   mobile: isMobile(),
    //   //   // use automatic gas estimation, this is not working for some reason, TODO: fix it in shuttle
    //   // })
    //   .then((result) => {
    //     // TODO: think about what to do with result, maybe display it and update some state to avoid reload page
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log("in broadcast", error);
    //     // TODO: think about how to handle error
    //     alert(error.message);
    //     throw error;
    //   })
    //   .finally(() => {
    //     setIsProcessing(false);
    //     window.location.reload();
    //   });
  };

  return (
    <Button
      colorScheme="blue"
      onClick={onCreateAndBroadcastTx}
      isDisabled={disabled || isProcessing || connectionStatus !== "CONNECTED"}
    >
      {isProcessing ? "broadcasting tx..." : buttonText}
    </Button>
  );
};

export default CreateAndBroadcastTxModal;
