import { BoxProps } from "@inscription/uikit/src/components/Box";

export interface ModalTheme {
  background: string;
}

export type Handler = () => void;

export interface InjectedProps {
  onDismiss?: Handler;
  mode?: string;
}

export interface ModalProps extends InjectedProps, Omit<BoxProps, "title"> {
  title: React.ReactNode;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
  headerBackground?: string;
  icon?: boolean;
}
