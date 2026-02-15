import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { PostProvider } from '../../provider/post-providers';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { inject } from "@vercel/analytics"


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
  
  /* Image cache properties */
  private imageCache: Map<string, CachedImage> = new Map();
  private cachePriorityQueue: string[] = [];
  private maxCacheSize = 15; /* Maximum number of images to cache */
  
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
      eduDesc: "Menempuh pendidikan S1 dengan IPK 3.79. Aktif mencoba semua lomba dan hal hal baru. Mengembangkan project-project inovatif selama masa kuliah.",
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
      eduDesc: "Pursuing Bachelor's degree with 3.79 GPA. Actively participating in competitions and exploring new opportunities. Developing innovative projects during college years.",
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
      pilmapresRole: "Outstanding Student Award 2023",
      pilmapresDesc: "Participated in the Outstanding Student Selection 2023 representing the department and faculty. Developed innovative work and presented new ideas in technology.",
      roboticsRole: "Robotics Trainer",
      roboticsDesc: "Conducted training in line follower robot development, line follower robot design, and robot simulation with Arduino IDE Interface.",
      pmmRole: "Merdeka Student Exchange Program 4",
      pmmDesc: "Participated in the Merdeka Student Exchange Program Batch 4 to expand knowledge and learning experiences outside the home campus.",
    }
  };

  rotatingPhotos = [
    { src: '/assets/raskece.jpg', caption: 'Picture of me' },
    { src: '/assets/tempat.JPG', caption: 'Exploring new places' },
    { src: '/assets/team.jpg', caption: 'Team building activities' },
    { src: '/assets/belajar.jpg', caption: 'Learning new technologies' }
  ];
  currentPhotoIndex = 0;
  currentRotatingPhoto = '';
  currentPhotoCaption = '';
  photoProgressPercentage = 0;
  photoRotationInterval: any;


  isGalleryModalOpen = false;
  currentGalleryImage = '';
  currentLanguage: Language = 'id'; /* Default language is Indonesian */

  constructor(
    private postProvider: PostProvider,
    private toastController: ToastController,
    private platform: Platform,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      /* Check if any modal is open */
      if (this.isAwardsModalOpen) {
        this.closeAwardsModal();
      } else if (this.isGalleryModalOpen) {
        this.closeGalleryModal();
      } else {
        /* Navigate back to tab1 */
        this.router.navigate(['/']);
      }
    });

    /* Precache rotating photos */
    this.rotatingPhotos.forEach(photo => {
      this.preloadImage(photo.src);
    });

    /* Precache award images */
    this.awards.forEach(award => {
      this.preloadImage(award.image);
    });

    this.startPhotoRotation();

    const scrollToContact = localStorage.getItem('scrollToContact');
    if (scrollToContact === 'true') {
      /* Clear the flag */
      localStorage.removeItem('scrollToContact');

      /* Give the page time to render */
      setTimeout(() => {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });

          /* Show toast notification - using a simple check to determine language */ 
          const isIndonesian = document.documentElement.lang === 'id' ||
            localStorage.getItem('currentLanguage') === 'id';

          this.toastController.create({
            message: this.currentLanguage === 'id'
              ? 'Scroll lagi ke bawah untuk kontak yang bisa dihubungi'
              : 'Scroll down further to see contact information',
            duration: 3000,
            position: 'bottom',
            color: 'primary',
            cssClass: 'custom-toast',
            buttons: [{ text: 'OK', role: 'cancel' }]
          }).then(toast => toast.present());
        }
      }, 1000);
    }
  }

  ngAfterViewInit() {
    this.initSectionAnimations();
  }

  ngOnDestroy() {
    /* Clean up the subscription when the component is destroyed */
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }

    this.stopPhotoRotation();
    
    /* Clean up image cache */
    this.clearImageCache();

    /* Clean up event listeners */
    this.cleanupEventListeners();

    /* CRITICAL FIX: Remove scroll event listener */
    if (this.scrollDirectionHandler) {
      window.removeEventListener('scroll', this.scrollDirectionHandler);
      this.scrollDirectionHandler = null;
    }

    /* CRITICAL FIX: Disconnect intersection observer */
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
      this.sectionObserver = null;
    }
  }

  /* Metode untuk preload dan caching gambar */
  preloadImage(src: string): void {
    /* Jika gambar sudah dalam cache, prioritaskan */
    if (this.imageCache.has(src)) {
      const cachedImage = this.imageCache.get(src);
      /* Memindahkan ke depan dalam priority queue */
      this.cachePriorityQueue = this.cachePriorityQueue.filter(url => url !== src);
      this.cachePriorityQueue.unshift(src);
      return;
    }

    /* Buat entri cache baru */
    const cacheEntry: CachedImage = {
      src,
      isLoaded: false,
      isLoading: true
    };
    
    this.imageCache.set(src, cacheEntry);
    this.cachePriorityQueue.push(src);

    /* Cek apakah cache melebihi kapasitas maksimum */
    if (this.cachePriorityQueue.length > this.maxCacheSize) {
      const oldestSrc = this.cachePriorityQueue.pop();
      if (oldestSrc) {
        const oldEntry = this.imageCache.get(oldestSrc);
        if (oldEntry && oldEntry.objectUrl) {
          URL.revokeObjectURL(oldEntry.objectUrl);
        }
        this.imageCache.delete(oldestSrc);
      }
    }

    /* Fetch gambar dan simpan sebagai blob */
    fetch(src)
      .then(response => response.blob())
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob);
        const imageEntry = this.imageCache.get(src);
        if (imageEntry) {
          imageEntry.blob = blob;
          imageEntry.objectUrl = objectUrl;
          imageEntry.isLoaded = true;
          imageEntry.isLoading = false;
        }
      })
      .catch(error => {
        console.error(`Failed to cache image ${src}:`, error);
        const imageEntry = this.imageCache.get(src);
        if (imageEntry) {
          imageEntry.isLoading = false;
        }
      });
  }

  /* Mendapatkan URL gambar (dari cache jika tersedia) */
  getImageUrl(src: string): string {
    const cachedImage = this.imageCache.get(src);
    if (cachedImage && cachedImage.isLoaded && cachedImage.objectUrl) {
      // Memindahkan ke depan dalam priority queue
      this.cachePriorityQueue = this.cachePriorityQueue.filter(url => url !== src);
      this.cachePriorityQueue.unshift(src);
      return cachedImage.objectUrl;
    }
    
    /* Jika tidak ada dalam cache, preload dan gunakan URL asli */
    if (!cachedImage) {
      this.preloadImage(src);
    }
    return src;
  }

  /* Membersihkan cache gambar */
  clearImageCache(): void {
    /* Revoke semua objectURL untuk mencegah memory leak */
    this.imageCache.forEach(entry => {
      if (entry.objectUrl) {
        URL.revokeObjectURL(entry.objectUrl);
      }
    });
    this.imageCache.clear();
    this.cachePriorityQueue = [];
  }

  private initSectionAnimations() {
    const sections = document.querySelectorAll('.animate-on-scroll');
    let lastScrollY = window.scrollY;
  
    /* Create a function to determine scroll direction */
    const getScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = scrollY > 0 ? scrollY : 0;
      return direction;
    };
  
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px',
      threshold: 0.1
    };
  
    this.sectionObserver = new IntersectionObserver((entries) => {
      const scrollDirection = getScrollDirection();
      
      entries.forEach(entry => {
        /* Add a data attribute to track animation state */
        if (!entry.target.hasAttribute('data-animated')) {
          entry.target.setAttribute('data-animated', 'false');
        }
        
        const wasAnimated = entry.target.getAttribute('data-animated') === 'true';
        
        if (entry.isIntersecting) {
          /* Element is visible */
          entry.target.classList.add('animate');
          entry.target.classList.remove('animate-out');
          entry.target.setAttribute('data-animated', 'true');
        } else {
          /* Element is not visible */
          if (scrollDirection === 'up' && wasAnimated) {
            /* Only apply fade-out when scrolling up and element was previously animated */
            entry.target.classList.add('animate-out');
            entry.target.classList.remove('animate');
          } else if (scrollDirection === 'down') {
            /* When scrolling down past an element, just remove animation classes */
            entry.target.classList.remove('animate');
            entry.target.classList.remove('animate-out');
          }
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      this.sectionObserver!.observe(section);
    });
  
    /* Store the scroll handler reference so we can remove it later */
    this.scrollDirectionHandler = getScrollDirection;
    
    /* Also track scroll events for better direction detection */
    window.addEventListener('scroll', this.scrollDirectionHandler);
  }
  
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
  }

  /* Handle klik pada container */
  handleContainerClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    
    /* Jika klik langsung pada gambar */
    if (target.tagName === 'IMG') {
      this.toggleImageZoom(event);
    } else {
      /* Jika klik di luar gambar saat zoom aktif, reset zoom */
      if (this.isImageZoomed) {
        this.exitZoomMode();
      }
    }
  }

  /* Toggle zoom mode */
  toggleImageZoom(event: MouseEvent): void {
    event.stopPropagation();
    
    if (!this.isImageZoomed) {
      this.enterZoomMode(event);
    } else {
      /* Jika sudah dalam mode zoom, zoom in di titik klik */
      this.zoomAtClickPoint(event);
    }
  }

  /* Masuk ke mode zoom */
  private enterZoomMode(event: MouseEvent): void {
    this.isImageZoomed = true;
    this.setupZoomControls();
    
    /* Zoom in di titik klik */
    setTimeout(() => {
      this.zoomAtClickPoint(event);
    }, 50); /* Delay kecil untuk memastikan setup selesai */
  }

  /* Keluar dari mode zoom */
  private exitZoomMode(): void {
    this.isImageZoomed = false;
    this.resetZoom();
    this.cleanupEventListeners();
  }

  /* Zoom in di titik klik */
   private zoomAtClickPoint(event: MouseEvent): void {
    if (!this.zoomableImage) return;

    const imgElement = this.zoomableImage.nativeElement;
    const rect = imgElement.getBoundingClientRect();
    
    /* Koordinat relatif terhadap gambar */
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    /* Tentukan level zoom berdasarkan scale saat ini */
    let newScale: number;
    if (this.currentScale < 1.5) {
      newScale = 2;
    } else if (this.currentScale < 2.5) {
      newScale = 3;
    } else if (this.currentScale < 3.5) {
      newScale = 4;
    } else {
      /* Reset jika sudah terlalu besar */
      newScale = 1;
      this.translateX = 0;
      this.translateY = 0;
    }
    
    if (newScale > 1) {
      this.zoomAtPoint(clickX, clickY, newScale);
    } else {
      this.currentScale = 1;
      this.applyTransform();
    }
  }

  /* Setup zoom controls dan event listeners */
  private setupZoomControls(): void {
    if (!this.zoomableImage || !this.imageContainer) return;
    
    const imgElement = this.zoomableImage.nativeElement;
    const containerElement = this.imageContainer.nativeElement;
    
    /* Reset posisi dan scale */
    this.currentScale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.applyTransform();
    
    /* Setup event listeners */
    this.setupMouseEvents(imgElement, containerElement);
    this.setupTouchEvents(imgElement, containerElement);
    this.setupWheelEvent(imgElement);
    
    /* Tambahkan styling */
    this.renderer.addClass(imgElement, 'zoomable-active');
    this.renderer.addClass(containerElement, 'zoom-mode');
  }
  
   /* Setup mouse events */
  private setupMouseEvents(imgElement: HTMLElement, containerElement: HTMLElement): void {
    /* Mouse down - start dragging */
    const onMouseDown = (e: MouseEvent) => {
      if (!this.isImageZoomed || this.currentScale <= 1) return;
      
      this.isDragging = true;
      this.startX = e.clientX - this.translateX;
      this.startY = e.clientY - this.translateY;
      
      this.renderer.addClass(imgElement, 'dragging');
      e.preventDefault();
    };
    
    /* Mouse move - drag image */
    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging || !this.isImageZoomed) return;
      
      const newTranslateX = e.clientX - this.startX;
      const newTranslateY = e.clientY - this.startY;
      
      /* Apply boundaries to prevent dragging too far */
      const boundedTranslate = this.applyBoundaries(newTranslateX, newTranslateY);
      this.translateX = boundedTranslate.x;
      this.translateY = boundedTranslate.y;
      
      this.applyTransform();
      e.preventDefault();
    };
    
    /* Mouse up - stop dragging */
    const onMouseUp = () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.renderer.removeClass(imgElement, 'dragging');
      }
    };

    /* Add event listeners dan simpan referensi untuk cleanup */
    imgElement.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    this.eventListeners.push(
      () => imgElement.removeEventListener('mousedown', onMouseDown),
      () => document.removeEventListener('mousemove', onMouseMove),
      () => document.removeEventListener('mouseup', onMouseUp)
    );
  }
  
  /* Setup touch events */
  private setupTouchEvents(imgElement: HTMLElement, containerElement: HTMLElement): void {
    let lastTouchX = 0;
    let lastTouchY = 0;
    let initialPinchDistance = 0;
    let initialScale = 1;

    const onTouchStart = (e: TouchEvent) => {
      if (!this.isImageZoomed) return;
      
      if (e.touches.length === 1) {
        /* Single touch - start pan */
        this.isDragging = true;
        this.startX = e.touches[0].clientX - this.translateX;
        this.startY = e.touches[0].clientY - this.translateY;
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        /* Two fingers - start pinch */
        this.isDragging = false;
        initialPinchDistance = this.getTouchDistance(e.touches);
        initialScale = this.currentScale;
      }
      
      e.preventDefault();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!this.isImageZoomed) return;
      
      if (e.touches.length === 1 && this.isDragging) {
        /* Single touch - pan */
        const newTranslateX = e.touches[0].clientX - this.startX;
        const newTranslateY = e.touches[0].clientY - this.startY;
        
        const boundedTranslate = this.applyBoundaries(newTranslateX, newTranslateY);
        this.translateX = boundedTranslate.x;
        this.translateY = boundedTranslate.y;
        
        this.applyTransform();
      } else if (e.touches.length === 2 && initialPinchDistance > 0) {
        /* Two fingers - pinch zoom */
        const currentDistance = this.getTouchDistance(e.touches);
        const scaleChange = currentDistance / initialPinchDistance;
        const newScale = Math.max(0.5, Math.min(5, initialScale * scaleChange));
        
        /* Get midpoint of touches */
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const rect = imgElement.getBoundingClientRect();
        
        this.zoomAtPoint(midX - rect.left, midY - rect.top, newScale);
      }
      
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        this.isDragging = false;
        initialPinchDistance = 0;
      }
    };

    /* Add event listeners */
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