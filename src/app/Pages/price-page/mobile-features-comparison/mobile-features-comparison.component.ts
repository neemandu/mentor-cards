import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';

@Component({
  selector: 'app-mobile-features-comparison',
  templateUrl: './mobile-features-comparison.component.html',
  styleUrls: ['./mobile-features-comparison.component.css'],
})
export class MobileFeaturesComparisonComponent implements AfterViewInit {
  @ViewChild('tooltipContainer') tooltipContainer!: ElementRef;
  
  constructor(public langDirectionService: LangDirectionService) {}
  @Input() monthlyPrice: string = '₪69';
  @Input() pricePeriod: string = 'חודש';
  @Input() isAnnualBilling: boolean = false;

  ngAfterViewInit() {
    this.setupTooltipPositioning();
  }

  setupTooltipPositioning() {
    // Add event listeners for tooltip positioning
    const tooltipContainers = document.querySelectorAll('.tooltip-container');
    
    tooltipContainers.forEach(container => {
      const icon = container.querySelector('.info-icon');
      const tooltip = container.querySelector('.tooltip-content') as HTMLElement;
      
      if (icon && tooltip) {
        icon.addEventListener('mouseenter', () => {
          this.positionTooltip(container as HTMLElement, tooltip);
        });
        
        icon.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.positionTooltip(container as HTMLElement, tooltip);
        });
      }
    });
  }

  positionTooltip(container: HTMLElement, tooltip: HTMLElement) {
    const containerRect = container.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Reset any previous positioning
    tooltip.style.top = '';
    tooltip.style.bottom = '';
    tooltip.style.left = '';
    tooltip.style.right = '';
    tooltip.style.position = 'absolute';
    tooltip.style.transform = '';
    
    // Check if there's enough space above
    const spaceAbove = containerRect.top;
    const spaceBelow = viewportHeight - containerRect.bottom;
    const tooltipHeight = tooltipRect.height;
    
    // Determine vertical position
    if (spaceAbove >= tooltipHeight + 20) {
      // Position above
      tooltip.style.bottom = '100%';
      tooltip.style.marginBottom = '0.5rem';
      tooltip.style.marginTop = '';
    } else if (spaceBelow >= tooltipHeight + 20) {
      // Position below
      tooltip.style.top = '100%';
      tooltip.style.marginTop = '0.5rem';
      tooltip.style.marginBottom = '';
    } else {
      // Center in viewport if not enough space
      tooltip.style.position = 'fixed';
      tooltip.style.top = '50%';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translate(-50%, -50%)';
      tooltip.style.margin = '0';
      tooltip.style.zIndex = '1000';
      tooltip.style.maxWidth = '90vw';
    }
    
    // Determine horizontal position
    const spaceLeft = containerRect.left;
    const spaceRight = viewportWidth - containerRect.right;
    const tooltipWidth = tooltipRect.width;
    
    if (this.langDirectionService.currentLang === 'he') {
      // RTL positioning
      if (spaceRight >= tooltipWidth + 10) {
        tooltip.style.right = '0';
      } else if (spaceLeft >= tooltipWidth + 10) {
        tooltip.style.left = '0';
      } else {
        tooltip.style.left = '50%';
        tooltip.style.transform = tooltip.style.transform ? 
          tooltip.style.transform + ' translateX(-50%)' : 'translateX(-50%)';
      }
    } else {
      // LTR positioning
      if (spaceLeft >= tooltipWidth + 10) {
        tooltip.style.left = '0';
      } else if (spaceRight >= tooltipWidth + 10) {
        tooltip.style.right = '0';
      } else {
        tooltip.style.left = '50%';
        tooltip.style.transform = tooltip.style.transform ? 
          tooltip.style.transform + ' translateX(-50%)' : 'translateX(-50%)';
      }
    }
  }

  get features() {
    return [
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
        titleKey:
          'pages.price-page.features-comparison.features.advanced-email',
        basic: false,
        mentorPro: true,
      },
      {
        titleKey:
          'pages.price-page.features-comparison.features.marketing-tools',
        basic: false,
        mentorPro: true,
      },
      {
        titleKey:
          'pages.price-page.features-comparison.features.priority-access',
        basic: false,
        mentorPro: true,
      },
      {
        titleKey:
          'pages.price-page.features-comparison.features.onboarding-session',
        basic: false,
        mentorPro: this.isAnnualBilling,
      },
    ];
  }
}
