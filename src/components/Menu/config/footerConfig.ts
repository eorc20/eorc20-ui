import { FooterLinkType } from '@inscription/uikit'
import { ContextApi } from '@inscription/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('public103'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.public.pro/contact-us',
        isHighlighted: true,
      },
      {
        label: t('Brand'),
        href: 'https://docs.public.pro/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/inscription',
      },
      {
        label: t('Community'),
        href: 'https://docs.public.pro/contact-us/telegram',
      },
      {
        label: t('Litepaper'),
        href: 'https://v2litepaper.public.pro/',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: 'https://inscription.creator-spring.com/',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.public.pro/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.public.pro/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.public.pro/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/inscription',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.public.pro',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://docs.public.pro/code/bug-bounty',
      },
      {
        label: t('Audits'),
        href: 'https://docs.public.pro/help/faq#is-inscription-safe-has-inscription-been-audited',
      },
      {
        label: t('Careers'),
        href: 'https://docs.public.pro/hiring/become-a-chef',
      },
    ],
  },
]
