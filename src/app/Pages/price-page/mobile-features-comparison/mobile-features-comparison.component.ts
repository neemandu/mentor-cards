import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-features-comparison',
  templateUrl: './mobile-features-comparison.component.html',
  styleUrls: ['./mobile-features-comparison.component.css'],
})
export class MobileFeaturesComparisonComponent {
  @Input() monthlyPrice: string = '₪69';

  features = [
    {
      title: 'Access to two digital card decks + 2 full guidebooks',
      basic: true,
      mentorPro: true,
    },
    {
      title:
        'Full use of platform features: hidden/visible cards, solo/group invites, random draw, and more',
      basic: true,
      mentorPro: true,
    },
    {
      title:
        'Mentor Community membership: sharing, inspiration, advice, and selected learning events',
      basic: true,
      mentorPro: true,
    },
    {
      title: 'Monthly email with curated inspiration from the field',
      basic: true,
      mentorPro: true,
    },
    {
      title: 'Full access to all card decks on the platform (40+)',
      basic: false,
      mentorPro: true,
    },
    {
      title: 'Access to recorded trainings and professional learning sessions',
      basic: false,
      mentorPro: true,
    },
    {
      title: 'In-depth guidebooks with exercises, questions, and examples',
      basic: false,
      mentorPro: true,
    },
    {
      title:
        'Participation in MentorPro events – learning, creator showcases, professional networking',
      basic: false,
      mentorPro: true,
    },
    {
      title: 'Advanced professional email series by topics and domains',
      basic: false,
      mentorPro: true,
    },
    {
      title:
        'Marketing exposure, business tools, and personal/professional development resources',
      basic: false,
      mentorPro: true,
    },
    {
      title: 'Priority access to events, discounts, and special offers',
      basic: false,
      mentorPro: true,
    },
    {
      title: '1-on-1 onboarding session with a Mentor Cards expert',
      basic: false,
      mentorPro: true,
    },
  ];
}
