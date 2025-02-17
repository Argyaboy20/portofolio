import { Component } from '@angular/core';

interface ProjectImage {
  url: string;
  caption: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  projectImages: ProjectImage[] = [
    {
      url: '/assets/halamanutama.png',
      caption: 'Tampilan Halaman Depan'
    },
    {
      url: '/assets/daftar.png',
      caption: 'Tampilan Menu Daftar'
    },
    {
      url: '/assets/login.png',
      caption: 'Tampilan Menu Masuk'
    },
    {
      url: '/assets/dashboard.png',
      caption: 'Tampilan Dashboard'
    },
    {
      url: '/assets/setting.png',
      caption: 'Tampilan Pengaturan'
    },
    {
      url: '/assets/informasi.png',
      caption: 'Tampilan Menu Informasi Akun'
    },
    {
      url: '/assets/kamus.png',
      caption: 'Tampilan Menu Kamus Permo'
    },
    {
      url: '/assets/ilmutanah.png',
      caption: 'Tampilan Menu Ilmu Tanah'
    },
    {
      url: '/assets/prediksi.png',
      caption: 'Tampilan Menu Prediksi Cuaca'
    }
  ];

  projectUrl: string = 'https://your-project-url.com';
  isImageModalOpen = false;
  selectedImage: ProjectImage | null = null;

  constructor() {}

  openImageModal(image: ProjectImage) {
    this.selectedImage = image;
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
    this.selectedImage = null;
  }
}