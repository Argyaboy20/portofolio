import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface ProjectImage {
  url: string;
  originalCaption: string;
  caption: string;
}

interface DevelopmentTool {
  name: string;
  description: string;
  icon: string;
}

interface Translations {
  title: string;
  readyToExperience: string;
  tryOutMessage: string;
  launchWebsite: string;
  toolsTitle: string;
  imageCaptions: {
    [key: string]: string;
  };
}

interface TranslationDict {
  id: Translations;
  en: Translations;
}

const AUTO_SLIDE_INTERVAL = 3000;

@Component({
  selector: 'app-connectpmm',
  templateUrl: './connectpmm.page.html',
  styleUrls: ['./connectpmm.page.scss'],
  standalone: false,
})
export class ConnectpmmPage implements OnInit, OnDestroy {
  @ViewChild('galleryScroll') galleryScroll!: ElementRef<HTMLElement>;

  currentLanguage: 'id' | 'en' = 'id';
  activeIndex = 0;

  translations: TranslationDict = {
    id: {
      title: 'PMM Connect',
      readyToExperience: 'Siap Mencobanya?',
      tryOutMessage: 'Coba project luar biasa ini sekarang!',
      launchWebsite: 'Pergi ke Website',
      toolsTitle: 'Alat alat Pengembangan',
      imageCaptions: {
        'Tampilan Halaman Depan': 'Tampilan Halaman Depan',
        'Tampilan Menu Daftar': 'Tampilan Menu Daftar',
        'Tampilan Menu Masuk': 'Tampilan Menu Masuk',
        'Tampilan Dashboard Post': 'Tampilan Dashboard Post',
        'Tampilan Dashboard Connex': 'Tampilan Dashboard Connex',
        'Tampilan Pencarian': 'Tampilan Pencarian',
        'Tampilan Pesan': 'Tampilan Pesan',
        'Tampilan Notifikasi': 'Tampilan Notifikasi',
        'Tampilan Posting': 'Tampilan Posting',
        'Tampilan Akun Post': 'Tampilan Akun Post',
        'Tampilan Akun Connex': 'Tampilan Akun Connex',
      }
    },
    en: {
      title: 'PMM Connect',
      readyToExperience: 'Ready to Experience It?',
      tryOutMessage: 'Try out this awesome project now!',
      launchWebsite: 'Go to Website',
      toolsTitle: 'Development Tools',
      imageCaptions: {
        'Tampilan Halaman Depan': 'Home Page View',
        'Tampilan Menu Daftar': 'Sign Up Menu View',
        'Tampilan Menu Masuk': 'Sign In Menu View',
        'Tampilan Dashboard Post': 'Dashboard Post View',
        'Tampilan Dashboard Connex': 'Dashboard Connex View',
        'Tampilan Pencarian': 'Search View',
        'Tampilan Pesan': 'Messages View',
        'Tampilan Notifikasi': 'Notifications View',
        'Tampilan Posting': 'Posting View',
        'Tampilan Akun Post': 'Post Account View',
        'Tampilan Akun Connex': 'Connex Account View'
      }
    }
  };

  projectImages: ProjectImage[] = [
    { url: '/assets/pmmconnect/homepage.png', originalCaption: 'Tampilan Halaman Depan', caption: 'Tampilan Halaman Depan' },
    { url: '/assets/pmmconnect/signup.png', originalCaption: 'Tampilan Menu Daftar', caption: 'Tampilan Menu Daftar' },
    { url: '/assets/pmmconnect/signin.png', originalCaption: 'Tampilan Menu Masuk', caption: 'Tampilan Menu Masuk' },
    { url: '/assets/pmmconnect/beranda-post.png', originalCaption: 'Tampilan Dashboard Post', caption: 'Tampilan Dashboard Post' },
    { url: '/assets/pmmconnect/beranda-connex.png', originalCaption: 'Tampilan Dashboard Connex', caption: 'Tampilan Dashboard Connex' },
    { url: '/assets/pmmconnect/pencarian.png', originalCaption: 'Tampilan Pencarian', caption: 'Tampilan Pencarian' },
    { url: '/assets/pmmconnect/pesan.png', originalCaption: 'Tampilan Pesan', caption: 'Tampilan Pesan' },
    { url: '/assets/pmmconnect/notifikasi.png', originalCaption: 'Tampilan Notifikasi', caption: 'Tampilan Notifikasi' },
    { url: '/assets/pmmconnect/posting.png', originalCaption: 'Tampilan Posting', caption: 'Tampilan Posting' },
    { url: '/assets/pmmconnect/akun-post.png', originalCaption: 'Tampilan Akun Post', caption: 'Tampilan Akun Post' },
    { url: '/assets/pmmconnect/akun-connex.png', originalCaption: 'Tampilan Akun Connex', caption: 'Tampilan Akun Connex' },
  ];

  developmentTools: DevelopmentTool[] = [
    {
      name: 'Adonis JS',
      description: 'Backend framework Javascript',
      icon: 'logo-nodejs'
    },
    {
      name: 'CSS',
      description: 'Styling tampilan aplikasi',
      icon: 'logo-css3'
    },
    {
      name: 'UI/UX Design',
      description: 'Desain antarmuka pengguna',
      icon: 'brush'
    }
  ];

  private toolDescriptions: { [key: string]: { id: string; en: string } } = {
    'Adonis JS': { id: 'Backend framework Javascript', en: 'Javascript backend framework' },
    'CSS': { id: 'Styling tampilan aplikasi', en: 'Application styling' },
    'UI/UX Design': { id: 'Desain antarmuka pengguna', en: 'User interface design' }
  };

  projectUrl: string = 'https://connectpmm.vercel.app/';
  isImageModalOpen = false;
  selectedImage: ProjectImage | null = null;

  private backButtonSubscription!: Subscription;
  private autoSlideTimer?: ReturnType<typeof setInterval>;

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.updateImageCaptions();
  }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if (this.isImageModalOpen) {
        this.closeImageModal();
      } else {
        this.router.navigate(['/']);
      }
    });

    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.backButtonSubscription?.unsubscribe();
    this.stopAutoSlide();
  }

  private startAutoSlide() {
    this.autoSlideTimer = setInterval(() => this.nextSlide(), AUTO_SLIDE_INTERVAL);
  }

  private stopAutoSlide() {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
  }

  private nextSlide() {
    if (this.isImageModalOpen) return;

    this.activeIndex = (this.activeIndex + 1) % this.projectImages.length;
    const container = this.galleryScroll?.nativeElement;
    if (!container) return;

    const target = container.children[this.activeIndex] as HTMLElement;
    container.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
    this.updateImageCaptions();
    this.updateToolDescriptions();

    if (this.selectedImage) {
      const t = this.translations[this.currentLanguage];
      this.selectedImage = {
        ...this.selectedImage,
        caption: t.imageCaptions[this.selectedImage.originalCaption] || this.selectedImage.originalCaption
      };
    }
  }

  private updateImageCaptions() {
    const t = this.translations[this.currentLanguage];
    this.projectImages = this.projectImages.map(image => ({
      ...image,
      caption: t.imageCaptions[image.originalCaption] || image.originalCaption
    }));
  }

  private updateToolDescriptions() {
    this.developmentTools = this.developmentTools.map(tool => ({
      ...tool,
      description: this.toolDescriptions[tool.name]?.[this.currentLanguage] ?? tool.description
    }));
  }

  openImageModal(image: ProjectImage) {
    this.selectedImage = image;
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
    this.selectedImage = null;
  }
}