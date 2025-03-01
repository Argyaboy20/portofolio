import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createAnimation, Animation, Platform, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { App } from '@capacitor/app';

interface Project {
  title: string;
  duration: string;
  description: string;
  image: string;
  demoLink: string;
  sourceLink: string;
  startDate: Date;  // For sorting purposes
}

// interface penerjemahan
interface Translations {
  profilSingkat: string;
  aboutContent: string;
  aboutContent2: string;
  aboutContent3: string;
  keahlian: string;
  projectTerbaru: string;
  terbaru: string;
  terlama: string;
  contactPerson: string;
  viewDemo: string;
  sourceCode: string;
  copyright: string;
  pendidikan: string;
  sarjanaTI: string;
  semester: string;
  achievements: string;
  tools: string;
}

interface TranslationDict {
  id: Translations;
  en: Translations;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit, AfterViewInit, OnDestroy {
  isFlipCardVisible = false;
  isCardFlipped = false;
  private backButtonSubscription!: Subscription;

  currentLanguage: 'id' | 'en' = 'id'; // default to Indonesian
  translations: TranslationDict = {
    id: {
      profilSingkat: 'Profil Singkat',
      aboutContent: 'Seorang Software Engineer dengan fokus pada pengembangan aplikasi mobile hybrid yang memiliki semangat tinggi dalam menciptakan solusi inovatif. Keahlian utama saya terletak pada penggunaan Ionic Framework yang dipadukan dengan JavaScript dan HTML untuk mengembangkan aplikasi mobile cross-platform. Dengan IPK 3.73 yang saya raih selama masa perkuliahan di Institut Teknologi dan Bisnis Indonesia, saya membuktikan komitmen dan dedikasi yang kuat dalam bidang akademik.',
      aboutContent2: 'Pengalaman saya mencakup berbagai proyek pengembangan aplikasi, termasuk pembuatan Todolist APK menggunakan JavaScript dan ApliKasir dengan C#. Dalam proyek-proyek tersebut, saya berkontribusi sebagai backend developer dan berhasil mengimplementasikan fitur-fitur seperti TaskController dan UIEdit. Pengetahuan teknis saya diperkuat melalui program student exchange di Telkom University, di mana saya memperdalam pemahaman tentang pengembangan perangkat lunak, keamanan sistem, dan manajemen database.',
      aboutContent3: 'Kemampuan bahasa Inggris saya yang berada di level upper intermediate (EF SET: 70) memungkinkan saya untuk berkolaborasi secara efektif dalam tim internasional. Saya selalu antusias untuk mempelajari teknologi-teknologi baru dan menerapkannya dalam pengembangan aplikasi yang inovatif dan bermanfaat. Hubungi saya jika anda tertarik untuk bekerja sama lebih lanjut dalam hal pengembangan perangkat lunak',
      keahlian: 'Keahlian',
      tools: 'Alat dan Teknologi',
      projectTerbaru: 'Project Terbaru',
      terbaru: 'Terbaru',
      terlama: 'Terlama',
      contactPerson: 'Kontak Pribadi',
      viewDemo: 'Lihat Demo',
      sourceCode: 'Source Code',
      copyright: '© 2025 - Hak cipta dilindungi undang-undang, Maulana Farras',
      pendidikan: 'Pendidikan',
      sarjanaTI: 'Rekayasa Perangkat Lunak',
      semester: 'Semester',
      achievements: 'Prestasi'
    },
    en: {
      profilSingkat: 'Brief Profile',
      aboutContent: 'A Software Engineer with a focus on hybrid mobile application development who is passionate about creating innovative solutions. My main expertise lies in using Ionic Framework combined with JavaScript and HTML to develop cross-platform mobile applications. With a GPA of 3.73 achieved during my studies at the Indonesian Institute of Technology and Business, I proved my strong commitment and dedication in academics.',
      aboutContent2: 'My experience spans various app development projects, including the creation of Todolist APK using JavaScript and ApliKasir with C#. In these projects, I contributed as a backend developer and successfully implemented features such as TaskController and UIEdit. My technical knowledge was strengthened through a student exchange program at Telkom University, where I deepened my understanding of software development, system security, and database management.',
      aboutContent3: 'My English skills at the upper intermediate level (EF SET: 70) enable me to collaborate effectively in international teams. I am always enthusiastic to learn new technologies and apply them in the development of innovative and useful applications. Contact me if you are interested in further collaboration on software development.',
      keahlian: 'Skills',
      tools: 'Tools and Technologies',
      projectTerbaru: 'Latest Projects',
      terbaru: 'Newest',
      terlama: 'Oldest',
      contactPerson: 'Contact Person',
      viewDemo: 'View Demo',
      sourceCode: 'Source Code',
      copyright: '© 2025 - All Rights Reserved, Maulana Farras',
      pendidikan: 'Education',
      sarjanaTI: 'Bachelor of Software Engineering',
      semester: 'Semester',
      achievements: 'Achievements'
    }
  };

  projects: Project[] = [
    {
      title: 'Web Portofolio',
      duration: 'Februari 2025 - sekarang',
      description: 'Project ini bertujuan untuk website pribadi sebagai portofolio saya di bidang Software Engineering yang dikembangkan dengan Ionic Framework dan backend berupa MySql',
      image: '/assets/portofolio.png',
      demoLink: '/tabs/tab3',
      sourceLink: 'https://github.com/Argyaboy20/portofolio.git',
      startDate: new Date(2025, 1, 1)  // February 1, 2025
    },
    {
      title: 'Pertanian Mobile App',
      duration: 'November 2024 - Februari 2025',
      description: 'Project ini dikembangkan dengan tujuan sebagai tugas akhir di mata kuliah Pemograman Mobile dan menjawab tantangan di bidang Pertanian saat ini. Dirancang dengan Framework Ionic dengan backend berupa MySql',
      image: '/assets/permo_logo.jpg',
      demoLink: '/tabs/tab2',
      sourceLink: 'https://github.com/Argyaboy20/Permo.git',
      startDate: new Date(2024, 10, 1)  // November 1, 2024
    },
    {
      title: 'ApliKasir',
      duration: 'April - Mei 2024',
      description: 'Dirancang secara berkelompok selama mengikuti Pertukaran Mahasiswa Merdeka batch 4 ke Telkom University. Ditujukan sebagai tugas besar dari mata kuliah KPL dengan bahasa C#. ',
      image: '/assets/apliKasir.png',
      demoLink: '/tabs/tab4',
      sourceLink: 'https://github.com/hshinosa/ApliKasir-UI.git',
      startDate: new Date(2024, 3, 1)  // April 1, 2024
    }
  ];

  // Add this method to your class
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
    this.updateContent();

    // Add this to ensure responsive layout remains intact after language switch
    setTimeout(() => {
      this.handleResponsiveLayout();
    }, 0);
  }

  doRefresh(event: any) {
    console.log('Memulai refresh halaman');
    
    // Simpan status bahasa saat ini
    const currentLang = this.currentLanguage;
    
    // Urutkan ulang proyek sesuai dengan keadaan terakhir
    this.sortProjects('newest');
    
    // Re-inisialisasi UI dan komponen
    setTimeout(() => {
      try {
        // Pastikan bahasa tidak berubah
        this.currentLanguage = currentLang;
        this.updateContent();
        
        // Inisialisasi ulang animasi dan layout responsive
        this.initSkillBarAnimations();
        this.handleResponsiveLayout();
        
        console.log('Refresh selesai');
      } catch (error) {
        console.error('Error saat refresh:', error);
      } finally {
        // Pastikan complete() dipanggil bahkan jika terjadi error
        if (event && event.target && typeof event.target.complete === 'function') {
          event.target.complete();
        }
      }
    }, 1000);
  }

  updateContent() {
    const t = this.translations[this.currentLanguage];

    // Update all text content
    document.querySelector('#about .section-title')!.textContent = t.profilSingkat;

    // Update all three paragraphs in the about section
    const aboutParagraphs = document.querySelectorAll('#about .section-content p');
    aboutParagraphs[0].textContent = t.aboutContent;
    aboutParagraphs[1].textContent = t.aboutContent2;
    aboutParagraphs[2].textContent = t.aboutContent3;

    document.querySelector('#skills .section-title')!.textContent = t.keahlian;
    document.querySelector('#projects .section-title')!.textContent = t.projectTerbaru;
    document.querySelector('.contact-info h3')!.textContent = t.contactPerson;

    // Update education section
    document.querySelector('#education .section-title')!.textContent = t.pendidikan;

    // Update Tools section
    document.querySelector('#tools .section-title')!.textContent = t.tools;

    const degree = document.querySelector('.degree');
    if (degree) {
      degree.textContent = t.sarjanaTI;
    }

    // Update buttons text
    const sortButtons = document.querySelectorAll('.sort-buttons ion-button');
    sortButtons[0].textContent = t.terbaru;
    sortButtons[1].textContent = t.terlama;

    // Update project cards
    this.projects.forEach((project, index) => {
      const projectCards = document.querySelectorAll('.project-card');
      if (index < projectCards.length) {
        const card = projectCards[index];
        const demoLink = card.querySelector('.demo-link');
        if (demoLink) {
          demoLink.textContent = t.viewDemo;
        }
        const sourceLink = card.querySelector('a[target="_github"]');
        if (sourceLink) {
          sourceLink.textContent = t.sourceCode;
        }
      }
    });

    // Update footer
    const footer = document.querySelector('footer p');
    if (footer) {
      footer.textContent = t.copyright;
    }

    // Update project descriptions based on language
    if (this.currentLanguage === 'en') {
      // Translate project descriptions to English
      this.projects[0].description = 'This project aims to create a personal website as my portfolio in Software Engineering, developed with Ionic Framework and MySQL backend';
      this.projects[0].duration = 'February 2025 - present';

      this.projects[1].description = 'This project was developed for my Mobile Programming final assignment and addresses current challenges in Agriculture. It was designed with Ionic Framework and MySQL backend';
      this.projects[1].duration = 'November 2024 - February 2025';

      this.projects[2].description = 'Designed as a group project during the Merdeka Student Exchange batch 4 to Telkom University. It was created as a major assignment for the KPL course using C# language.';
      this.projects[2].duration = 'April - May 2024';
    } else {
      // Reset to original Indonesian descriptions
      this.projects[0].description = 'Project ini bertujuan untuk website pribadi sebagai portofolio saya di bidang Software Engineering yang dikembangkan dengan Ionic Framework dan backend berupa MySql';
      this.projects[0].duration = 'Februari 2025 - sekarang';

      this.projects[1].description = 'Project ini dikembangkan dengan tujuan sebagai tugas akhir di mata kuliah Pemograman Mobile dan menjawab tantangan di bidang Pertanian saat ini. Dirancang dengan Framework Ionic dengan backend berupa MySql';
      this.projects[1].duration = 'November 2024 - Februari 2025';

      this.projects[2].description = 'Dirancang secara berkelompok selama mengikuti Pertukaran Mahasiswa Merdeka batch 4 ke Telkom University. Ditujukan sebagai tugas besar dari mata kuliah KPL dengan bahasa C#.';
      this.projects[2].duration = 'April - Mei 2024';
    }
  }

  // Profile image modal state
  isProfileImageModalOpen = false;

  // Add new properties for responsive layout
  @ViewChild('leftPanel', { static: true }) leftPanel!: ElementRef;
  @ViewChild('rightPanel', { static: true }) rightPanel!: ElementRef;
  @ViewChildren('skillBar') skillBars!: QueryList<ElementRef>;

  private scrollHandler: (() => void) | null = null;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Sort projects by newest first by default
    this.sortProjects('newest');

    this.setupBackButtonHandler();
  }

  // Tambahkan metode baru untuk menangani tombol back
  private setupBackButtonHandler() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      // Karena ini adalah halaman utama, kita perlu konfirmasi sebelum keluar
      if (this.isProfileImageModalOpen) {
        // Jika modal terbuka, tutup modal saja
        this.closeProfileImageModal();
      } else if (this.isFlipCardVisible) {
        // Jika flip card sedang ditampilkan, tutup saja
        this.isFlipCardVisible = false;
        this.isCardFlipped = false;
      } else {
        // Ini adalah halaman utama, konfirmasi keluar dari aplikasi
        this.confirmExitApp();
      }
    });
  }

  // Metode untuk konfirmasi keluar
  async confirmExitApp() {
    const alert = await this.alertController.create({
      header: this.currentLanguage === 'id' ? 'Konfirmasi' : 'Confirmation',
      message: this.currentLanguage === 'id' ? 'Apakah Anda yakin ingin keluar dari aplikasi?' : 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: this.currentLanguage === 'id' ? 'Batal' : 'Cancel',
          role: 'cancel'
        },
        {
          text: this.currentLanguage === 'id' ? 'Keluar' : 'Exit',
          handler: () => {
            // Gunakan Capacitor App plugin untuk keluar
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

  ngAfterViewInit() {
    // Initialize responsive layout handlers
    this.initializeResponsiveLayout();
    this.initSkillBarAnimations();

    // Handle window resize
    window.addEventListener('resize', () => {
      this.handleResponsiveLayout();
    });
  }

  // Add this method to your class
  initSkillBarAnimations() {
    if (this.skillBars) {
      setTimeout(() => {
        this.skillBars.forEach(bar => {
          const element = bar.nativeElement;
          element.addEventListener('click', () => {
            element.classList.add('animate-pulse');
            setTimeout(() => {
              element.classList.remove('animate-pulse');
            }, 800);
          });
        });
      }, 500);
    }
  }

  private initializeResponsiveLayout() {
    this.handleResponsiveLayout();

    // Define scroll handler
    this.scrollHandler = () => {
      if (window.innerWidth <= 768) {
        const scrollPosition = window.scrollY;
        const leftPanelHeight = this.leftPanel.nativeElement.offsetHeight;

        if (scrollPosition > leftPanelHeight / 2) {
          this.leftPanel.nativeElement.classList.add('sticky');
          this.rightPanel.nativeElement.classList.add('panel-with-sticky');
        } else {
          this.leftPanel.nativeElement.classList.remove('sticky');
          this.rightPanel.nativeElement.classList.remove('panel-with-sticky');
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', this.scrollHandler);
  }

  private handleResponsiveLayout() {
    if (window.innerWidth <= 768) {
      // Mobile layout
      if (!this.scrollHandler) {
        this.initializeResponsiveLayout(); // Re-initialize if needed
      }
    } else {
      // Desktop layout
      this.removeResponsiveHandlers();
    }
  }

  private removeResponsiveHandlers() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.leftPanel.nativeElement.classList.remove('sticky');
      this.rightPanel.nativeElement.classList.remove('panel-with-sticky');
      this.scrollHandler = null;
    }
  }

  ngOnDestroy() {
    // Clean up event listeners
    this.removeResponsiveHandlers();
    window.removeEventListener('resize', () => {
      this.handleResponsiveLayout();
    });

    // Unsubscribe dari backButton subscription
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }


  // Method to sort projects
  sortProjects(order: 'newest' | 'oldest') {
    if (order === 'newest') {
      this.projects.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    } else {
      this.projects.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    }
  }

  // Metode untuk membuka link sosial media
  openLink(url: string) {
    window.open(url, '_blank');
  }

  // Metode untuk navigasi dengan animasi
  navigateWithAnimation(path: string) {
    // Make sure path starts with /
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    // Create your custom animation
    const animation = (baseEl: HTMLElement, opts?: any): Animation => {
      const enteringAnimation = createAnimation()
        .addElement(opts.enteringEl)
        .duration(300)
        .fromTo('transform', 'translateX(100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1');
  
      const leavingAnimation = createAnimation()
        .addElement(opts.leavingEl)
        .duration(300)
        .fromTo('transform', 'translateX(0)', 'translateX(-100%)')
        .fromTo('opacity', '1', '0.2');
  
      return createAnimation()
        .addAnimation(enteringAnimation)
        .addAnimation(leavingAnimation);
    };
  
    // Use absolute URL navigation - this is the key change
    const url = window.location.origin + path;
    
    // Use standard navigation for mobile browsers
    if (this.platform.is('mobile') || window.innerWidth <= 768) {
      window.location.href = url;
    } else {
      // Use animated navigation for desktop
      this.navCtrl.navigateForward(path, {
        animated: true,
        animation
      });
    }
  }

  navigateToBiodata() {
    this.isFlipCardVisible = true;
  
    // Start the flip animation after a short delay
    setTimeout(() => {
      this.isCardFlipped = true;
  
      // Wait for the flip animation to complete before navigating
      setTimeout(() => {
        // Use standard navigation for mobile browsers
        if (this.platform.is('mobile') || window.innerWidth <= 768) {
          // For mobile, use direct URL navigation
          window.location.href = window.location.origin + '/biodata';
        } else {
          // For desktop, use animated navigation
          const animation = (baseEl: HTMLElement, opts?: any): Animation => {
            const enteringAnimation = createAnimation()
              .addElement(opts.enteringEl)
              .duration(300)
              .fromTo('transform', 'translateX(100%)', 'translateX(0)')
              .fromTo('opacity', '0.2', '1');
  
            const leavingAnimation = createAnimation()
              .addElement(opts.leavingEl)
              .duration(300)
              .fromTo('transform', 'translateX(0)', 'translateX(-100%)')
              .fromTo('opacity', '1', '0.2');
  
            return createAnimation()
              .addAnimation(enteringAnimation)
              .addAnimation(leavingAnimation);
          };
  
          // Navigate to biodata page
          this.navCtrl.navigateForward('/biodata', {
            animated: true,
            animation
          });
        }
        
        // Reset the flip card state after navigation
        setTimeout(() => {
          this.isFlipCardVisible = false;
          this.isCardFlipped = false;
        }, 300);
      }, 900); // Match this with the flip animation duration
    }, 100);
  }

  // Open profile image modal
  openProfileImageModal() {
    this.isProfileImageModalOpen = true;
  }

  // Close profile image modal
  closeProfileImageModal() {
    this.isProfileImageModalOpen = false;
  }
}