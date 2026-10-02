import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { PostProvider } from '../../provider/post-providers';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortfolioDataService } from '../services/portfolio-data.service';

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
  copyright: string;
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
  private _imageContainer?: ElementRef<HTMLDivElement>;

  /* Setter: dipanggil otomatis saat elemen .modal-image-container dibuat
     (modal dibuka) atau dihancurkan (modal ditutup). Di sinilah semua
     gesture zoom dipasang / dibersihkan. */
  @ViewChild('imageContainer', { static: false })
  set imageContainer(ref: ElementRef<HTMLDivElement> | undefined) {
    this._imageContainer = ref;
    this.cleanupEventListeners();
    this.resetZoomState();
    if (ref) {
      this.setupGestureListeners(ref.nativeElement);
    }
  }
  get imageContainer(): ElementRef<HTMLDivElement> | undefined {
    return this._imageContainer;
  }
  
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
      eduDesc: "Menempuh pendidikan S1 dengan IPK 3.80. Aktif mencoba semua lomba dan hal hal baru. Mengembangkan project-project inovatif selama masa kuliah.",
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
      copyright: 'Hak cipta dilindungi undang-undang.',
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
      eduDesc: "Pursuing Bachelor's degree with 3.80 GPA. Actively participating in competitions and exploring new opportunities. Developing innovative projects during college years.",
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
      copyright: 'All rights reserved.',
    }
  };
  currentLanguage: Language = 'id';
  currentYear: number = new Date().getFullYear();

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

    // Tunda preload cache sampai browser idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        this.initializeImageCache();
      }, { timeout: 3000 });
    } else {
      setTimeout(() => this.initializeImageCache(), 2000);
    }

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
            setTimeout(async () => {
              const toast = await this.toastController.create({
                message: this.currentLanguage === 'id'
                  ? 'Silakan hubungi kontak yang terlampir berikut untuk informasi lebih lanjut'
                  : 'Please contact the listed contact for more information',
                position: 'bottom',
                cssClass: 'custom-toast',
                buttons: [{
                  text: 'OK',
                  role: 'cancel',
                  handler: () => {
                    this.dismissWithAnimation(toast, 'down');
                    return false;
                  }
                }]
              });
              await toast.present();
              setTimeout(() => this.dismissWithAnimation(toast, 'down'), 4000);
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

  /* ========== Gallery Modal Controls (zoom ala Google Photos) ==========
     Cara pakai:
       - Scroll mouse / pinch trackpad : zoom in-out tepat di posisi kursor
       - Pinch dua jari (HP/tablet)    : zoom in-out di titik tengah dua jari
       - Double click / double tap     : zoom in ke titik itu, ulangi untuk kembali
       - Drag (mouse / satu jari)      : geser foto saat sedang di-zoom
       - Tombol + - reset              : zoom di tengah layar
       - Klik area kosong di luar foto : tutup modal
  */

  /* Batas dan pengaturan zoom */
  private readonly MIN_SCALE = 1;
  private readonly MAX_SCALE = 8;
  private readonly MIN_PINCH_SCALE = 0.6;   /* boleh mengecil sedikit saat pinch, lalu memantul ke 1 */
  private readonly DOUBLE_TAP_SCALE = 2.5;
  private readonly DOUBLE_TAP_MS = 300;
  private readonly DOUBLE_TAP_DISTANCE = 30;
  private readonly TAP_MOVE_TOLERANCE = 8;

  /* State gesture */
  private activePointers = new Map<number, { x: number, y: number }>();
  private pinchStartDistance = 0;
  private pinchStartScale = 1;
  private lastPinchCenter = { x: 0, y: 0 };
  private tapStart: { x: number, y: number, time: number } | null = null;
  private lastTap: { x: number, y: number, time: number } | null = null;
  private gestureMoved = false;

  /* Dipanggil dari (click) di .modal-image-container.
     Klik di area kosong (di luar foto) menutup modal. Klik pada foto
     tidak melakukan apa-apa; zoom lewat scroll / pinch / double tap. */
  handleContainerClick(event: MouseEvent): void {
    /* abaikan "klik" yang sebenarnya akhir dari drag / pinch */
    if (this.gestureMoved) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-image-container')) {
      this.closeGalleryModal();
    }
  }

  /* Reset semua state zoom (tanpa animasi) */
  private resetZoomState(): void {
    this.currentScale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.isImageZoomed = false;
    this.isDragging = false;
    this.pinchStartDistance = 0;
    this.pinchStartScale = 1;
    this.activePointers.clear();
    this.tapStart = null;
    this.lastTap = null;
    this.gestureMoved = false;
  }

  /* Dipanggil closeGalleryModal() */
  exitZoomMode(): void {
    this.resetZoomState();

    const img = this.getZoomImage();
    if (img) {
      img.style.transition = '';
      img.style.transform = '';
    }
    this.cleanupEventListeners();
  }

  /* ---------- Pemasangan listener gesture ---------- */
  private setupGestureListeners(container: HTMLElement): void {
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      const img = this.getZoomImage();
      if (!img) return;

      this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (this.activePointers.size === 1) {
        /* satu jari / mouse: calon tap atau drag */
        this.gestureMoved = false;
        this.tapStart = { x: e.clientX, y: e.clientY, time: Date.now() };

        if (this.currentScale > 1) {
          this.isDragging = true;
          this.renderer.addClass(img, 'dragging');
        }
      } else if (this.activePointers.size === 2) {
        /* dua jari: mulai pinch */
        const [a, b] = Array.from(this.activePointers.values());
        this.pinchStartDistance = Math.hypot(a.x - b.x, a.y - b.y);
        this.pinchStartScale = this.currentScale;
        this.lastPinchCenter = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        this.gestureMoved = true;
        this.tapStart = null;
        this.isDragging = false;
        this.renderer.removeClass(img, 'dragging');
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const pointer = this.activePointers.get(e.pointerId);
      if (!pointer) return;

      const dx = e.clientX - pointer.x;
      const dy = e.clientY - pointer.y;
      pointer.x = e.clientX;
      pointer.y = e.clientY;

      /* --- Pinch (dua jari) --- */
      if (this.activePointers.size >= 2) {
        const [a, b] = Array.from(this.activePointers.values());
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

        if (this.pinchStartDistance > 0) {
          const target = this.clamp(
            this.pinchStartScale * (distance / this.pinchStartDistance),
            this.MIN_PINCH_SCALE,
            this.MAX_SCALE
          );

          /* titik di antara dua jari tetap berada di bawah jari */
          this.zoomAt(center.x, center.y, target);
          /* ikut bergeser kalau kedua jari digeser */
          this.translateX += center.x - this.lastPinchCenter.x;
          this.translateY += center.y - this.lastPinchCenter.y;
          this.lastPinchCenter = center;

          this.commitTransform(false);
        }
        e.preventDefault();
        return;
      }

      /* --- Satu jari / mouse --- */
      if (this.tapStart &&
        Math.hypot(e.clientX - this.tapStart.x, e.clientY - this.tapStart.y) > this.TAP_MOVE_TOLERANCE) {
        this.gestureMoved = true;
        this.tapStart = null;
      }

      if (this.isDragging && this.currentScale > 1) {
        this.translateX += dx;
        this.translateY += dy;
        this.commitTransform(false);
        e.preventDefault();
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!this.activePointers.has(e.pointerId)) return;

      const wasPinching = this.activePointers.size >= 2;
      this.activePointers.delete(e.pointerId);

      const img = this.getZoomImage();

      if (wasPinching) {
        this.pinchStartDistance = 0;

        if (this.activePointers.size === 1) {
          /* sisa satu jari: lanjut geser tanpa lompatan */
          this.isDragging = this.currentScale > 1;
          if (this.isDragging && img) this.renderer.addClass(img, 'dragging');
        } else if (this.activePointers.size === 0 && this.currentScale < this.MIN_SCALE) {
          /* pinch terlalu kecil: pantul kembali ke ukuran pas */
          this.resetZoom();
        }
        return;
      }

      /* satu jari / mouse selesai */
      this.isDragging = false;
      if (img) this.renderer.removeClass(img, 'dragging');

      /* deteksi tap -> double tap / double click */
      const tap = this.tapStart;
      this.tapStart = null;

      if (tap && !this.gestureMoved && Date.now() - tap.time < this.DOUBLE_TAP_MS) {
        const now = Date.now();
        const last = this.lastTap;

        if (last &&
          now - last.time < this.DOUBLE_TAP_MS &&
          Math.hypot(e.clientX - last.x, e.clientY - last.y) < this.DOUBLE_TAP_DISTANCE) {
          this.lastTap = null;
          this.toggleZoomAt(e.clientX, e.clientY);
        } else {
          this.lastTap = { x: e.clientX, y: e.clientY, time: now };
        }
      }
    };

    /* Scroll mouse / pinch trackpad (ctrl + wheel) */
    const onWheel = (e: WheelEvent) => {
      if (!this.getZoomImage()) return;
      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;   /* satuan baris (Firefox) */

      const speed = e.ctrlKey ? 0.01 : 0.0018;
      const newScale = this.clamp(this.currentScale * Math.exp(-delta * speed), this.MIN_SCALE, this.MAX_SCALE);
      if (newScale === this.currentScale) return;

      this.zoomAt(e.clientX, e.clientY, newScale);
      /* trackpad: tanpa animasi (sudah halus); roda mouse: animasi singkat */
      this.commitTransform(!e.ctrlKey, 120);
    };

    /* Cegah drag-and-drop bawaan browser pada gambar */
    const onDragStart = (e: Event) => e.preventDefault();

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('dragstart', onDragStart);

    this.eventListeners.push(
      () => container.removeEventListener('pointerdown', onPointerDown),
      () => window.removeEventListener('pointermove', onPointerMove),
      () => window.removeEventListener('pointerup', onPointerUp),
      () => window.removeEventListener('pointercancel', onPointerUp),
      () => container.removeEventListener('wheel', onWheel),
      () => container.removeEventListener('dragstart', onDragStart)
    );
  }

  /* ---------- Matematika zoom ---------- */

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  private getZoomImage(): HTMLImageElement | null {
    return this.zoomableImage?.nativeElement
      ?? (this.imageContainer?.nativeElement.querySelector('img') as HTMLImageElement | null)
      ?? null;
  }

  /* Ukuran area modal & posisi "layout" foto (titik tengah foto saat belum di-zoom/geser) */
  private getMetrics(): { cRect: DOMRect, lx: number, ly: number, w0: number, h0: number } | null {
    const container = this.imageContainer?.nativeElement;
    const img = this.getZoomImage();
    if (!container || !img || !img.offsetWidth || !img.offsetHeight) return null;

    const cRect = container.getBoundingClientRect();
    const cs = getComputedStyle(container);
    const pl = parseFloat(cs.paddingLeft) || 0;
    const pr = parseFloat(cs.paddingRight) || 0;
    const pt = parseFloat(cs.paddingTop) || 0;
    const pb = parseFloat(cs.paddingBottom) || 0;

    return {
      cRect,
      lx: cRect.left + pl + (cRect.width - pl - pr) / 2,
      ly: cRect.top + pt + (cRect.height - pt - pb) / 2,
      w0: img.offsetWidth,
      h0: img.offsetHeight
    };
  }

  /* Ubah skala dengan titik (cx, cy) di layar tetap berada di tempatnya.
     Transform foto: translate(tx, ty) scale(s) dengan origin di tengah foto,
     jadi titik fokus dihitung relatif terhadap tengah foto (lx, ly). */
  private zoomAt(cx: number, cy: number, newScale: number): void {
    const m = this.getMetrics();
    if (!m) return;

    const fx = cx - m.lx;
    const fy = cy - m.ly;
    const ratio = newScale / this.currentScale;

    this.translateX = fx - (fx - this.translateX) * ratio;
    this.translateY = fy - (fy - this.translateY) * ratio;
    this.currentScale = newScale;
  }

  /* Batasi geseran supaya foto tidak keluar dari area (berdasarkan ukuran
     foto yang tampil, bukan ukuran asli file). */
  private clampTranslate(): void {
    const m = this.getMetrics();
    if (!m) return;

    if (this.currentScale <= 1) {
      this.translateX = 0;
      this.translateY = 0;
      return;
    }

    const w = m.w0 * this.currentScale;
    const h = m.h0 * this.currentScale;

    /* horizontal: kalau foto lebih lebar dari area, tepinya tidak boleh masuk ke dalam */
    const maxTx = m.cRect.left - m.lx + w / 2;
    const minTx = m.cRect.right - m.lx - w / 2;
    this.translateX = minTx <= maxTx ? this.clamp(this.translateX, minTx, maxTx) : 0;

    /* vertikal */
    const maxTy = m.cRect.top - m.ly + h / 2;
    const minTy = m.cRect.bottom - m.ly - h / 2;
    this.translateY = minTy <= maxTy ? this.clamp(this.translateY, minTy, maxTy) : 0;
  }

  /* Terapkan state ke foto */
  private commitTransform(animate: boolean, durationMs = 250): void {
    this.clampTranslate();

    const img = this.getZoomImage();
    if (!img) return;

    this.isImageZoomed = this.currentScale > 1.01;

    img.style.transformOrigin = 'center center';
    img.style.transition = animate ? `transform ${durationMs}ms cubic-bezier(0.2, 0.8, 0.2, 1)` : 'none';
    img.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.currentScale})`;

    if (this.isImageZoomed) {
      this.renderer.addClass(img, 'zoomable-active');
    } else {
      this.renderer.removeClass(img, 'zoomable-active');
    }
  }

  /* Double tap / double click: zoom in ke titik itu, atau kembali ke ukuran pas */
  private toggleZoomAt(x: number, y: number): void {
    if (this.currentScale > 1.05) {
      this.resetZoom();
    } else {
      this.zoomAt(x, y, this.DOUBLE_TAP_SCALE);
      this.commitTransform(true);
    }
  }

  /* ---------- Tombol zoom (di .zoom-controls) ---------- */
  zoomIn(): void {
    this.zoomByStep(1.5);
  }

  zoomOut(): void {
    this.zoomByStep(1 / 1.5);
  }

  private zoomByStep(factor: number): void {
    const m = this.getMetrics();
    if (!m) return;

    const newScale = this.clamp(this.currentScale * factor, this.MIN_SCALE, this.MAX_SCALE);
    if (newScale <= 1.02) {
      this.resetZoom();
      return;
    }

    /* zoom di tengah area modal */
    const cx = (m.cRect.left + m.cRect.right) / 2;
    const cy = (m.cRect.top + m.cRect.bottom) / 2;
    this.zoomAt(cx, cy, newScale);
    this.commitTransform(true);
  }

  resetZoom(): void {
    this.currentScale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.isDragging = false;
    this.commitTransform(true);

    const img = this.getZoomImage();
    if (img) {
      this.renderer.removeClass(img, 'dragging');
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
      color,
      position: 'bottom',
      cssClass: 'custom-toast',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.dismissWithAnimation(toast, 'down');
          return false;
        }
      }]
    });
    await toast.present();
    setTimeout(() => this.dismissWithAnimation(toast, 'down'), 4000);
  }

  private dismissWithAnimation(toast: HTMLIonToastElement, direction: 'up' | 'down') {
    const wrapper = toast.shadowRoot?.querySelector('.toast-wrapper') as HTMLElement;
    if (wrapper) {
      const translateY = direction === 'up' ? '-16px' : '16px';
      wrapper.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
      wrapper.style.opacity = '0';
      wrapper.style.transform = `translateY(${translateY})`;
      setTimeout(() => toast.dismiss(), 300);
    } else {
      toast.dismiss();
    }
  }
}