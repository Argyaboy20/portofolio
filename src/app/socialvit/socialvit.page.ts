import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from "@vercel/analytics";

/* Initialize Vercel Analytics */
inject();

@Component({
  selector: 'app-socialvit',
  templateUrl: './socialvit.page.html',
  styleUrls: ['./socialvit.page.scss'],
  standalone: false,
})
export class SocialvitPage implements OnInit {
  
  /* ViewChild reference for carousel manipulation */
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef;
  
  /* Current language state - default to Indonesian */
  currentLanguage: 'id' | 'en' = 'id';
  
  /* Active carousel index */
  activeIndex: number = 0;
  
  /* Gallery items data with bilingual support */
  galleryItems = [
    {
      image: 'assets/1.png',
      title_id: 'Dashboard Utama',
      title_en: 'Main Dashboard',
      description_id: 'Interface utama aplikasi admin SocialVit dengan desain yang clean dan user-friendly',
      description_en: 'Main interface of SocialVit application admin with clean and user-friendly design'
    },
    {
      image: 'assets/2.png',
      title_id: 'Sistem CV Registrants',
      title_en: 'CV Analyzer Registrants',
      description_id: 'Fitur manajemen pembayaran CV dan pendaftaran pengguna yang saya kembangkan',
      description_en: 'CV payment management and user registration feature that I developed'
    },
  ];
  
  /* Tech stack data with bilingual descriptions */
  techStack = [
    {
      name: 'Laravel',
      icon: 'assets/icon/laravel.png',
      description_id: 'Framework PHP untuk backend yang powerful dan elegan',
      description_en: 'Powerful and elegant PHP framework for backend development'
    },
    {
      name: 'Vite',
      icon: 'https://vitejs.dev/logo.svg',
      description_id: 'Build tool modern untuk development yang cepat',
      description_en: 'Modern build tool for fast development'
    },
    {
      name: 'Angular',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      description_id: 'Framework frontend untuk aplikasi web yang dinamis',
      description_en: 'Frontend framework for dynamic web applications'
    },
    {
      name: 'MySQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      description_id: 'Database relasional untuk penyimpanan data yang efisien',
      description_en: 'Relational database for efficient data storage'
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      description_id: 'Superset JavaScript dengan type safety',
      description_en: 'JavaScript superset with type safety'
    }
  ];
  
  /* Carousel auto-slide interval reference */
   private autoSlideInterval: any;

  constructor(private router: Router) { }

  ngOnInit() {
    /* Initialize auto-slide functionality */
    this.startAutoSlide();
  }

  ngOnDestroy() {
    /* Clean up auto-slide interval */
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  /* Toggle between Indonesian and English language */
  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
  }

  /* Navigate to home page */
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  /* Start automatic carousel sliding */
  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  /* Stop automatic carousel sliding */
  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  /* Move to next slide */
  nextSlide(): void {
    if (this.activeIndex < this.galleryItems.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0; // Loop back to first slide
    }
  }

  /* Move to previous slide */
  previousSlide(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.galleryItems.length - 1; // Loop to last slide
    }
  }

  /* Go to specific slide */
  goToSlide(index: number): void {
    if (index >= 0 && index < this.galleryItems.length) {
      this.activeIndex = index;
    }
    
    /* Restart auto-slide after manual navigation */
    this.stopAutoSlide();
    setTimeout(() => {
      this.startAutoSlide();
    }, 3000);
  }
}