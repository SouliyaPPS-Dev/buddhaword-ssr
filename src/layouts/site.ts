export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'ຄຳສອນພຸດທະ',
  description: 'ຄຳສອນພຣະພຸດທະເຈົ້າ',
  navItems: [
    { label: 'ພຣະສູດ', href: '/sutra' },
    { label: 'ປື້ມ', href: '/book' },
    { label: 'Video', href: '/video' },
    { label: 'ປະຕິທິນ', href: '/calendar' },
  ],
  navMenuItems: [
    { label: 'ພຣະສູດ', href: '/sutra' },
    { label: 'ຖືກໃຈ', href: '/favorites' },
    { label: 'ປື້ມ', href: '/book' },
    { label: 'Video', href: '/video' },
    { label: 'ປະຕິທິນ', href: '/calendar' },
    { label: 'ພຣະທັມ', href: '/dhamma' },
    { label: 'ຂໍ້ມູນຕິດຕໍ່', href: '/about' },
  ],
  tabMenuItems: [
    { label: 'ພຣະສູດ', href: '/sutra' },
    { label: 'ຖືກໃຈ', href: '/favorites' },
    { label: 'ປື້ມ', href: '/book' },
    { label: 'Video', href: '/video' },
    { label: 'ປະຕິທິນ', href: '/calendar' },
    { label: 'ຂໍ້ມູນຕິດຕໍ່', href: '/about' },
  ],
};
