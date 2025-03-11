import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.page.html',
  styleUrls: ['./biodata.page.scss'],
  standalone: false,
})
export class BiodataPage implements OnInit, AfterViewInit, OnDestroy {
  private backButtonSubscription!: Subscription;
  isAwardsModalOpen = false;
  isImageZoomed = false;
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

  // Tambahkan getter untuk menghitung jumlah awards
  get awardsCount(): string {
    return `+${this.awards.length}`;
  }

  // Add this helper method to get the text in the current language
  getAwardText(award: any, field: 'title' | 'description'): string {
    return award[field][this.currentLanguage];
  }

  // Add these methods
  openAwardsModal() {
    this.isAwardsModalOpen = true;
  }

  closeAwardsModal() {
    this.isAwardsModalOpen = false;

    // Navigate back to the biodata page
    this.router.navigateByUrl('/biodata');
  }

  // Translation objects
  translations: Translations = {
    id: {
      heroTitle: "Halo, Saya",
      heroSubtitle: "Pengembang yang Berdedikasi & Penggemar Teknologi",
      journey: "Perjalananku",
      currentRole: "Mobile App Developer",
      currentDesc: "Mengembangkan aplikasi hybrid dengan Ionic Framework, membangun UI/UX yang menarik dan responsif untuk berbagai klien. Mengoptimalkan performa aplikasi dan implementasi fitur-fitur inovatif.",
      webRole: "Web Developer",
      webDesc: "Memulai karir sebagai front-end developer dengan fokus pada framework Angular. Bekerja dalam tim untuk membangun aplikasi web yang interaktif dan modern.",
      education: "Institut Teknologi dan Bisnis Indonesia",
      eduDesc: "Menempuh pendidikan S1 dengan IPK 3.78. Aktif mencoba semua lomba dan hal hal baru. Mengembangkan project-project inovatif selama masa kuliah.",
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
      currentRole: "Mobile App Developer",
      currentDesc: "Developing hybrid applications with Ionic Framework, building attractive and responsive UI/UX for various clients. Optimizing application performance and implementing innovative features.",
      webRole: "Web Developer",
      webDesc: "Started career as a front-end developer focusing on Angular framework. Working in teams to build interactive and modern web applications.",
      education: "Indonesia Institute of Technology and Business",
      eduDesc: "Pursuing Bachelor's degree with 3.78 GPA. Actively participating in competitions and exploring new opportunities. Developing innovative projects during college years.",
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
      awardsTitle: "Awards & Achievements",
      pilmapresRole: "Outstanding Student Award 2023",
      pilmapresDesc: "Participated in the Outstanding Student Selection 2023 representing the department and faculty. Developed innovative work and presented new ideas in technology.",
      roboticsRole: "Robotics Trainer",
      roboticsDesc: "Conducted training in line follower robot development, line follower robot design, and robot simulation with Arduino IDE Interface.",
      pmmRole: "Merdeka Student Exchange Program 4",
      pmmDesc: "Participated in the Merdeka Student Exchange Program Batch 4 to expand knowledge and learning experiences outside the home campus.",
    }
  };

  rotatingPhotos = [
    { src: '/assets/foto.JPG', caption: 'Picture of me' },
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
  currentLanguage: Language = 'id'; // Default language is Indonesian

  constructor(
    private postProvider: PostProvider,
    private toastController: ToastController,
    private platform: Platform,
    private router: Router
  ) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      // Check if any modal is open
      if (this.isAwardsModalOpen) {
        this.closeAwardsModal();
      } else if (this.isGalleryModalOpen) {
        this.closeGalleryModal();
      } else {
        // Navigate back to tab1
        this.router.navigate(['/tabs/tab1']);
      }
    });

    this.startPhotoRotation();

    const scrollToContact = localStorage.getItem('scrollToContact');
    if (scrollToContact === 'true') {
      // Clear the flag
      localStorage.removeItem('scrollToContact');

      // Give the page time to render
      setTimeout(() => {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });

          // Show toast notification - using a simple check to determine language
          // If you have currentLanguage in your BiodataPage, use it directly
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
    // Clean up the subscription when the component is destroyed
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }

    this.stopPhotoRotation();
  }

  private initSectionAnimations() {
    const sections = document.querySelectorAll('.animate-on-scroll');
    let lastScrollY = window.scrollY;
  
    // Create a function to determine scroll direction
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
  
    const sectionObserver = new IntersectionObserver((entries) => {
      const scrollDirection = getScrollDirection();
      
      entries.forEach(entry => {
        // Add a data attribute to track animation state
        if (!entry.target.hasAttribute('data-animated')) {
          entry.target.setAttribute('data-animated', 'false');
        }
        
        const wasAnimated = entry.target.getAttribute('data-animated') === 'true';
        
        if (entry.isIntersecting) {
          // Element is visible
          entry.target.classList.add('animate');
          entry.target.classList.remove('animate-out');
          entry.target.setAttribute('data-animated', 'true');
        } else {
          // Element is not visible
          if (scrollDirection === 'up' && wasAnimated) {
            // Only apply fade-out when scrolling up and element was previously animated
            entry.target.classList.add('animate-out');
            entry.target.classList.remove('animate');
          } else if (scrollDirection === 'down') {
            // When scrolling down past an element, just remove animation classes
            entry.target.classList.remove('animate');
            entry.target.classList.remove('animate-out');
          }
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  
    // Also track scroll events for better direction detection
    window.addEventListener('scroll', getScrollDirection);
  }
  
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
  }

  toggleImageZoom(event: MouseEvent): void {
    // Only toggle zoom when clicking directly on the image
    if ((event.target as HTMLElement).tagName === 'IMG') {
      this.isImageZoomed = !this.isImageZoomed;
      event.stopPropagation();
    } else {
      // If clicking outside the image when zoomed, reset zoom
      if (this.isImageZoomed) {
        this.isImageZoomed = false;
      } else {
        // Otherwise close the modal (existing behavior)
        this.closeGalleryModal();
      }
    }
  }

  getText(key: keyof TranslationKeys): string {
    return this.translations[this.currentLanguage][key];
  }

  openGalleryModal(imageSrc: string) {
    this.currentGalleryImage = imageSrc;
    this.isGalleryModalOpen = true;
  }

  closeGalleryModal() {
    this.isGalleryModalOpen = false;
    this.isImageZoomed = false;

    // Navigate back to the biodata page
    this.router.navigateByUrl('/biodata');
  }

  //Gallery Rotates
  startPhotoRotation() {
    // Set initial photo
    this.updateCurrentPhoto();

    // Start progress animation
    const rotationDuration = 5000; // 5 seconds per photo
    const updateInterval = 50; // Update progress every 50ms
    let progress = 0;

    this.photoRotationInterval = setInterval(() => {
      progress += updateInterval;
      this.photoProgressPercentage = (progress / rotationDuration) * 100;

      if (progress >= rotationDuration) {
        // Move to next photo
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
    this.currentRotatingPhoto = photo.src;
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