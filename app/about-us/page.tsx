import { AboutPage } from '@/features/about';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Takeout Media',
  description: 'Learn more about Takeout Media, our mission, and our impact.',
};

/**
 * About Us Route
 * 
 * App Router page that renders the AboutPage feature.
 */
export default function Page() {
  return <AboutPage />;
}
