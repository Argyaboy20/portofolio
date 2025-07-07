import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from "@vercel/analytics";

inject();

@Component({
  selector: 'app-itsupport',
  templateUrl: './itsupport.page.html',
  styleUrls: ['./itsupport.page.scss'],
  standalone: false,
})
export class ItsupportPage implements OnInit, OnDestroy {

  /* Language state management */
  currentLanguage: 'id' | 'en' = 'id';
  
  /* Original document title for restoration */
  private originalTitle: string = '';
  
  /* Storage key for language preference */
  private readonly LANGUAGE_KEY = 'itsupport_language';

  constructor(private router: Router) { }

  ngOnInit() {
    this.initializeComponent();
  }

  ngOnDestroy() {
    this.resetLanguageOnExit();
  }

  /* INITIALIZATION METHODS */

  /* Initialize component with default settings */
  private initializeComponent(): void {
    this.setDefaultLanguage();
    this.setDocumentTitle();
    this.optimizePagePerformance();
  }

  /* Set default language to Indonesian */
  private setDefaultLanguage(): void {
    this.currentLanguage = 'id';

    /* Clear any previous language preference */
    if (typeof Storage !== 'undefined') {
      localStorage.removeItem(this.LANGUAGE_KEY);
    }
  }

  /* Set document title based on current language */
  private setDocumentTitle(): void {
    const titles = {
      id: 'IT Support - Maulana Farras Blog\'s',
      en: 'IT Support - Maulana Farras Blog\'s'
    };
    
    if (typeof document !== 'undefined') {
      this.originalTitle = document.title;
      document.title = titles[this.currentLanguage];
    }
  }

  /* Optimize page performance */
  private optimizePagePerformance(): void {
    /* Preload hero image for faster rendering */
    if (typeof window !== 'undefined' && window.Image) {
      const heroImage = new Image();
      heroImage.src = '/assets/itsupport.jpg';
      heroImage.loading = 'eager';
    }

    /* Optimize scroll performance */
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.throttleScroll.bind(this), { passive: true });
    }
  }

  /* LANGUAGE MANAGEMENT */

  /* Toggle between Indonesian and English */
  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
    this.setDocumentTitle();
    this.announceLanguageChange();
  }

  /* Announce language change for accessibility */
  private announceLanguageChange(): void {
    const messages = {
      id: 'Bahasa diubah ke Indonesia',
      en: 'Language changed to English'
    };
    
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(messages[this.currentLanguage]);
      utterance.volume = 0.1;
      utterance.rate = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  }

  /* Reset language to Indonesian when user exits */
  private resetLanguageOnExit(): void {
    this.currentLanguage = 'id';
    
    /* Restore original document title */
    if (typeof document !== 'undefined' && this.originalTitle) {
      document.title = this.originalTitle;
    }
    
    /* Clean up event listeners */
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.throttleScroll.bind(this));
    }
  }

  /* NAVIGATION METHODS */

  /* Navigate to home page */
  navigateToHome(): void {
    try {
      this.router.navigate(['/']);
    } catch (error) {
      console.warn('Navigation failed:', error);
      /* Fallback navigation */
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  }

  /* PERFORMANCE OPTIMIZATION */

  /* Throttle scroll events for better performance */
  private throttleScroll(): void {
    /* Implement scroll-based optimizations */
    if (typeof window !== 'undefined') {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      /* Add scroll-based animations or lazy loading here */
      this.handleScrollEffects(scrollTop);
    }
  }

  /* Handle scroll-based visual effects */
  private handleScrollEffects(scrollTop: number): void {
    /* Implement parallax or fade effects based on scroll position */
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    
    if (heroSection) {
      const opacity = Math.max(0, 1 - (scrollTop / window.innerHeight));
      heroSection.style.opacity = opacity.toString();
    }
  }

  /* UTILITY METHODS */

  /* Get current language display text */
  getLanguageDisplay(): string {
    return this.currentLanguage === 'id' ? 'ID' : 'EN';
  }

  /* Get opposite language for toggle button */
  getToggleLanguageText(): string {
    return this.currentLanguage === 'id' ? 'EN' : 'ID';
  }

  /* Check if current language is Indonesian */
  isIndonesian(): boolean {
    return this.currentLanguage === 'id';
  }

  /* Check if current language is English */
  isEnglish(): boolean {
    return this.currentLanguage === 'en';
  }

  /* ERROR HANDLING */

  /* Handle component errors gracefully */
  private handleError(error: any, context: string): void {
    console.error(`Error in ${context}:`, error);
    
    /* Implement error recovery logic */
    if (context === 'navigation') {
      this.showErrorMessage('Navigation failed. Please try again.');
    } else if (context === 'language') {
      this.currentLanguage = 'id'; /* Reset to default */
      this.showErrorMessage('Language setting reset to default.');
    }
  }

  /* Show error message to user */
  private showErrorMessage(message: string): void {
    /* Implement toast notification or alert */
    if (typeof window !== 'undefined' && window.console) {
      console.warn('User Message:', message);
    }
  }

  /* LIFECYCLE HOOKS */

  /* Handle page visibility changes */
  private handleVisibilityChange(): void {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          /* Pause non-essential operations */
          this.pauseAnimations();
        } else {
          /* Resume operations */
          this.resumeAnimations();
        }
      });
    }
  }

  /* Pause animations when page is hidden */
  private pauseAnimations(): void {
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
      (element as HTMLElement).style.animationPlayState = 'paused';
    });
  }

  /* Resume animations when page is visible */
  private resumeAnimations(): void {
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
      (element as HTMLElement).style.animationPlayState = 'running';
    });
  }

}