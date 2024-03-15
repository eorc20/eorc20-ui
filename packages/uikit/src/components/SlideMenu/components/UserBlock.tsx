import React from "react";
import Button from "@inscription/uikit/src/components/Button/Button";
import { useWalletModal } from "@inscription/uikit/src/widgets/WalletModal";
import { Login } from "@inscription/uikit/src/widgets/WalletModal/types";

interface Props {
  account?: string;
  login: Login;
}

const UserBlock: React.FC<Props> = ({ account, login }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <div>
      {account ? (
        <Button
          scale="sm"
          variant="tertiary"
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        <Button
          scale="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          Connect
        </Button>
      )}
    </div>
  );
};

export default React.memo(UserBlock, (prevProps, nextProps) => prevProps.account === nextProps.account);
