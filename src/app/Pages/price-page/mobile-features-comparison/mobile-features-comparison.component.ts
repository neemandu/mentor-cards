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
      titleKey: 'pages.price-page.features-comparison.features.two-decks',
      basic: true,
      mentorPro: true,
    },
    {
      titleKey:
        'pages.price-page.features-comparison.features.platform-features',
      basic: true,
      mentorPro: true,
    },
    {
      titleKey:
        'pages.price-page.features-comparison.features.community-membership',
      basic: true,
      mentorPro: true,
    },
    {
      titleKey: 'pages.price-page.features-comparison.features.monthly-email',
      basic: true,
      mentorPro: true,
    },
    {
      titleKey: 'pages.price-page.features-comparison.features.all-decks',
      basic: false,
      mentorPro: true,
    },
    {
      titleKey:
        'pages.price-page.features-comparison.features.recorded-trainings',
      basic: false,
      mentorPro: true,
    },
    {
      titleKey:
        'pages.price-page.features-comparison.features.in-depth-guidebooks',
      basic: false,
      mentorPro: true,
    },
    {
      titleKey:
        'pages.price-page.features-comparison.features.mentor-pro-events',
      basic: false,
      mentorPro: true,
    },
    {
      titleKey: 'pages.price-page.features-comparison.features.advanced-email',
      basic: false,
      mentorPro: true,
    },
    {
      titleKey: 'pages.price-page.features-comparison.features.marketing-tools',
      basic: false,
      mentorPro: true,
    },
    {
      titleKey: 'pages.price-page.features-comparison.features.priority-access',
      basic: false,
      mentorPro: true,
    },
    {
      titleKey:
        'pages.price-page.features-comparison.features.onboarding-session',
      basic: false,
      mentorPro: true,
    },
  ];
}
