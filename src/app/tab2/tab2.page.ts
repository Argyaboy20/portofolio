import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { inject } from "@vercel/analytics"


inject();

interface ProjectImage {
  url: string;
  originalCaption: string; // Menambahkan properti untuk menyimpan caption asli
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
  launchAndroid: string;
  toolsTitle: string;
  imageCaptions: {
    [key: string]: string;
  };
}

interface TranslationDict {
  id: Translations;
  en: Translations;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit, OnDestroy {
  currentLanguage: 'id' | 'en' = 'id';
  translations: TranslationDict = {
    id: {
      title: 'Pertanian Mobile App',
      readyToExperience: 'Siap Mencobanya?',
      tryOutMessage: 'Coba project luar biasa ini sekarang!',
      launchWebsite: 'Buka Website',
      launchAndroid: 'Unduh Aplikasi Android',
      toolsTitle: 'Alat alat Pengembangan',
      imageCaptions: {
        'Tampilan Halaman Depan': 'Tampilan Halaman Depan',
        'Tampilan Menu Daftar': 'Tampilan Menu Daftar',
        'Tampilan Menu Masuk': 'Tampilan Menu Masuk',
        'Tampilan Dashboard': 'Tampilan Dashboard',
        'Tampilan Pengaturan': 'Tampilan Pengaturan',
        'Tampilan Menu Informasi Akun': 'Tampilan Menu Informasi Akun',
        'Tampilan Menu Kamus Permo': 'Tampilan Menu Kamus Permo',
        'Tampilan Menu Ilmu Tanah': 'Tampilan Menu Ilmu Tanah',
        'Tampilan Menu Prediksi Cuaca': 'Tampilan Menu Prediksi Cuaca'
      }
    },
    en: {
      title: 'Pertanian Mobile App',
      readyToExperience: 'Ready to Experience It?',
      tryOutMessage: 'Try out this awesome project now!',
      launchWebsite: 'Open Website',
      launchAndroid: 'Download Android App',
      toolsTitle: 'Development Tools',
      imageCaptions: {
        'Tampilan Halaman Depan': 'Home Page View',
        'Tampilan Menu Daftar': 'Registration Menu View',
        'Tampilan Menu Masuk': 'Login Menu View',
        'Tampilan Dashboard': 'Dashboard View',
        'Tampilan Pengaturan': 'Settings View',
        'Tampilan Menu Informasi Akun': 'Account Information Menu View',
        'Tampilan Menu Kamus Permo': 'Permo Dictionary Menu View',
        'Tampilan Menu Ilmu Tanah': 'Soil Science Menu View',
        'Tampilan Menu Prediksi Cuaca': 'Weather Prediction Menu View'
      }
    }
  };

  projectImages: ProjectImage[] = [
    {
      url: '/assets/halamanutama.png',
      originalCaption: 'Tampilan Halaman Depan',
      caption: 'Tampilan Halaman Depan'
    },
    {
      url: '/assets/daftar.png',
      originalCaption: 'Tampilan Menu Daftar',
      caption: 'Tampilan Menu Daftar'
    },
    {
      url: '/assets/login.png',
      originalCaption: 'Tampilan Menu Masuk',
      caption: 'Tampilan Menu Masuk'
    },
    {
      url: '/assets/dashboard.png',
      originalCaption: 'Tampilan Dashboard',
      caption: 'Tampilan Dashboard'
    },
    {
      url: '/assets/setting.png',
      originalCaption: 'Tampilan Pengaturan',
      caption: 'Tampilan Pengaturan'
    },
    {
      url: '/assets/informasi.png',
      originalCaption: 'Tampilan Menu Informasi Akun',
      caption: 'Tampilan Menu Informasi Akun'
    },
    {
      url: '/assets/kamus.png',
      originalCaption: 'Tampilan Menu Kamus Permo',
      caption: 'Tampilan Menu Kamus Permo'
    },
    {
      url: '/assets/ilmutanah.png',
      originalCaption: 'Tampilan Menu Ilmu Tanah',
      caption: 'Tampilan Menu Ilmu Tanah'
    },
    {
      url: '/assets/prediksi.png',
      originalCaption: 'Tampilan Menu Prediksi Cuaca',
      caption: 'Tampilan Menu Prediksi Cuaca'
    }
  ];

  developmentTools: DevelopmentTool[] = [
    {
      name: 'HTML',
      description: this.currentLanguage === 'id' ? 'Struktur dasar aplikasi' : 'Basic structure of the application',
      icon: 'logo-html5'
    },
    {
      name: 'JavaScript',
      description: this.currentLanguage === 'id' ? 'Interaktivitas dan dinamisme' : 'Interactivity and dynamics',
      icon: 'logo-javascript'
    },
    {
      name: 'UI/UX Design',
      description: this.currentLanguage === 'id' ? 'Desain antarmuka pengguna' : 'User interface design',
      icon: 'brush'
    },
    {
      name: 'MySQL',
      description: this.currentLanguage === 'id' ? 'Database untuk penyimpanan data' : 'Database for data storage',
      icon: 'server'
    },
    {
      name: 'Ionic Framework',
      description: this.currentLanguage === 'id' ? 'Framework pengembangan aplikasi hybrid' : 'Hybrid app development framework',
      icon: 'phone-portrait'
    }
  ];

  projectUrl: string = 'https://pertanian-mobile-c1537.web.app';
  androidUrl: string = 'https://www.mediafire.com/file/lx1ej96z0datdfu/PertanianMobile.apk/file';
  isImageModalOpen = false;
  selectedImage: ProjectImage | null = null;
  private backButtonSubscription!: Subscription;

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    // Inisialisasi caption pertama kali
    this.updateImageCaptions();
  }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      // Check if image modal is open
      if (this.isImageModalOpen) {
        this.closeImageModal();
      } else {
        // Navigate back to tab1
        this.router.navigate(['/tabs/tab1']);
      }
    });
  }

  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
    this.updateContent();
  }

  updateImageCaptions() {
    // Membuat array baru dengan caption yang diperbarui
    this.projectImages = this.projectImages.map(image => ({
      ...image,
      caption: this.translations[this.currentLanguage].imageCaptions[image.originalCaption] || image.originalCaption
    }));
  }

  updateContent() {
    const t = this.translations[this.currentLanguage];

    // Update section title
    document.querySelector('.section-title')!.textContent = t.title;

    // Update CTA section
    document.querySelector('.cta-content h3')!.textContent = t.readyToExperience;
    document.querySelector('.cta-content p')!.textContent = t.tryOutMessage;

    const websiteButton = document.querySelector('.website-btn');
    if (websiteButton) {
      websiteButton.textContent = t.launchWebsite;
    }

    const androidButton = document.querySelector('.android-btn');
    if (androidButton) {
      androidButton.textContent = t.launchAndroid;
    }

    // Update image captions
    this.updateImageCaptions();

    // Update modal caption if modal is open
    if (this.selectedImage) {
      this.selectedImage = {
        ...this.selectedImage,
        caption: t.imageCaptions[this.selectedImage.originalCaption] || this.selectedImage.originalCaption
      };
    }

    // Update tool descriptions when language changes
    this.developmentTools = this.developmentTools.map(tool => {
      const updatedDescription = tool.name === 'HTML' ?
        (this.currentLanguage === 'id' ? 'Struktur dasar aplikasi' : 'Basic structure of the application') :
        tool.name === 'JavaScript' ?
          (this.currentLanguage === 'id' ? 'Interaktivitas dan dinamisme' : 'Interactivity and dynamics') :
          tool.name === 'UI/UX Design' ?
            (this.currentLanguage === 'id' ? 'Desain antarmuka pengguna' : 'User interface design') :
            tool.name === 'MySQL' ?
              (this.currentLanguage === 'id' ? 'Database untuk penyimpanan data' : 'Database for data storage') :
              tool.name === 'Ionic Framework' ?
                (this.currentLanguage === 'id' ? 'Framework pengembangan aplikasi hybrid' : 'Hybrid app development framework') :
                tool.description;

      return {
        ...tool,
        description: updatedDescription
      };
    });

  }

  openImageModal(image: ProjectImage) {
    this.selectedImage = image;
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
    this.selectedImage = null;

    // Navigate back to the tab2 page
    this.router.navigateByUrl('/tabs/tab2');
  }
}