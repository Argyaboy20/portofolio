import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { createAnimation, Animation, Platform, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { inject } from "@vercel/analytics"


inject();

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
  karirKedua: string;
  adminOfficer: string;
  klikUntukDetail: string;
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
  private screenshotPrevention: (() => void) | null = null;
  isMerdekaProgramModalOpen = false;

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
      achievements: 'Prestasi',
      karirKedua: 'Karir Kedua',
      adminOfficer: 'Staff Administrasi',
      klikUntukDetail: 'Klik untuk melihat detail lebih lanjut'
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
      achievements: 'Achievements',
      karirKedua: 'Second Career',
      adminOfficer: 'Administration Officer',
      klikUntukDetail: 'Click to see more details'
    }
  };

  projects: Project[] = [
    {
      title: 'Web Portofolio',
      duration: 'Februari 2025 - sekarang',
      description: 'Project ini bertujuan untuk website pribadi sebagai portofolio saya di bidang Software Engineering yang dikembangkan dengan Ionic Framework berbasis HTML dan Javascript',
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

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  // Add this method to your class
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
    this.updateContent();

    // Add this to ensure responsive layout remains intact after language switch
    setTimeout(() => {
      this.handleResponsiveLayout();
    }, 0);
  }

  //refreh ulang halaman
  doRefresh(event: any) {
    console.log('Memulai refresh halaman');

    try {
      // Set language back to default (Indonesian)
      this.currentLanguage = 'id';

      // Sort projects by newest
      this.sortProjects('newest');

      // Simple timeout to simulate loading
      setTimeout(() => {
        // Apply all updates
        this.updateContent();
        this.initSkillBarAnimations();
        this.handleResponsiveLayout();

        console.log('Refresh selesai dengan bahasa:', this.currentLanguage);

        // Show success message
        this.presentToast({
          message: 'Refresh berhasil!', // Always in Indonesian since we reset to default
          color: 'success',
          duration: 2000
        });

        // Complete the refresh
        event.target.complete();
      }, 1000);
    } catch (error) {
      console.error('Error during refresh:', error);

      // Show error message
      this.presentToast({
        message: 'Refresh gagal! Silakan coba lagi.',
        color: 'danger',
        duration: 3000
      });

      // Complete the refresh even if there's an error
      event.target.complete();
    }
  }

  // Metode untuk menampilkan toast
  async presentToast(options: { message: string, color: string, duration: number }) {
    const toast = await this.toastController.create({
      message: options.message,
      duration: options.duration,
      position: 'top',
      color: options.color,
      buttons: [{ text: 'OK', role: 'cancel' }]
    });

    await toast.present();
  }


  // Method to open external links
  openExternalLink(url: string) {
    window.open(url, '_blank');
  }

  // Method to open social media links
  openSocialMediaLink(platform: string, username: string) {
    let url = '';
    switch (platform) {
      case 'instagram':
        url = `https://www.instagram.com/${username}`;
        break;
      // You can add more platforms if needed
      default:
        return;
    }
    window.open(url, '_blank');
  }

  // Method to navigate to a specific project
  navigateToProject(projectTitle: string) {
    // Find the project in the projects array
    const project = this.projects.find(p => p.title === projectTitle);

    if (project) {
      // Use the existing navigateWithAnimation method with the project's demo link
      this.navigateWithAnimation(project.demoLink);
    }
  }


  //update Content untuk tombol translate
  updateContent() {
    const t = this.translations[this.currentLanguage];

    // Update all text content with null checks
    const aboutTitle = document.querySelector('#about .section-title');
    if (aboutTitle) aboutTitle.textContent = t.profilSingkat;

    // Update about section while preserving clickable elements
    const aboutSection = document.querySelector('#about .section-content');
    if (aboutSection) {
      // First paragraph - preserve Ionic Framework link
      const p1 = aboutSection.querySelector('p:nth-child(1)');
      if (p1) {
        const ionicLink = p1.querySelector('.clickable-text');
        if (ionicLink) {
          // Create text nodes for before and after the link
          const beforeText = this.currentLanguage === 'en' ?
            'A Software Engineer focused on hybrid mobile application development with a passion for creating innovative solutions. My core expertise lies in using ' :
            'Seorang Software Engineer dengan fokus pada pengembangan aplikasi mobile hybrid yang memiliki semangat tinggi dalam menciptakan solusi inovatif. Keahlian utama saya terletak pada penggunaan ';

          const afterText = this.currentLanguage === 'en' ?
            ' combined with JavaScript and HTML to develop cross-platform mobile applications. With a GPA of 3.73 achieved during my college years at ' :
            ' yang dipadukan dengan JavaScript dan HTML untuk mengembangkan aplikasi mobile cross-platform. Dengan IPK 3.73 yang saya raih selama masa perkuliahan di ';

          // Clear the paragraph and rebuild it
          p1.innerHTML = '';
          p1.appendChild(document.createTextNode(beforeText));
          p1.appendChild(ionicLink.cloneNode(true));
          p1.appendChild(document.createTextNode(afterText));

          // Add the institute name with proper translation
          const institute = document.createElement('span');
          institute.className = 'clickable-text';
          institute.style.color = '#4a90e2';

          // Create the strong element inside
          const strong = document.createElement('strong');
          strong.textContent = this.currentLanguage === 'en' ?
            'Indonesian Institute of Technology and Business' :
            'Institut Teknologi dan Bisnis Indonesia';

          // Set the click handler
          institute.onclick = (event) => {
            // Using arrow function to preserve 'this' context
            this.openSocialMediaLink('instagram', '@itb_indonesia');
          };

          institute.appendChild(strong);
          p1.appendChild(institute);

          // Add the final part of the paragraph
          const finalText = this.currentLanguage === 'en' ?
            ', I have demonstrated strong commitment and dedication in academic field.' :
            ', saya membuktikan komitmen dan dedikasi yang kuat dalam bidang akademik.';

          p1.appendChild(document.createTextNode(finalText));
        }
      }

      // Second paragraph - preserve ApliKasir link
      const p2 = aboutSection.querySelector('p:nth-child(2)');
      if (p2) {
        const aplikasirLink = p2.querySelector('.clickable-text');
        if (aplikasirLink) {
          // Create text nodes for before and after the link
          const beforeText = this.currentLanguage === 'en' ?
            'My experience includes various application development projects, including creating a Todolist APK using JavaScript and ' :
            'Pengalaman saya mencakup berbagai proyek pengembangan aplikasi, termasuk pembuatan Todolist APK menggunakan JavaScript dan ';

          const afterText = this.currentLanguage === 'en' ?
            ' with C#. In these projects, I contributed as a backend developer and successfully implemented features such as TaskController and UIEdit. My technical knowledge was strengthened through a student exchange program at Telkom University, where I deepened my understanding of software development, system security, and database management.' :
            ' dengan C#. Dalam proyek-proyek tersebut, saya berkontribusi sebagai backend developer dan berhasil mengimplementasikan fitur-fitur seperti TaskController dan UIEdit. Pengetahuan teknis saya diperkuat melalui program student exchange di Telkom University, di mana saya memperdalam pemahaman tentang pengembangan perangkat lunak, keamanan sistem, dan manajemen database.';

          // Clear the paragraph and rebuild it
          p2.innerHTML = '';
          p2.appendChild(document.createTextNode(beforeText));
          p2.appendChild(aplikasirLink.cloneNode(true));
          p2.appendChild(document.createTextNode(afterText));
        }
      }

      // Third paragraph - simple text replacement
      const p3 = aboutSection.querySelector('p:nth-child(3)');
      if (p3) {
        p3.textContent = t.aboutContent3;
      }
    }

    const skillsTitle = document.querySelector('#skills .section-title');
    if (skillsTitle) skillsTitle.textContent = t.keahlian;

    const projectsTitle = document.querySelector('#projects .section-title');
    if (projectsTitle) projectsTitle.textContent = t.projectTerbaru;

    const contactInfo = document.querySelector('.contact-info h3');
    if (contactInfo) contactInfo.textContent = t.contactPerson;

    // Update education section
    const educationTitle = document.querySelector('#education .section-title');
    if (educationTitle) educationTitle.textContent = t.pendidikan;

    // Update Tools section
    const toolsTitle = document.querySelector('#tools .section-title');
    if (toolsTitle) toolsTitle.textContent = t.tools;

    const degree = document.querySelector('.degree');
    if (degree) {
      degree.textContent = t.sarjanaTI;
    }

    // Update buttons text
    const sortButtons = document.querySelectorAll('.sort-buttons ion-button');
    if (sortButtons.length >= 2) {
      sortButtons[0].textContent = t.terbaru;
      sortButtons[1].textContent = t.terlama;
    }

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

    // Update career section
    const careerTitle = document.querySelector('#career .section-title');
    if (careerTitle) careerTitle.textContent = t.karirKedua;

    const adminOfficerTitle = document.querySelector('.career-details h3');
    if (adminOfficerTitle) adminOfficerTitle.textContent = t.adminOfficer;

    const careerDescription = document.querySelector('.career-description');
    if (careerDescription) careerDescription.textContent = t.klikUntukDetail;

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

  ngOnInit() {
    // Sort projects by newest first by default
    this.sortProjects('newest');

    this.setupBackButtonHandler();
  }

  ngAfterViewInit() {
    // Initialize responsive layout handlers
    this.initializeResponsiveLayout();
    this.initSkillBarAnimations();

    // Handle window resize
    window.addEventListener('resize', () => {
      this.handleResponsiveLayout();
    });

    this.preventScreenshot();
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

    // Remove event listeners to prevent memory leaks
    document.removeEventListener('contextmenu', this.preventAction);
    document.removeEventListener('dragstart', this.preventAction);
    document.removeEventListener('selectstart', this.preventAction);
    document.removeEventListener('keydown', this.preventScreenshotShortcuts);
    document.removeEventListener('keydown', this.preventDevToolsScreenshot, true);
  }

  preventScreenshot(event?: Event) {
    // Prevent default actions
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Disable right-click, drag, selection, and screenshot attempts
    document.addEventListener('contextmenu', this.preventAction);
    document.addEventListener('dragstart', this.preventAction);
    document.addEventListener('selectstart', this.preventAction);

    // Prevent Print Screen / Screenshot keyboard shortcuts
    document.addEventListener('keydown', this.preventScreenshotShortcuts);

    // Prevent screenshots via browser developer tools
    document.addEventListener('keydown', this.preventDevToolsScreenshot, true);

    // Platform-specific screenshot prevention
    if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
      try {
        // Android-specific secure flag
        if (Capacitor.getPlatform() === 'android') {
          try {
            ScreenOrientation.lock({
              orientation: 'portrait'
            });
          } catch (error) {
            console.error('Error locking screen orientation:', error);
          }
        }

        // Additional prevention method
        if (this.platform.is('android') || this.platform.is('ios')) {
          // Programmatically prevent screenshots by adding a secure flag
          const windowRef = window as any;
          if (windowRef.plugins && windowRef.plugins.preventScreenshot) {
            windowRef.plugins.preventScreenshot.prevent();
          }
        }
      } catch (error) {
        console.error('Error preventing screenshots:', error);
      }
    }
  }

  private preventAction = (event: Event) => {
    event.preventDefault();
  }

  private preventScreenshotShortcuts = (event: KeyboardEvent) => {
    // Prevent Print Screen, F12 (DevTools), Ctrl+P (Print), Ctrl+Shift+I (DevTools)
    const preventKeys = [
      'PrintScreen',
      'F12',
      'KeyP'  // For Ctrl+P print prevention
    ];

    if (
      preventKeys.includes(event.code) ||
      (event.ctrlKey && (event.code === 'KeyP' || event.code === 'KeyI')) ||
      (event.metaKey && (event.code === 'KeyP' || event.code === 'KeyI'))
    ) {
      event.preventDefault();
      this.showDownloadRestrictionAlert();
    }
  }

  private preventDevToolsScreenshot = (event: KeyboardEvent) => {
    // Additional screenshot prevention for browser dev tools
    if (
      event.ctrlKey &&
      (event.shiftKey || event.altKey) &&
      (event.key === 'I' || event.key === 'J')
    ) {
      event.preventDefault();
      this.showDownloadRestrictionAlert();
    }
  }

  async showDownloadRestrictionAlert() {
    const alert = await this.alertController.create({
      header: this.currentLanguage === 'id' ? 'Unduh Dibatasi' : 'Download Restricted',
      message: this.currentLanguage === 'id'
        ? 'Maaf, mengunduh atau screenshot foto profil tidak diizinkan.'
        : 'Sorry, downloading or screenshots of profile photos are not allowed.',
      buttons: ['OK']
    });

    await alert.present();
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
    // Tidak perlu setup scroll handler di sini lagi, karena sudah ditangani di handleResponsiveLayout()
  }

  // Method baru untuk setup scroll handler saja
  private setupScrollHandler() {
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
        // Cukup setup scroll handler langsung
        this.setupScrollHandler();
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

  openMerdekaProgramModal() {
    this.isMerdekaProgramModalOpen = true;
  }

  closeMerdekaProgramModal() {
    this.isMerdekaProgramModalOpen = false;
  }

  preventModalClose(event: Event) {
    event.stopPropagation();
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