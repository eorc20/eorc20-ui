import React from "react";
import { darkColors } from "@inscription/uikit/src/theme";
import { FlexProps } from "@inscription/uikit/src/components/Box";
import Flex from "@inscription/uikit/src/components/Box/Flex";
import Dropdown from "@inscription/uikit/src/components/Dropdown/Dropdown";
import Link from "@inscription/uikit/src/components/Link/Link";
import { socials } from "@inscription/uikit/src/components/Footer/config";

const SocialLinks: React.FC<React.PropsWithChildren<FlexProps>> = ({ ...props }) => (
  <Flex {...props}>
    {socials.map((social, index) => {
      const iconProps = {
        width: "20px",
        color: darkColors.textSubtle,
        style: { cursor: "pointer" },
      };
      const Icon = social.icon;
      const mr = index < socials.length - 1 ? "24px" : 0;
      if (social.items) {
        return (
          <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>
            {social.items.map((item) => (
              <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                {item.label}
              </Link>
            ))}
          </Dropdown>
        );
      }
      return (
        <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
          <Icon {...iconProps} />
        </Link>
      );
    })}
  </Flex>
);

export default React.memo(SocialLinks, () => true);
