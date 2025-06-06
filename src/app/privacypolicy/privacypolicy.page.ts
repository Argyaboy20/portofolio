import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.page.html',
  styleUrls: ['./privacypolicy.page.scss'],
  standalone: false,
})
export class PrivacypolicyPage implements OnInit, OnDestroy {
  
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  
  public isMobile: boolean = false;
  public showScrollTop: boolean = false;
  
  private readonly SCROLL_THRESHOLD = 200;

  constructor(
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.detectMobileDevice();
    // Reset scroll state saat masuk halaman
    this.showScrollTop = false;
    
    this.platform.ready().then(() => {
      this.detectMobileDevice();
    });
  }

  ngOnDestroy() {
    // Reset state saat keluar halaman
    this.showScrollTop = false;
  }

  private detectMobileDevice(): void {
    const screenWidth = window.innerWidth;
    this.isMobile = screenWidth <= 768 || this.platform.is('mobile');
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.detectMobileDevice();
  }

  /* Method untuk handle scroll pada ion-content - ini yang utama untuk Ionic */
  onContentScroll(event: any): void {
    const scrollTop = event.detail.scrollTop || 0;
    this.showScrollTop = scrollTop > this.SCROLL_THRESHOLD;
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }

  public goToAbout(): void {
    this.router.navigate(['/aboutme']);
  }

  public scrollToTop(): void {
    /* Method 1: Gunakan ViewChild (paling reliable) */
    if (this.content) {
      this.content.scrollToTop(300).then(() => {
        this.showScrollTop = false;
      });
      return;
    }

    /* Method 2: Coba scrollToTop() dari ion-content */
    const content = document.querySelector('ion-content');
    if (content && typeof (content as any).scrollToTop === 'function') {
      (content as any).scrollToTop(300);
      // Delay hide button setelah animasi selesai
      setTimeout(() => {
        this.showScrollTop = false;
      }, 350);
      return;
    }

    /* Method 3: Fallback ke scroll element dalam ion-content */
    const scrollElement = content?.shadowRoot?.querySelector('.inner-scroll') || 
                         content?.querySelector('.inner-scroll') ||
                         document.querySelector('ion-content .scroll-content') ||
                         document.querySelector('ion-content');
    
    if (scrollElement) {
      scrollElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Delay hide button setelah animasi selesai
      setTimeout(() => {
        this.showScrollTop = false;
      }, 350);
      return;
    }

    /* Method 4: Ultimate fallback ke window scroll */
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      this.showScrollTop = false;
    }, 350);
  }
}