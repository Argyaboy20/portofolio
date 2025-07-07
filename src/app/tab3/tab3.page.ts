import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalController, Platform, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { inject } from "@vercel/analytics"


inject();

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
  speedTitle: string;
  speedDescription: string;
  viewFullReport: string;
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
export class Tab3Page implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal!: IonModal;

  currentLanguage: 'id' | 'en' = 'id';
  translations: TranslationDict = {
    id: {
      heroTitle: 'Web Portofolio',
      heroSubtitle: 'Pengembang Web, Pengembang Full-Stack & Pengembang Ionic',
      skillsTitle: 'Alat-Alat Pengembangan',
      galleryTitle: 'Tampilan UI/UX',
      speedTitle: 'Kecepatan Web',
      speedDescription: 'Laporan kecepatan web portofolio',
      viewFullReport: 'Lihat laporan web secara lengkap'
    },
    en: {
      heroTitle: 'Web Portofolio',
      heroSubtitle: 'Web Developer, Fullstack Developer & Ionic Developer',
      skillsTitle: 'Development Tools',
      galleryTitle: 'UI/UX View',
      speedTitle: 'Web Performance',
      speedDescription: 'Web portfolio performance report',
      viewFullReport: 'View full web report'
    }
  };

  skills: Skill[] = [
    { name: 'HTML/CSS', level: 90, icon: 'code-outline' },
    { name: 'JavaScript', level: 85, icon: 'logo-javascript' },
    { name: 'Angular', level: 80, icon: 'logo-angular' },
    { name: 'Node.js', level: 75, icon: 'server-outline' },
    { name: 'UI/UX Design', level: 85, icon: 'color-palette-outline' },
    { name: 'Ionic Framework', level: 75, icon: 'logo-ionic' }
  ];

  galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: '/assets/portofolio.png',
      title: 'Beranda Utama',
      description: 'Menu Beranda Utama dari Web Portofolio saya'
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
      src: '/assets/admin.png',
      title: 'Menu Karir Administrasi',
      description: 'Tampilan menu dari perjalanan karir administrasi saya'
    },
    {
      id: 5,
      src: '/assets/permo.png',
      title: 'Menu Project Permo',
      description: 'Tampilan menu dari project Pertanian Mobile (Permo) saya'
    },
    {
      id: 6,
      src: '/assets/menuAplikasir.png',
      title: 'Menu Project ApliKasir',
      description: 'Tampilan menu dari project ApliKasir saya yang berkolaborasi dengan tim'
    },
    {
      id: 7,
      src: '/assets/sosial.png',
      title: 'Halaman Pengalaman Relawan',
      description: 'Tampilan menu dari pengalaman pribadi di kerelawanan'
    },
    {
      id: 8,
      src: '/assets/it.png',
      title: 'Halaman Pengalaman IT Support',
      description: 'Tampilan menu dari pengalaman pribadi sebagai IT Support'
    }
  ];

  selectedImage: GalleryItem | null = null;
  isModalOpen: boolean = false;

  private backButtonSubscription!: Subscription;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private router: Router
  ) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      /* Check if modal is open */
      if (this.isModalOpen) {
        this.closeModal();
      } else {
        /* Navigate back to tab1 */
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    /* Clean up the subscription when the component is destroyed */
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
  }

  openImageModal(image: GalleryItem) {
    this.selectedImage = image;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;

    /* Navigate back to the tab3 page */
    this.router.navigateByUrl('/portofolio');
  }
}