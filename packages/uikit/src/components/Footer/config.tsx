import { Language } from "@inscription/uikit/src/components/LangSelector/types";
import { FooterLinkType } from "@inscription/uikit/src/components/Footer/types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, MediumIcon } from "@inscription/uikit/src/components/Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.public.pro/contact-us",
      },
      {
        label: "Blog",
        href: "https://medium.com/inscription",
      },
      {
        label: "Community",
        href: "https://docs.public.pro/contact-us/telegram",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://inscription.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.public.pro/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.public.pro/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.public.pro/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/inscription",
      },
      {
        label: "Documentation",
        href: "https://docs.public.pro",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@inscription-1/s/inscription/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.public.pro/help/faq#is-inscription-safe-has-inscription-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.public.pro/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/inscription",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    items: [
      {
        label: "English",
        href: "https://t.me/inscription",
      },
    ],
  },
  {
    label: "Reddit",
    icon: RedditIcon,
    href: "https://reddit.com/r/inscription",
  },
  {
    label: "Github",
    icon: GithubIcon,
    href: "https://github.com/inscription/",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/inscription",
  },
  {
    label: "Medium",
    icon: MediumIcon,
    href: "https://medium.com/inscription",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
