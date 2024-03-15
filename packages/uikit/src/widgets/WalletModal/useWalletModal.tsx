import { useModal } from "@inscription/uikit/src/widgets/Modal";
import ConnectModal from "@inscription/uikit/src/widgets/WalletModal/ConnectModal";
import { Config, Login } from "@inscription/uikit/src/widgets/WalletModal/types";

interface ReturnType {
  onPresentConnectModal: () => void;
}

const useWalletModal = (login: Login, t: (key: string) => string, connectors?: Config[]): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t} connectors={connectors} />);
  return { onPresentConnectModal };
};

export default useWalletModal;
