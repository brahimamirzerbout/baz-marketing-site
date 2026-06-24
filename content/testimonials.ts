import type { Testimonial } from '@/types';

/**
 * Customer testimonials. Each quote is attributed to a real-feeling
 * persona from one of our case studies, with the matching outcome metric.
 * Names and companies are fictional composites, written to read like a
 * real customer wrote them. Replace with real ones before public launch.
 *
 * `placeholder: true` stays on each entry until you swap in real
 * testimonials from signed clients.
 */
export const testimonials: Testimonial[] = [
  {
    quote: 'BAZ rebuilt our growth engine. We finally trust the numbers and the team running them.',
    author: 'Hala Mansour',
    role: 'Founder',
    company: 'ViralVista',
    metric: 'ROAS 1.8 → 4.6 in 90 days',
    placeholder: true,
  },
  {
    quote: 'They turned organic into our biggest channel. No one else got close.',
    author: 'Daniel K.',
    role: 'VP Growth',
    company: 'Northwind',
    metric: '0 → 480K organic sessions / mo',
    placeholder: true,
  },
  {
    quote: 'Senior people, no juniors. They shipped what other agencies only pitch.',
    author: 'Mira Okafor',
    role: 'CEO',
    company: 'EngageEra',
    metric: 'Trial → Paid 0.6% → 2.4%',
    placeholder: true,
  },
  {
    quote: 'We own the direct channel now. The ROI paid for itself in 11 weeks.',
    author: 'Reem Al-Fahim',
    role: 'CMO',
    company: 'Saffron & Co.',
    metric: 'Direct bookings +71%',
    placeholder: true,
  },
  {
    quote: "We're cited by the LLMs now. That is a moat no one else in our category has.",
    author: 'Sora Tanaka',
    role: 'Head of Marketing',
    company: 'Meridian Labs',
    metric: '28 AI Overview citations',
    placeholder: true,
  },
  {
    quote: 'The podcast is our biggest sales asset. It compounds every week without us having to think about it.',
    author: 'Idris Bah',
    role: 'Founder & CEO',
    company: 'Tessera',
    metric: '+$6.4M attributed pipeline, yr 1',
    placeholder: true,
  },
  {
    quote: 'We went from a brand nobody had heard of to one creators actively ask to work with.',
    author: 'Yara Halabi',
    role: 'Co-founder',
    company: 'Lumenwear',
    metric: '$11 EMV per $1 spent',
    placeholder: true,
  },
  {
    quote: 'Our reps now walk into deals where the buyer already has a thesis. That is the ABM game.',
    author: 'Priya Iyer',
    role: 'VP Sales',
    company: 'Kantara',
    metric: 'Pipeline +$24M in 9 months',
    placeholder: true,
  },
];
