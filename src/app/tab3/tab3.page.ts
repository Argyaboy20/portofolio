import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface Translations {
  heroTitle: string;
  heroSubtitle: string;
  skillsTitle: string;
  galleryTitle: string;
}

interface TranslationDict {
  id: Translations;
  en: Translations;
}

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  currentLanguage: 'id' | 'en' = 'id';
  translations: TranslationDict = {
    id: {
      heroTitle: 'Web Portofolio',
      heroSubtitle: 'Pengembang Web, Pengembang Full-Stack, Desainer UI/UX & Pengembang Ionic',
      skillsTitle: 'Alat-Alat Pengembangan',
      galleryTitle: 'Tampilan UI/UX'
    },
    en: {
      heroTitle: 'Web Portofolio',
      heroSubtitle: 'Web Developer, Fullstack Developer, UI/UX Designer, Ionic Developer',
      skillsTitle: 'Development Tools',
      galleryTitle: 'UI/UX View'
    }
  };

  skills: Skill[] = [
    { name: 'HTML/CSS', level: 90, icon: 'code-outline' },
    { name: 'JavaScript', level: 85, icon: 'logo-javascript' },
    { name: 'Angular', level: 80, icon: 'logo-angular' },
    { name: 'Node.js', level: 75, icon: 'server-outline' },
    { name: 'UI/UX Design', level: 85, icon: 'color-palette-outline' },
    { name: 'Database MySql', level: 80, icon: 'server' },
    { name: 'Ionic Framework', level: 75, icon: 'logo-ionic' }
  ];

  galleryItems: GalleryItem[] = [
    { 
      id: 1, 
      src: '/assets/portofolio.png', 
      title: 'Beranda Utama', 
      description: 'Menu Beranda Utama dari Web Portofolio sayas' 
    },
    { 
      id: 2, 
      src: '/assets/biodata.png', 
      title: 'Menu Biodata', 
      description: 'Tampilan dari menu biodata lengkap seputar saya' 
    },
    { 
      id: 3, 
      src: '/assets/galeri.png', 
      title: 'Menu Galeri Kehidupan', 
      description: 'Foto foto tentang perjalanan hidup saya' 
    },
      { 
        id: 4, 
        src: '/assets/permo.png', 
        title: 'Menu Project Permo', 
        description: 'Tampilan menu dari project Pertanian Mobile (Permo) saya' 
      }
  ];

  selectedImage: GalleryItem | null = null;
  showModal: boolean = false;

  constructor(private modalController: ModalController) {}

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
  }

  openImageModal(image: GalleryItem) {
    this.selectedImage = image;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedImage = null;
  }
}