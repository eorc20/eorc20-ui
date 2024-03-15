import React from "react";
import Text from "@inscription/uikit/src/components/Text/Text";
import Dropdown from "@inscription/uikit/src/components/Dropdown/Dropdown";
import Button from "@inscription/uikit/src/components/Button/Button";
import LanguageIcon from "@inscription/uikit/src/components/Svg/Icons/Language";
import MenuButton from "@inscription/uikit/src/components/LangSelector/MenuButton";
import { Colors } from "@inscription/uikit/src/theme";
import { Language } from "@inscription/uikit/src/components/LangSelector/types";
import { Position } from "@inscription/uikit/src/components/Dropdown/types";
import { Scale } from "@inscription/uikit/src/components/Button/types";

interface Props {
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
  color: keyof Colors;
  dropdownPosition?: Position;
  buttonScale?: Scale;
  hideLanguage?: boolean;
}

const LangSelector: React.FC<React.PropsWithChildren<Props>> = ({
  currentLang,
  langs,
  color,
  setLang,
  dropdownPosition = "bottom",
  buttonScale = "md",
  hideLanguage = false,
}) => (
  <Dropdown
    position={dropdownPosition}
    target={
      <Button scale={buttonScale} variant="text" startIcon={<LanguageIcon color={color} width="24px" />}>
        {!hideLanguage && <Text color={color}>{currentLang?.toUpperCase()}</Text>}
      </Button>
    }
  >
    {langs.map((lang) => (
      <MenuButton
        key={lang.locale}
        fullWidth
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: "32px", height: "auto" }}
      >
        {lang.language}
      </MenuButton>
    ))}
  </Dropdown>
);

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang);
