import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface PhotoItem {
  id: number;
  category: 'cerita-hidup' | 'pmm-life';
  imageUrl: string;
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-galeri-kehidupan',
  templateUrl: './galeri-kehidupan.page.html',
  styleUrls: ['./galeri-kehidupan.page.scss'],
  standalone: false,
})
export class GaleriKehidupanPage implements OnInit {
  selectedCategory: 'cerita-hidup' | 'pmm-life' = 'cerita-hidup';
  selectedPhoto: PhotoItem | null = null;
  
  photos: PhotoItem[] = [
    {
      id: 1,
      category: 'cerita-hidup',
      imageUrl: 'assets/kerja.jpg',
      title: 'Dunia kerja',
      description: 'Pertama kali masuk ke dunia kerja yang penuh makna dan kenangan',
      date: '14 Juli 2022'
    },
    {
      id: 2,
      category: 'cerita-hidup',
      imageUrl: 'assets/bersamaRektor.jpg',
      title: 'Momen Berharga',
      description: 'Bersama Bapak Rektor kampus ITBI sewaktu penyerahan hadiah atas keaktifan dalam seminar Internasional.',
      date: '18 Februari 2023'
    },
    {
      id: 5,
      category: 'cerita-hidup',
      imageUrl: 'assets/pilmapres.jpg',
      title: 'Momen Berharga',
      description: 'Dengan rekan rekan hebat dan ambisius dari berbagai kampus dalam Pilmapres 2023.',
      date: '2 Mei 2023'
    },
    {
      id: 6,
      category: 'cerita-hidup',
      imageUrl: 'assets/robotikSMA.jpg',
      title: 'Dunia Mengajar',
      description: 'Mengajarkan kepada adik adik SMA dalam pembuatan robot pengikut garis (ichibot).',
      date: '23 Juni 2023'
    },
    {
      id: 7,
      category: 'cerita-hidup',
      imageUrl: 'assets/kontesRobotik.JPG',
      title: 'Panitia Robotik',
      description: 'Menjadi panitia dalam kontes robotik line follower untuk adik adik SMA yang sudah dibekali ilmu',
      date: '12 Oktober 2023'
    },
    {
      id: 3,
      category: 'pmm-life',
      imageUrl: 'assets/images/pmm1.jpg',
      title: 'PMM Adventure',
      description: 'Petualangan seru bersama tim PMM.',
      date: '1 Feb 2024'
    },
    {
      id: 4,
      category: 'pmm-life',
      imageUrl: 'assets/images/pmm2.jpg',
      title: 'PMM Project',
      description: 'Proyek inovatif yang mengubah komunitas.',
      date: '10 Feb 2024'
    }
  ];

  constructor() { }

  ngOnInit() { }

  getFilteredPhotos() {
    return this.photos.filter(photo => photo.category === this.selectedCategory);
  }

  selectPhoto(photo: PhotoItem) {
    this.selectedPhoto = photo;
  }
}