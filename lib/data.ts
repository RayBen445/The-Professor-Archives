export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  author?: string;
  featured?: boolean;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'The Forgotten Front of East Africa',
    excerpt: 'During World War I, over a million African soldiers and carriers fought in a brutal campaign that has been largely forgotten by history.',
    category: 'WWI',
    date: '2024-01-15',
    featured: true,
    author: 'The Professor',
  },
  {
    id: '2',
    title: 'The League of Nations and Africa',
    excerpt: 'How the League of Nations mandate system reshaped African territories after WWI, creating new colonial boundaries.',
    category: 'League of Nations',
    date: '2024-01-10',
    author: 'The Professor',
  },
  {
    id: '3',
    title: 'Ghana\'s Path to Independence',
    excerpt: 'The story of how Ghana became the first sub-Saharan African nation to gain independence in 1957.',
    category: 'Independence',
    date: '2024-01-05',
    author: 'The Professor',
  },
  {
    id: '4',
    title: 'African Soldiers in WWII',
    excerpt: 'Over a half-million African soldiers served in WWII, their contributions often overlooked in mainstream narratives.',
    category: 'WWII',
    date: '2023-12-28',
    author: 'The Professor',
  },
  {
    id: '5',
    title: 'The Commonwealth\'s African Legacy',
    excerpt: 'Understanding the complex relationship between African nations and the British Commonwealth post-independence.',
    category: 'The Commonwealth',
    date: '2023-12-20',
    author: 'The Professor',
  },
  {
    id: '6',
    title: 'Ethiopia and the League',
    excerpt: 'Ethiopia\'s plea to the League of Nations during the Italian invasion of 1935 - a pivotal moment in international diplomacy.',
    category: 'League of Nations',
    date: '2023-12-15',
    author: 'The Professor',
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: 1914,
    title: 'WWI Begins',
    description: 'African colonies become battlegrounds as European powers extend their war to the continent.',
  },
  {
    year: 1918,
    title: 'WWI Ends',
    description: 'The Treaty of Versailles redistributes German African colonies through League of Nations mandates.',
  },
  {
    year: 1935,
    title: 'Ethiopia Invaded',
    description: 'Italy invades Ethiopia, testing the League of Nations and previewing WWII aggression.',
  },
  {
    year: 1945,
    title: 'WWII Ends',
    description: 'African soldiers return home with new expectations, planting seeds of independence movements.',
  },
  {
    year: 1960,
    title: 'Year of Africa',
    description: '17 African nations gain independence, fundamentally reshaping the global political landscape.',
  },
];
