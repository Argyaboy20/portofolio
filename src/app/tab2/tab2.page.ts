import { Component } from '@angular/core';

interface ProjectImage {
  url: string;
  originalCaption: string; // Menambahkan properti untuk menyimpan caption asli
  caption: string;
}

interface Translations {
  title: string;
  readyToExperience: string;
  tryOutMessage: string;
  launchProject: string;
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
export class Tab2Page {
  currentLanguage: 'id' | 'en' = 'id';
  translations: TranslationDict = {
    id: {
      title: 'Pertanian Mobile App',
      readyToExperience: 'Siap Mencobanya?',
      tryOutMessage: 'Coba project luar biasa ini sekarang!',
      launchProject: 'Mulai Project',
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
      launchProject: 'Launch Project',
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

  projectUrl: string = 'https://your-project-url.com';
  isImageModalOpen = false;
  selectedImage: ProjectImage | null = null;

  constructor() {
    // Inisialisasi caption pertama kali
    this.updateImageCaptions();
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
    
    const launchButton = document.querySelector('.try-btn');
    if (launchButton) {
      launchButton.textContent = t.launchProject;
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