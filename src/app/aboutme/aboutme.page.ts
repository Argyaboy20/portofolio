import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.page.html',
  styleUrls: ['./aboutme.page.scss'],
  standalone: false,
})
export class AboutmePage implements OnInit {

  /* Language toggle properties */
  isEnglish = false; // Default is Indonesian
  
  /* Scroll button visibility */
  showScrollButton = false;
  
  constructor(private router: Router) { }

  ngOnInit() {
    /* Check scroll position on init */
    this.checkScrollPosition();
  }
  
  /**
   * Toggle between English and Indonesian language
   */
  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
  }
  
  /**
   * Scroll to top function for the arrow button
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  /**
   * Listen for scroll events to show/hide the scroll button
   */
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkScrollPosition();
  }
  
  /**
   * Check scroll position and update button visibility
   */
  private checkScrollPosition() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    /* Show button only when scrolled down at least 300px */
    this.showScrollButton = scrollPosition > 300;
  }
}