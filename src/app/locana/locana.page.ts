import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locana',
  templateUrl: './locana.page.html',
  styleUrls: ['./locana.page.scss'],
  standalone: false,
})
export class LocanaPage implements OnInit {
  /* Language settings */
  currentLanguage: 'id' | 'en' = 'id'; // Default language is Indonesian

  /* Modal control */
  isImageModalOpen: boolean = false;
  selectedImage: any = null;

  /* Project URLs */
  projectUrl: string = 'https://locana-74f96.web.app/';
  androidUrl: string = 'https://play.google.com/store/apps/details?id=com.example.locana';

  /* Translations for multilingual support */
  translations = {
    id: {
      locanaTitle: 'Locana - Pelacakan Lokasi Realtime',
      locanaDescription: 'Solusi pelacakan lokasi akurat melalui sinyal nomor telepon',
      galleryTitle: 'Galeri Fitur',
      toolsTitle: 'Alat Pengembangan',
      readyToExperience: 'Siap Mencoba Locana?',
      tryOutMessage: 'Jelajahi aplikasi pelacakan kami sekarang dan ketahui lokasi dengan presisi tinggi',
      launchWebsite: 'Buka Website',
      launchAndroid: 'Unduh Aplikasi',
      detailsTitle: 'Detail Fitur',
      featuresTitle: 'Fitur Unggulan'
    },
    en: {
      locanaTitle: 'Locana - Realtime Location Tracking',
      locanaDescription: 'Accurate location tracking solution via phone number signals',
      galleryTitle: 'Feature Gallery',
      toolsTitle: 'Development Tools',
      readyToExperience: 'Ready to Try Locana?',
      tryOutMessage: 'Explore our tracking application now and discover locations with high precision',
      launchWebsite: 'Launch Website',
      launchAndroid: 'Download App',
      detailsTitle: 'Feature Details',
      featuresTitle: 'Key Features'
    }
  };

  /* Gallery images with descriptions */
  locanaImages = [
    {
      url: 'assets/pelacaknomor.jpg', 
      title: 'Dashboard Pelacak Nomor',
      brief: 'Sistem pencarian dan pelacakan nomor',
      caption: 'Pelacak Nomor Locana',
      description: 'Sistem pelacakan nomor telepon dengan teknologi triangulasi sinyal seluler tingkat lanjut. Mendukung pelacakan multi-provider dengan presisi lokasi hingga 5 meter.',
      features: [
        'Input nomor dengan validasi otomatis',
        'Dukungan semua provider seluler utama',
        'Verifikasi status aktif nomor'
      ]
    },
    {
      url: 'assets/locana2.jpg', 
      title: 'Peta Interaktif',
      brief: 'Visualisasi lokasi dengan detail',
      caption: 'Peta Interaktif Locana',
      description: 'Tampilan peta interaktif dengan dukungan berbagai jenis peta (satelit, terrain, street view). Dilengkapi dengan kemampuan zoom hingga level jalan dan landmark penting di sekitar target.',
      features: [
        'Beberapa jenis tampilan peta',
        'Zoom hingga level jalan',
        'Marker dengan informasi kontekstual'
      ]
    },
    {
      url: 'assets/locana2.jpg', 
      title: 'Sistem Geofence',
      brief: 'Notifikasi otomatis batas wilayah',
      caption: 'Sistem Geofence Locana',
      description: 'Fitur geofence yang memungkinkan pengguna menetapkan batas wilayah virtual. Sistem akan memberikan notifikasi saat target memasuki atau meninggalkan area yang sudah ditentukan.',
      features: [
        'Pembuatan area geofence khusus',
        'Notifikasi masuk/keluar area',
        'Riwayat pelanggaran batas wilayah'
      ]
    },
    {
      url: 'assets/riwayat.jpg', 
      title: 'Histori Pelacakan',
      brief: 'Riwayat lokasi dengan timeline',
      caption: 'Histori Pelacakan Locana',
      description: 'Sistem histori pelacakan dengan timeline interaktif yang menampilkan riwayat pergerakan. Pengguna dapat memutar ulang pergerakan target dengan visualisasi animasi pada peta.',
      features: [
        'Timeline interaktif pergerakan',
        'Riwayat Pelacakan yang dilakukan User'
      ]
    },
    {
      url: 'assets/izin akses.jpg', 
      title: 'Pengaturan Privasi',
      brief: 'Kontrol keamanan data pelacakan',
      caption: 'Pengaturan Privasi Locana',
      description: 'Panel pengaturan privasi dan keamanan yang komprehensif, memungkinkan pengguna mengontrol data pelacakan, mengatur izin akses, dan mengelola log aktivitas sistem dengan aman.',
      features: [
        'Kontrol izin akses pelacakan',
        'Enkripsi data end-to-end',
        'Penghapusan otomatis data lama'
      ]
    }
  ];

  /* Development tools with icons and descriptions */
  developmentTools = [
    {
      name: 'Angular',
      icon: 'logo-angular',
      description: 'Framework untuk membangun antarmuka pelacakan yang responsif dan reaktif'
    },
    {
      name: 'Ionic',
      icon: 'logo-ionic',
      description: 'Framework UI untuk aplikasi pelacakan mobile dengan kemampuan GPS native'
    },
    {
      name: 'Leaflet',
      icon: 'map-outline',
      description: 'Library peta JavaScript untuk visualisasi lokasi dengan kustomisasi tingkat tinggi'
    },
    {
      name: 'Firebase',
      icon: 'logo-firebase',
      description: 'Platform backend untuk pelacakan realtime dan penyimpanan data lokasi'
    },
    {
      name: 'WebSocket',
      icon: 'pulse-outline',
      description: 'Protokol koneksi untuk pembaruan lokasi secara instan tanpa delay'
    },
    {
      name: 'Node.js',
      icon: 'server-outline',
      description: 'Backend untuk memproses data sinyal seluler dan triangulasi posisi'
    }
  ];

  constructor() { }

  ngOnInit() {
    /* Initialize component */
    this.detectPreferredLanguage();
  }

  /**
   * Detect user's preferred language based on browser settings
   */
  detectPreferredLanguage() {
    /* Get browser language preference if available */
    const browserLang = navigator.language;
    if (browserLang && browserLang.toLowerCase().includes('id')) {
      this.currentLanguage = 'id';
    } else {
      this.currentLanguage = 'en';
    }
  }

  /**
   * Toggle between Indonesian and English languages
   */
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
  }

  /**
   * Open image modal with selected image details
   * @param image - The image object to display in modal
   */
  openImageModal(image: any) {
    this.selectedImage = image;
    this.isImageModalOpen = true;
  }

  /**
   * Close the image modal
   */
  closeImageModal() {
    this.isImageModalOpen = false;
    setTimeout(() => {
      this.selectedImage = null;
    }, 300); // Reset after animation completes
  }
}