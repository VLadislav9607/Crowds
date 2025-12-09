import { COLORS } from '@styles';

export const eventDashboardConfig = [
  {
    title: 'Active Events',
    subTitle: 'For invited talents & publicly posted events',
    count: 10,
    bgColor: COLORS.light_purple,
    textColor: COLORS.main,
    label: 'View',
  },
  {
    title: 'Upcoming Events',
    subTitle: 'For invited talents only',
    count: 10,
    bgColor: COLORS.light_purple,
    textColor: COLORS.main,
    label: 'View',
  },
  {
    title: 'Past Events',
    count: 10,
    bgColor: '#E0025214',
    textColor: COLORS.red,
    label: 'View',
  },
  {
    title: 'Drafts',
    count: 10,
    bgColor: '#F5F5F5',
    textColor: COLORS.main,
    label: 'View',
  },
];
