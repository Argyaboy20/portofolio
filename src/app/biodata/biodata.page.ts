import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { PostProvider } from '../../provider/post-providers';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { inject } from "@vercel/analytics"
import { PortfolioDataService } from '../services/portfolio-data.service';


inject();

// Define types for our translations
type Language = 'id' | 'en';

interface TranslationKeys {
  heroTitle: string;
  heroSubtitle: string;
  journey: string;
  currentRole: string;
  currentDesc: string;
  webRole: string;
  webDesc: string;
  education: string;
  eduDesc: string;
  hobbiesTitle: string;
  codingDesc: string;
  gamingDesc: string;
  musicDesc: string;
  exerciseDesc: string;
  quickFacts: string;
  projectsCompleted: string;
  yearsCoding: string;
  techStacks: string;
  coffeeCups: string;
  snapshots: string;
  connect: string;
  otherWays: string;
  whatsappContact: string;
  quoraProfile: string;
  awardsTitle: string;
  pilmapresRole: string;
  pilmapresDesc: string;
  roboticsRole: string;
  roboticsDesc: string;
  pmmRole: string;
  pmmDesc: string;
}

interface Translations {
  id: TranslationKeys;
  en: TranslationKeys;
}

/* Interface untuk image cache */
interface CachedImage {
  src: string;
  blob?: Blob;
  objectUrl?: string;
  isLoaded: boolean;
  isLoading: boolean;
}

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.page.html',
  styleUrls: ['./biodata.page.scss'],
  standalone: false,
})

export class BiodataPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('zoomableImage', { static: false }) zoomableImage?: ElementRef<HTMLImageElement>;
  @ViewChild('imageContainer', { static: false }) imageContainer?: ElementRef<HTMLDivElement>;
  
  private backButtonSubscription!: Subscription;
  private eventListeners: Array<() => void> = [];
  private scrollDirectionHandler: (() => void) | null = null;
  private sectionObserver: IntersectionObserver | null = null;
  isAwardsModalOpen = false;
  
  /* Zoom properties */
  isImageZoomed = false;
  currentScale = 1;
  translateX = 0;
  translateY = 0;
  
  /* Properties untuk dragging */
  isDragging = false;
  startX = 0;
  startY = 0;
  lastTouchDistance = 0;

  projectsCount: number = 0;
  codingYears: number = 0;
  techStacksCount: number = 0;
  
  /* Image cache properties */
  private imageCache: Map<string, CachedImage> = new Map();
  private cachePriorityQueue: string[] = [];
  private maxCacheSize = 15; /* Maximum number of images to cache */
  
  /* Scroll animation properties */
  private lastScrollTop = 0;
  private animatedElements = new Set<Element>();
  private scrollDirection: 'up' | 'down' = 'down';
  
  awards = [
    {
      image: '/assets/bestPerfomance.jpg',
      title: {
        id: 'Best Perfomance Intern of The Month (October)',
        en: 'Best Performance Intern of The Month (October)'
      },
      description: {
        id: 'Berkontribusi penuh kepada tim di tempat kerja.',
        en: 'Fully contributes to the team at work.'
      }
    },
    {
      image: '/assets/batch4.jpg',
      title: {
        id: 'PMM Batch 4 2024',
        en: 'PMM Batch 4 2024'
      },
      description: {
        id: 'Melakukan pertukaran pelajar mandiri ke Telkom University.',
        en: 'Conducted an independent student exchange to Telkom University.'
      }
    },
    {
      image: '/assets/robotik.png',
      title: {
        id: 'Pelatih Robotik 2023',
        en: 'Robotics Trainer 2023'
      },
      description: {
        id: 'Menjadi pelatih dalam pelatihan robotik untuk siswa SMA.',
        en: 'Became a trainer in robotics training for high school students.'
      }
    },
    {
      image: '/assets/pilmapres.png',
      title: {
        id: 'Pilmapres 2023',
        en: 'Pilmapres 2023'
      },
      description: {
        id: 'Berpartisipasi dalam kompetisi Pilmapres dengan menyajikan ide untuk mengatasi masalah SGDs.',
        en: 'Participated in the Pilmapres competition by presenting ideas to overcome the SGDs problem.'
      }
    },
  ];

  /* Tambahkan getter untuk menghitung jumlah awards */
  get awardsCount(): string {
    return `+${this.awards.length}`;
  }

  /* Add this helper method to get the text in the current language */
  getAwardText(award: any, field: 'title' | 'description'): string {
    return award[field][this.currentLanguage];
  }

  /* Open Award Modal methods */
  openAwardsModal() {
    this.isAwardsModalOpen = true;
  }

  closeAwardsModal() {
    this.isAwardsModalOpen = false;

    /* Navigate back to the biodata page */
    this.router.navigateByUrl('/biodata');
  }

  /* Translation objects */
  translations: Translations = {
    id: {
      heroTitle: "Halo, Saya",
      heroSubtitle: "Pengembang yang Berdedikasi & Penggemar Teknologi",
      journey: "Perjalananku",
      currentRole: "Fullstack Developer",
      currentDesc: "Mengembangkan aplikasi fullstack dengan React, Angular dan Vue.Js dalam Ionic Framework serta Laravel, membangun UI/UX yang menarik dan responsif untuk berbagai klien. Mengoptimalkan performa aplikasi dan implementasi fitur-fitur inovatif.",
      webRole: "Web Developer",
      webDesc: "Memulai karir sebagai front-end developer dengan fokus pada framework Angular. Bekerja dalam tim untuk membangun aplikasi web yang interaktif dan modern.",
      education: "Institut Teknologi dan Bisnis Indonesia",
      eduDesc: "Menempuh pendidikan S1 dengan IPK 3.82. Aktif mencoba semua lomba dan hal hal baru. Mengembangkan project-project inovatif selama masa kuliah.",
      hobbiesTitle: "Hobby dan Ketertarikan",
      codingDesc: "Menghabiskan waktu luang untuk eksplorasi teknologi baru dan mengerjakan side projects.",
      gamingDesc: "Menikmati game sepakbola untuk relaksasi dan mengasah kemampuan problem-solving.",
      musicDesc: "Mendengarkan musik pop dan country sambil coding atau traveling.",
      exerciseDesc: "Berolahraga dengan mandiri untuk menjaga kebugaran jasmani di saat weekend.",
      quickFacts: "Fakta Singkat",
      projectsCompleted: "Proyek Selesai",
      yearsCoding: "Tahun Coding",
      techStacks: "Tech Stack",
      coffeeCups: "Cangkir Kopi",
      snapshots: "Potret Kehidupan",
      connect: "Galeri Sekilas",
      otherWays: "Platform Diskusi Saya",
      whatsappContact: "Hubungi di sini",
      quoraProfile: "Profil Quora",
      awardsTitle: "Penghargaan",
      pilmapresRole: "Pilmapres 2023",
      pilmapresDesc: "Berpartisipasi dalam Pemilihan Mahasiswa Berprestasi 2023 mewakili prodi dan fakultas. Mengembangkan karya inovatif dan mempresentasikan gagasan baru di bidang teknologi.",
      roboticsRole: "Pelatih Robotik",
      roboticsDesc: "Mengadakan pelatihan dalam pembuatan robot pengikut garis, desain robot pengikut garis, simulasi robot dengan Arduino IDE Interface.",
      pmmRole: "Pertukaran Mahasiswa Merdeka 4",
      pmmDesc: "Mengikuti program Pertukaran Mahasiswa Merdeka Batch 4 untuk memperluas wawasan dan pengalaman belajar di luar kampus asal.",
    },
    en: {
      heroTitle: "Hello, I'm",
      heroSubtitle: "Passion-driven Developer & Tech Enthusiast",
      journey: "My Journey",
      currentRole: "Fullstack Developer",
      currentDesc: "Developing full-stack applications with React, Angular, and Vue.js in the Ionic Framework and Laravel, building attractive and responsive UI/UX for various clients. Optimizing application performance and implementing innovative features.",
      webRole: "Web Developer",
      webDesc: "Started career as a front-end developer focusing on Angular framework. Working in teams to build interactive and modern web applications.",
      education: "Indonesia Institute of Technology and Business",
      eduDesc: "Pursuing Bachelor's degree with 3.82 GPA. Actively participating in competitions and exploring new opportunities. Developing innovative projects during college years.",
      hobbiesTitle: "Hobbies & Interests",
      codingDesc: "Spending free time exploring new technologies and working on side projects.",
      gamingDesc: "Enjoying football games for relaxation and improving problem-solving skills.",
      musicDesc: "Listening to pop and country music while coding or traveling.",
      exerciseDesc: "Exercising independently to maintain physical fitness on weekends.",
      quickFacts: "Quick Facts",
      projectsCompleted: "Projects Completed",
      yearsCoding: "Years Coding",
      techStacks: "Tech Stacks",
      coffeeCups: "Coffee Cups",
      snapshots: "Life Snapshots",
      connect: "Glance Gallery",
      otherWays: "My Discussion Platforms",
      whatsappContact: "Contact me here",
      quoraProfile: "Quora Profile",
      awardsTitle: "Awards",
      pilmapresRole: "Pilmapres 2023",
      pilmapresDesc: "Participated in the 2023 Outstanding Student Selection representing the study program and faculty. Developed innovative works and presented new ideas in the field of technology.",
      roboticsRole: "Robotics Trainer",
      roboticsDesc: "Conducted training in making line-following robots, designing line-following robots, and robot simulation with Arduino IDE Interface.",
      pmmRole: "Independent Student Exchange 4",
      pmmDesc: "Participated in the Independent Student Exchange Program Batch 4 to expand insights and learning experiences outside the home campus.",
    }
  };
  currentLanguage: Language = 'id';

  /* Gallery rotation properties */
  currentPhotoIndex = 0;
  currentRotatingPhoto = '';
  currentPhotoCaption = '';
  photoProgressPercentage = 0;
  photoRotationInterval: any;

  rotatingPhotos = [
    { src: '/assets/raskece.jpg', caption: 'Picture of me' },
    { src: '/assets/tempat.JPG', caption: 'Exploring new places' },
    { src: '/assets/team.jpg', caption: 'Team building activities' },
    { src: '/assets/belajar.jpg', caption: 'Learning new technologies' }
  ];

  /* Gallery Modal property */
  isGalleryModalOpen = false;
  currentGalleryImage = '';

  constructor(
    private postPvdr: PostProvider,
    private toastController: ToastController,
    private platform: Platform,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private portfolioData: PortfolioDataService
  ) { }

  ngOnInit() {
    /* Language setup */
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage as Language;
    }

    /* Initialize image cache for gallery */
    this.initializeImageCache();

    /* Back button handler */
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.isAwardsModalOpen) {
        this.closeAwardsModal();
      } else if (this.isGalleryModalOpen) {
        this.closeGalleryModal();
      } else {
        this.router.navigate(['/']);
      }
    });

    // Isi data dari service
    this.projectsCount = this.portfolioData.getProjectsCount();
    this.techStacksCount = this.portfolioData.getTechStackCount();
    this.codingYears = this.portfolioData.getCodingYears();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupScrollAnimations();
      this.startPhotoRotation();

      // ✅ TAMBAHAN: Cek flag dari localStorage untuk auto-scroll
      const shouldScroll = localStorage.getItem('scrollToContact');
      if (shouldScroll === 'true') {
        localStorage.removeItem('scrollToContact'); // hapus flag agar tidak looping
        setTimeout(() => {
          const contactSection = document.querySelector('.contact-footer-section');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });

            /* Add a delayed toast notification after scrolling */
            setTimeout(() => {
              this.toastController.create({
                message: this.currentLanguage === 'id'
                  ? 'Silakan hubungi kontak yang terlampir berikut untuk informasi lebih lanjut'
                  : 'Please contact the listed contact for more information',
                duration: 3000,
                position: 'bottom', /* Position at bottom */
                cssClass: 'custom-toast', /* Adding a CSS class for additional styling */
                buttons: [{ text: 'OK', role: 'cancel' }]
              }).then(toast => toast.present());
            }, 1000);
          }
        }, 600); // beri waktu halaman render sempurna
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }

    this.stopPhotoRotation();
    this.cleanupEventListeners();
    
    /* Cleanup scroll animations */
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }
    if (this.scrollDirectionHandler) {
      this.scrollDirectionHandler();
    }

    /* Cleanup image cache */
    this.imageCache.forEach(cachedImage => {
      if (cachedImage.objectUrl) {
        URL.revokeObjectURL(cachedImage.objectUrl);
      }
    });
    this.imageCache.clear();
  }

  /* ========== NEW SCROLL ANIMATION SYSTEM ========== */
  
  private setupScrollAnimations(): void {
    const content = this.elementRef.nativeElement.querySelector('ion-content');
    if (!content) return;

    /* Setup scroll direction tracking */
    this.setupScrollDirectionTracking(content);

    /* Setup intersection observer for animations */
    this.setupIntersectionObserver();
  }

  private setupScrollDirectionTracking(content: any): void {
    const scrollElement = content.shadowRoot?.querySelector('.inner-scroll') || content;
    
    const handleScroll = () => {
      const currentScrollTop = scrollElement.scrollTop || 0;
      
      if (currentScrollTop > this.lastScrollTop) {
        this.scrollDirection = 'down';
      } else if (currentScrollTop < this.lastScrollTop) {
        this.scrollDirection = 'up';
      }
      
      this.lastScrollTop = currentScrollTop;
    };

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    
    this.scrollDirectionHandler = () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.5, 0.9, 1]
    };

    this.sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const isInViewport = entry.isIntersecting;
        const hasBeenAnimated = this.animatedElements.has(element);

        if (this.scrollDirection === 'down') {
          // Scroll ke bawah: trigger animasi IN
          if (isInViewport && !hasBeenAnimated && entry.intersectionRatio > 0.1) {
            this.animateIn(element);
            this.animatedElements.add(element);
          }
        } else if (this.scrollDirection === 'up') {
          // Scroll ke atas: trigger animasi OUT
          if (!isInViewport && hasBeenAnimated && entry.intersectionRatio === 0) {
            this.animateOut(element);
            this.animatedElements.delete(element);
          }
        }
      });
    }, options);

    // Observe all animatable elements
    const animatableSelectors = [
      '.timeline-section .section-title',
      '.timeline-item',
      '.hobbies-section .section-title',
      '.hobby-card',
      '.facts-section .section-title',
      '.fact-item',
      '.quotes-section .quote-container',
      '.awards-section .section-title',
      '.awards-item',
      '.gallery-section .section-title',
      '.gallery-item',
      '.rotating-gallery-section .section-title',
      '.rotating-gallery',
      '.contact-footer-title',
      '.contact-items-wrapper'
    ];

    animatableSelectors.forEach(selector => {
      const elements = this.elementRef.nativeElement.querySelectorAll(selector);
      elements.forEach((el: Element) => {
        this.sectionObserver?.observe(el);
      });
    });
  }

  private animateIn(element: Element): void {
    // Reset inline style dulu supaya transition direction class berlaku kembali
    this.renderer.removeStyle(element, 'transform');
    this.renderer.removeStyle(element, 'opacity');
    this.renderer.removeClass(element, 'animate-out');
    // Paksa reflow agar browser baca ulang initial state dari CSS class
    (element as HTMLElement).getBoundingClientRect();
    this.renderer.addClass(element, 'animate-in');
  }

  private animateOut(element: Element): void {
    this.renderer.removeClass(element, 'animate-in');
    // Kembalikan transform asal sesuai direction class yang ada di elemen
    const el = element as HTMLElement;
    let outTransform = 'translateY(50px)'; // default

    if (el.classList.contains('fade-in-left')) {
      outTransform = 'translateX(50px)';
    } else if (el.classList.contains('fade-in-right')) {
      outTransform = 'translateX(-50px)';
    } else if (el.classList.contains('fade-in-up')) {
      outTransform = 'translateY(50px)';
    } else if (el.classList.contains('fade-in-down')) {
      outTransform = 'translateY(-50px)';
    } else if (el.classList.contains('timeline-item')) {
      // Timeline: odd dari kiri, even dari kanan — sesuai CSS section-specific
      const siblings = Array.from(el.parentElement?.children || []);
      const index = siblings.indexOf(el);
      outTransform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    }

    this.renderer.setStyle(el, 'opacity', '0');
    this.renderer.setStyle(el, 'transform', outTransform);
  }

  /* ========== END SCROLL ANIMATION SYSTEM ========== */

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
    localStorage.setItem('preferredLanguage', this.currentLanguage);
  }

  /* ========== Image Cache System ========== */
  
  private initializeImageCache(): void {
    /* Priority images to cache */
    const priorityImages = [
      ...this.rotatingPhotos.map(p => p.src),
      '/assets/coding.png',
      '/assets/team.jpg',
      '/assets/pmm.jpg',
      '/assets/konser.jpg'
    ];

    priorityImages.forEach(src => {
      this.preloadImage(src);
    });
  }

  private preloadImage(src: string): void {
    if (this.imageCache.has(src)) {
      return;
    }

    const cachedImage: CachedImage = {
      src,
      isLoaded: false,
      isLoading: true
    };

    this.imageCache.set(src, cachedImage);

    fetch(src)
      .then(response => response.blob())
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob);
        cachedImage.blob = blob;
        cachedImage.objectUrl = objectUrl;
        cachedImage.isLoaded = true;
        cachedImage.isLoading = false;

        this.manageCacheSize();
      })
      .catch(error => {
        console.error(`Failed to preload image: ${src}`, error);
        cachedImage.isLoading = false;
      });
  }

  private manageCacheSize(): void {
    if (this.imageCache.size > this.maxCacheSize) {
      const oldestKey = this.cachePriorityQueue.shift();
      if (oldestKey) {
        const cachedImage = this.imageCache.get(oldestKey);
        if (cachedImage?.objectUrl) {
          URL.revokeObjectURL(cachedImage.objectUrl);
        }
        this.imageCache.delete(oldestKey);
      }
    }
  }

  private getImageUrl(src: string): string {
    const cachedImage = this.imageCache.get(src);
    if (cachedImage?.objectUrl) {
      return cachedImage.objectUrl;
    }
    return src;
  }

  /* ========== Gallery Modal Controls ========== */

  handleContainerClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    
    if (target.classList.contains('modal-image-container')) {
      this.closeGalleryModal();
      return;
    }

    if (!this.isImageZoomed) {
      this.enterZoomMode();
    }
  }

  enterZoomMode(): void {
    this.isImageZoomed = true;
    
    if (this.zoomableImage) {
      this.renderer.addClass(this.zoomableImage.nativeElement, 'zoomable-active');
      this.setupZoomEventListeners();
    }
    
    if (this.imageContainer) {
      this.renderer.addClass(this.imageContainer.nativeElement, 'zoom-mode');
    }
  }

  exitZoomMode(): void {
    this.isImageZoomed = false;
    this.resetZoom();
    this.cleanupEventListeners();
  }

  private setupZoomEventListeners(): void {
    if (!this.zoomableImage) return;
    
    const imgElement = this.zoomableImage.nativeElement;
    
    this.setupMouseEvents(imgElement);
    this.setupTouchEvents(imgElement);
    this.setupWheelEvent(imgElement);
  }

  /* Setup mouse events for drag */
  private setupMouseEvents(imgElement: HTMLElement): void {
    const onMouseDown = (e: MouseEvent) => {
      if (!this.isImageZoomed) return;
      
      this.isDragging = true;
      this.startX = e.clientX - this.translateX;
      this.startY = e.clientY - this.translateY;
      
      this.renderer.addClass(imgElement, 'dragging');
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging || !this.isImageZoomed) return;
      
      const newTranslateX = e.clientX - this.startX;
      const newTranslateY = e.clientY - this.startY;
      
      const bounded = this.applyBoundaries(newTranslateX, newTranslateY);
      this.translateX = bounded.x;
      this.translateY = bounded.y;
      
      this.applyTransform();
      e.preventDefault();
    };

    const onMouseUp = () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.renderer.removeClass(imgElement, 'dragging');
      }
    };

    imgElement.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    this.eventListeners.push(
      () => imgElement.removeEventListener('mousedown', onMouseDown),
      () => document.removeEventListener('mousemove', onMouseMove),
      () => document.removeEventListener('mouseup', onMouseUp)
    );
  }

  /* Setup touch events for mobile */
  private setupTouchEvents(imgElement: HTMLElement): void {
    const onTouchStart = (e: TouchEvent) => {
      if (!this.isImageZoomed) return;
      
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX - this.translateX;
        this.startY = e.touches[0].clientY - this.translateY;
        this.renderer.addClass(imgElement, 'dragging');
      } else if (e.touches.length === 2) {
        this.lastTouchDistance = this.getTouchDistance(e.touches);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!this.isImageZoomed) return;
      
      if (e.touches.length === 1 && this.isDragging) {
        const newTranslateX = e.touches[0].clientX - this.startX;
        const newTranslateY = e.touches[0].clientY - this.startY;
        
        const bounded = this.applyBoundaries(newTranslateX, newTranslateY);
        this.translateX = bounded.x;
        this.translateY = bounded.y;
        
        this.applyTransform();
        e.preventDefault();
      } else if (e.touches.length === 2) {
        const currentDistance = this.getTouchDistance(e.touches);
        const scaleDelta = currentDistance / this.lastTouchDistance;
        
        const newScale = Math.max(0.5, Math.min(5, this.currentScale * scaleDelta));
        
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        
        const rect = imgElement.getBoundingClientRect();
        const x = centerX - rect.left;
        const y = centerY - rect.top;
        
        this.zoomAtPoint(x, y, newScale);
        
        this.lastTouchDistance = currentDistance;
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        this.isDragging = false;
        this.renderer.removeClass(imgElement, 'dragging');
      } else if (e.touches.length === 1) {
        this.lastTouchDistance = 0;
      }
    };

    imgElement.addEventListener('touchstart', onTouchStart, { passive: false });
    imgElement.addEventListener('touchmove', onTouchMove, { passive: false });
    imgElement.addEventListener('touchend', onTouchEnd);
    
    this.eventListeners.push(
      () => imgElement.removeEventListener('touchstart', onTouchStart),
      () => imgElement.removeEventListener('touchmove', onTouchMove),
      () => imgElement.removeEventListener('touchend', onTouchEnd)
    );
  }
  
  /* Setup wheel event for zoom */
  private setupWheelEvent(imgElement: HTMLElement): void {
    const onWheel = (e: WheelEvent) => {
      if (!this.isImageZoomed) return;
      
      const rect = imgElement.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      /* Zoom in/out dengan wheel */
      const zoomIntensity = 0.1;
      const wheel = e.deltaY < 0 ? 1 : -1;
      const zoom = Math.exp(wheel * zoomIntensity);
      const newScale = Math.max(0.5, Math.min(5, this.currentScale * zoom));
      
      this.zoomAtPoint(mouseX, mouseY, newScale);
      e.preventDefault();
    };

    imgElement.addEventListener('wheel', onWheel, { passive: false });
    this.eventListeners.push(() => imgElement.removeEventListener('wheel', onWheel));
  }

  /* Helper: Get distance between two touches */
  private getTouchDistance(touches: TouchList): number {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  }
  
 /* Zoom at specific point */
  private zoomAtPoint(x: number, y: number, newScale: number): void {
    if (!this.zoomableImage) return;
    
    /* Calculate new translation to keep the point under cursor/finger */
    const scaleRatio = newScale / this.currentScale;
    const newTranslateX = x - (x - this.translateX) * scaleRatio;
    const newTranslateY = y - (y - this.translateY) * scaleRatio;
    
    this.currentScale = newScale;
    
    /* Apply boundaries */
    const boundedTranslate = this.applyBoundaries(newTranslateX, newTranslateY);
    this.translateX = boundedTranslate.x;
    this.translateY = boundedTranslate.y;
    
    this.applyTransform();
  }

  /* Apply boundaries to prevent over-panning */
  private applyBoundaries(translateX: number, translateY: number): { x: number, y: number } {
    if (!this.zoomableImage || !this.imageContainer) {
      return { x: translateX, y: translateY };
    }
    
    const imgElement = this.zoomableImage.nativeElement;
    const containerElement = this.imageContainer.nativeElement;
    
    const imgRect = imgElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();
    
    /* Calculate scaled dimensions */
    const scaledWidth = imgElement.naturalWidth * this.currentScale;
    const scaledHeight = imgElement.naturalHeight * this.currentScale;
    
    /* Calculate boundaries */
    const maxTranslateX = Math.max(0, (scaledWidth - containerRect.width) / 2);
    const maxTranslateY = Math.max(0, (scaledHeight - containerRect.height) / 2);
    
    /* Apply boundaries */
    const boundedX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
    const boundedY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
    
    return { x: boundedX, y: boundedY };
  }
  
  /* Apply transform to image */
  private applyTransform(): void {
    if (!this.zoomableImage) return;
    
    const imgElement = this.zoomableImage.nativeElement;
    const transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.currentScale})`;
    
    this.renderer.setStyle(imgElement, 'transform', transform);
    this.renderer.setStyle(imgElement, 'transform-origin', 'center center');
  }

   /* Manual zoom controls */
  zoomIn(): void {
    if (!this.isImageZoomed) return;
    
    const newScale = Math.min(5, this.currentScale * 1.5);
    this.zoomAtPoint(
      this.zoomableImage!.nativeElement.offsetWidth / 2,
      this.zoomableImage!.nativeElement.offsetHeight / 2,
      newScale
    );
  }

  zoomOut(): void {
    if (!this.isImageZoomed) return;
    
    const newScale = Math.max(0.5, this.currentScale / 1.5);
    if (newScale <= 1) {
      this.resetZoom();
    } else {
      this.zoomAtPoint(
        this.zoomableImage!.nativeElement.offsetWidth / 2,
        this.zoomableImage!.nativeElement.offsetHeight / 2,
        newScale
      );
    }
  }
  
  /* Reset zoom */
  resetZoom(): void {
    this.currentScale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.applyTransform();
    
    if (this.zoomableImage) {
      this.renderer.removeClass(this.zoomableImage.nativeElement, 'zoomable-active');
      this.renderer.removeClass(this.zoomableImage.nativeElement, 'dragging');
    }
    
    if (this.imageContainer) {
      this.renderer.removeClass(this.imageContainer.nativeElement, 'zoom-mode');
    }
  }

  /* Cleanup event listeners */
  private cleanupEventListeners(): void {
    this.eventListeners.forEach(cleanup => cleanup());
    this.eventListeners = [];
  }

  getText(key: keyof TranslationKeys): string {
    return this.translations[this.currentLanguage][key];
  }

  openGalleryModal(imageSrc: string) {
    /* Preload image when opening modal */
    this.preloadImage(imageSrc);
    
    /* Use cached image if available */
    this.currentGalleryImage = this.getImageUrl(imageSrc);
    this.isGalleryModalOpen = true;
  }

  closeGalleryModal(): void {
    this.isGalleryModalOpen = false;
    this.exitZoomMode();
  }

  /* Gallery Rotates */
  startPhotoRotation() {
    /* Set initial photo */
    this.updateCurrentPhoto();

    /* Start progress animation */
    const rotationDuration = 5000; /* 5 seconds per photo */
    const updateInterval = 50; /* Update progress every 50ms */
    let progress = 0;

    this.photoRotationInterval = setInterval(() => {
      progress += updateInterval;
      this.photoProgressPercentage = (progress / rotationDuration) * 100;

      if (progress >= rotationDuration) {
        /* Move to next photo */
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.rotatingPhotos.length;
        this.updateCurrentPhoto();
        progress = 0;
      }
    }, updateInterval);
  }

  stopPhotoRotation() {
    if (this.photoRotationInterval) {
      clearInterval(this.photoRotationInterval);
    }
  }

  updateCurrentPhoto() {
    const photo = this.rotatingPhotos[this.currentPhotoIndex];
    
    /* Preload next photo */
    const nextIndex = (this.currentPhotoIndex + 1) % this.rotatingPhotos.length;
    this.preloadImage(this.rotatingPhotos[nextIndex].src);
    
    /* Use cached image if available */
    this.currentRotatingPhoto = this.getImageUrl(photo.src);
    this.currentPhotoCaption = photo.caption;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}