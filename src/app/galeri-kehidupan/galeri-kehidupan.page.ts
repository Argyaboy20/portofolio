import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface PhotoItem {
  id: number;
  category: 'cerita-hidup' | 'pmm-life';
  imageUrl: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  date: string;
  loaded?: boolean;
  cached?: boolean;
}

@Component({
  selector: 'app-galeri-kehidupan',
  templateUrl: './galeri-kehidupan.page.html',
  styleUrls: ['./galeri-kehidupan.page.scss'],
  standalone: false,
})
export class GaleriKehidupanPage implements OnInit, OnDestroy {
  selectedCategory: 'cerita-hidup' | 'pmm-life' = 'cerita-hidup';
  selectedPhoto: PhotoItem | null = null;
  audio: HTMLAudioElement;
  isPlaying: boolean = false;
  filteredPhotos: PhotoItem[] = [];

  /* Cache system */
  private imageCache: Map<string, string> = new Map();
  private loadingImages: Map<string, boolean> = new Map();
  private observerAttached: boolean = false;
  private imageObserver: IntersectionObserver | null = null;

  private backButtonSubscription!: Subscription;

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
      imageUrl: 'assets/seminarmicrocontroller.jpg',
      title: 'Seminar Microcontroller',
      description: 'Mengikuti seminar nasional dari kampus pertama kali dan mendapatkan hadiah dari aktif selama seminar berlangsung',
      date: '21 Desember 2022'
    },
    {
      id: 3,
      category: 'cerita-hidup',
      imageUrl: 'assets/bersamaRektor.jpg',
      title: 'Momen Berharga',
      description: 'Bersama Bapak Rektor kampus ITBI sewaktu penyerahan hadiah atas keaktifan dalam seminar Internasional.',
      date: '18 Februari 2023'
    },
    {
      id: 4,
      category: 'cerita-hidup',
      imageUrl: 'assets/pilmapres.jpg',
      title: 'Pilmapres 2023',
      description: 'Dengan rekan rekan hebat dan ambisius dari berbagai kampus dalam Pilmapres 2023 sebagai utusan dari kampus ITBI.',
      date: '2 Mei 2023'
    },
    {
      id: 5,
      category: 'cerita-hidup',
      imageUrl: 'assets/robotikSMA.jpg',
      title: 'Dunia Mengajar',
      description: 'Mengajarkan kepada adik adik SMA dalam pembuatan robot pengikut garis (ichibot).',
      date: '23 Juni 2023'
    },
    {
      id: 6,
      category: 'cerita-hidup',
      imageUrl: 'assets/kontesRobotik.JPG',
      title: 'Panitia Robotik',
      description: 'Menjadi panitia dalam kontes robotik line follower untuk adik adik SMA yang sudah dibekali ilmu',
      date: '12 Oktober 2023'
    },
    {
      id: 7,
      category: 'cerita-hidup',
      imageUrl: 'assets/berangkatPMM.jpg',
      title: 'Acara Pelepasan',
      description: 'Diadakan acara pelepasan bagi yang mengikuti program Kampus Merdeka (flagship) dari pemerintah',
      date: '31 Januari 2024'
    },
    {
      id: 8,
      category: 'cerita-hidup',
      imageUrl: 'assets/kepergian.jpg',
      title: 'Jadwal Kepergian ke Telkom',
      description: 'Menunggu jadwal keberangkatan ke kampus Telkom untuk mengikuti program Kampus Merdeka (flagship) dari pemerintah',
      date: '16 Februari 2024'
    },
    {
      id: 9,
      category: 'cerita-hidup',
      imageUrl: 'assets/seminarkepenulisan.jpg',
      title: 'Seminar Kepenulisan Artikel Ilmiah',
      description: 'Diadakan seminar tentang membahas tuntas cara menulis artikel ilmiah dengan baik dan benar',
      date: '18 Juni 2025'
    },
    {
      id: 10,
      category: 'cerita-hidup',
      imageUrl: 'assets/sempro.JPG',
      title: 'Seminar Proposal',
      description: 'Mempresentasikan judul penelitian yang akan dilakukan untuk skripsi dan mendapatkan masukan dari dosen pembimbing',
      date: '30 Mei 2026'
    },
    {
      id: 11,
      category: 'cerita-hidup',
      imageUrl: 'assets/semhas.JPG',
      title: 'Seminar Hasil',
      description: 'Mempresentasikan hasil penelitian yang telah dilakukan dan mendapatkan masukan dari dosen pembimbing',
      date: '31 Agustus 2026'
    },
    {
      id: 12,
      category: 'cerita-hidup',
      imageUrl: 'assets/bersamawaka1.jpg',
      title: 'Foto Bersama Waka 1',
      description: 'Foto bersama Wakil Rektor 1 kampus ITBI sewaktu seminar hasil penelitian skripsi',
      date: '31 Agustus 2026'
    },
    {
      id: 13,
      category: 'cerita-hidup',
      imageUrl: 'assets/waktusidang.jpg',
      title: 'Officially Graduate (S.Kom)',
      description: 'Foto bersama teman sewaktu sidang skripsi dan resmi lulus dari kampus ITBI',
      date: '10 September 2026'
    },
    {
      id: 14,
      category: 'pmm-life',
      imageUrl: 'assets/pmm4.jpg',
      title: 'PMM Beginning',
      description: 'Foto bareng pertama kali sewaktu PMM.',
      date: '17 Feb 2024'
    },
    {
      id: 15,
      category: 'pmm-life',
      imageUrl: 'assets/mnB.jpg',
      title: 'Acara Penerimaan Mahasiswa PMM 4',
      description: 'Foto bareng dengan grup MN B Sasalimpetan.',
      date: '19 Feb 2024'
    },
    {
      id: 16,
      category: 'pmm-life',
      imageUrl: 'assets/amazingrace.JPG',
      title: 'Refleksi 1 - Amazing Race',
      description: 'Foto dari acara Amazing Race yang diadakan oleh PMM.',
      date: '23 Feb 2024'
    },
    {
      id: 17,
      category: 'pmm-life',
      imageUrl: 'assets/gedungSate.JPG',
      title: 'Kebhinekaan 1 - Sampurasun Bandung',
      description: 'Modnus pertama ke Gedung Sate untuk memperkenalkan cagar budaya kota Bandung.',
      date: '24 Feb 2024'
    },
    {
      id: 18,
      category: 'pmm-life',
      imageUrl: 'assets/modnus2.JPG',
      title: 'Inspirasi 1 - TFT 2024',
      description: 'Modnus ketika mengikuti TFT 2024 bertajuk belajar bahasa isyarat.',
      date: '3 Maret 2024'
    },
    {
      id: 19,
      category: 'pmm-life',
      imageUrl: 'assets/modnus3.jpg',
      title: 'Kebhinekaan 2 - Kaulinan Barudak',
      description: 'Bermain permainan tradisional bersama teman-teman sebagai bounding.',
      date: '8 Maret 2024'
    },
    {
      id: 20,
      category: 'pmm-life',
      imageUrl: 'assets/nontonfilmsunda.jpg',
      title: 'Refleksi 2 - Nonton Film Sunda',
      description: 'Menonton film tradisional Sunda bersama teman-teman.',
      date: '15 Maret 2024'
    },
    {
      id: 21,
      category: 'pmm-life',
      imageUrl: 'assets/modnus4.jpg',
      title: 'Kebhinekaan 3 - Workshop alat musik sunda',
      description: 'Diperkenalkan suling sunda sebagai warisan budaya alat musik tradisional.',
      date: '23 Maret 2024'
    },
    {
      id: 22,
      category: 'pmm-life',
      imageUrl: 'assets/urbanlegend.jpg',
      title: 'Kebhinekaan 4 - Urban Legend',
      description: 'Kisah misteri dan legenda kota yang menarik perhatian banyak orang.',
      date: '28 Maret 2024'
    },
    {
      id: 23,
      category: 'pmm-life',
      imageUrl: 'assets/bandros.JPG',
      title: 'Kebhinekaan 5 - Bandros Tour',
      description: 'Perjalanan keliling kota bandung dengan Bandros.',
      date: '19 April 2024'
    },
    {
      id: 24,
      category: 'pmm-life',
      imageUrl: 'assets/wayangangklung.jpg',
      title: 'Kebhinekaan 6 - Wayang Angklung',
      description: 'Perkenalan dengan seni wayang angklung sebagai warisan budaya.',
      date: '27 April 2024'
    },
    {
      id: 25,
      category: 'pmm-life',
      imageUrl: 'assets/tahura.jpg',
      title: 'Kebhinekaan 7 - Tahura',
      description: 'Jalan-jalan ke lokasi wisata Tahura.',
      date: '2 Mei 2024'
    },
    {
      id: 26,
      category: 'pmm-life',
      imageUrl: 'assets/camping.JPG',
      title: 'Kebhinekaan 8 - Camping',
      description: 'Berlibur di alam bebas dengan aktivitas camping.',
      date: '17 Mei 2024'
    },
    {
      id: 27,
      category: 'pmm-life',
      imageUrl: 'assets/camping-refleksi.JPG',
      title: 'Refleksi 3 - Camping',
      description: 'Refleksi tentang pengalaman camping yang menyenangkan.',
      date: '17 Mei 2024'
    },
    {
      id: 28,
      category: 'pmm-life',
      imageUrl: 'assets/inspirasi2.JPG',
      title: 'Inspirasi 2 - Public Speaking',
      description: 'Mempelajari teknik-teknik public speaking yang efektif.',
      date: '4 Juni 2024'
    },
    {
      id: 29,
      category: 'pmm-life',
      imageUrl: 'assets/refleksi4.jpg',
      title: 'Refleksi 4 - Public Speaking',
      description: 'Refleksi tentang pengalaman belajar public speaking.',
      date: '4 Juni 2024'
    },
    {
      id: 30,
      category: 'pmm-life',
      imageUrl: 'assets/kontribusisosial.JPG',
      title: 'Kontribusi Sosial - Wahana Nusantara',
      description: 'Kegiatan kontribusi sosial di PPSGHD Jawa Barat.',
      date: '10 Juni 2024'
    },
    {
      id: 31,
      category: 'pmm-life',
      imageUrl: 'assets/refleksi5.jpg',
      title: 'Refleksi 5 - Knowing Yourself',
      description: 'Refleksi tentang pemahaman diri sendiri.',
      date: '12 Juni 2024'
    },
    {
      id: 32,
      category: 'pmm-life',
      imageUrl: 'assets/pelepasan.jpg',
      title: 'Pelepasan PMM 4',
      description: 'Foto kegiatan pelepasan PMM 4.',
      date: '20 Juni 2024'
    },
    {
      id: 33,
      category: 'pmm-life',
      imageUrl: 'assets/bandara.jpg',
      title: 'Kepulangan PMM 4',
      description: 'Foto kegiatan kepulangan PMM 4 di bandara Soekarno-Hatta.',
      date: '24 Juni 2024'
    },
  ];

  constructor(
    private platform: Platform,
    private zone: NgZone,
    private router: Router
  ) {
    this.audio = new Audio('assets/audio/photograph.mp3');
    this.audio.loop = true;

    /* Preload audio */
    this.audio.preload = 'none';

    /* Inisialisasi cache dari localStorage jika ada */
    this.initializeCache();
  }

  ngOnInit() {
    /* Initialize filtered photos immediately */
    this.updateFilteredPhotos();

    /* Defer image loading for better initial performance */
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        this.preloadImages();
      });
    } else {
      setTimeout(() => {
        this.preloadImages();
      }, 2000);
    }

     /* Tambahkan subscription untuk backbutton */
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      /* Navigasi kembali ke halaman biodata */
      this.router.navigate(['/biodata']);
    });

     /* Setup Intersection Observer for lazy loading */
     this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    /* Bersihkan subscription saat komponen dihancurkan */
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }

    /* Clean up observer */
    if (this.imageObserver) {
      this.imageObserver.disconnect();
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      /* Use promise to handle play() properly */
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
        });
      }
    }
    this.isPlaying = !this.isPlaying;
  }

  updateFilteredPhotos() {
    /* Dapatkan elemen grid foto */
    const photoGrid = document.querySelector('.photo-grid');
    
    /* Tambahkan kelas untuk animasi fade out */
    if (photoGrid) {
      photoGrid.classList.add('grid-fade-out');
    }
    
    /* Tunggu animasi fade out selesai sebelum mengubah data */
    setTimeout(() => {
      /* Use NgZone to ensure UI updates properly */
      this.zone.run(() => {
        this.filteredPhotos = this.photos.filter(photo => photo.category === this.selectedCategory);
        
        /* Setelah data diperbarui, tambahkan animasi fade in */
        setTimeout(() => {
          if (photoGrid) {
            photoGrid.classList.remove('grid-fade-out');
            photoGrid.classList.add('grid-fade-in');
            
            /* Reset kelas animasi setelah transisi selesai */
            setTimeout(() => {
              if (photoGrid) {
                photoGrid.classList.remove('grid-fade-in');
              }
            }, 500);
          }
        }, 50);
      });
    }, 200); /* Waktu untuk animasi fade out */
  }

  selectPhoto(photo: PhotoItem) {
    /* Ensure the full resolution image is loaded before showing */
    this.loadFullImage(photo).then(() => {
      this.selectedPhoto = photo;
      /* Navigate back to the galeri page */
      this.router.navigateByUrl('/galeri-kehidupan');
    });
  }

  /* Preload images in background for smoother experience */
  private preloadImages() {
    /* Only preload visible category images first */
    const initialPhotos = this.filteredPhotos.slice(0, 4);

    initialPhotos.forEach(photo => {
      this.loadFullImage(photo);
    });
  }
  
   /* Initialize cache from localStorage */
   private initializeCache() {
    try {
      const cachedImages = localStorage.getItem('galeriImageCache');
      if (cachedImages) {
        this.imageCache = new Map(JSON.parse(cachedImages));
        
        /* Mark cached photos */
        this.photos.forEach(photo => {
          if (this.imageCache.has(photo.imageUrl)) {
            photo.cached = true;
          }
        });
      }
    } catch (error) {
      /* Reset cache if corrupted */
      this.imageCache = new Map();
      localStorage.removeItem('galeriImageCache');
    }
  }
  
  /* Save cache to localStorage */
  private saveCache() {
    try {
      localStorage.setItem('galeriImageCache', 
        JSON.stringify(Array.from(this.imageCache.entries())));
    } catch (error: any) { 
      /* If storage is full, clear it and try again */
      if (error.name === 'QuotaExceededError') {
        localStorage.clear();
        try {
          localStorage.setItem('galeriImageCache', 
            JSON.stringify(Array.from(this.imageCache.entries())));
        } catch (e) {
          console.error('Failed to save cache even after clearing storage:', e);
        }
      }
    }
  }
  
  /* Create and setup intersection observer for lazy loading */
  private setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const imgElement = entry.target as HTMLImageElement;
            const photoId = imgElement.dataset['photoId'];
            
            if (photoId) {
              const photo = this.photos.find(p => p.id === Number(photoId));
              if (photo) {
                this.loadFullImage(photo).then(() => {
                  imgElement.src = photo.imageUrl;
                  imgElement.classList.add('loaded');
                  observer.unobserve(imgElement);
                });
              }
            }
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      });
    }
  }
  
  /* Load full image with caching */
  private loadFullImage(photo: PhotoItem): Promise<void> {
    return new Promise((resolve) => {
      /* Skip if already loaded or being loaded */
      if (photo.loaded || this.loadingImages.get(photo.imageUrl)) {
        resolve();
        return;
      }
      
      /* Mark as loading */
      this.loadingImages.set(photo.imageUrl, true);
      
      /* Check if image is in cache */
      if (this.imageCache.has(photo.imageUrl)) {
        photo.loaded = true;
        photo.cached = true;
        this.loadingImages.set(photo.imageUrl, false);
        resolve();
        return;
      }
      
      /* Load the image */
      const img = new Image();
      
      img.onload = () => {
        photo.loaded = true;
        photo.cached = true;
        
        /* Add to cache */
        this.cacheImage(photo.imageUrl);
        
        this.loadingImages.set(photo.imageUrl, false);
        resolve();
      };
      
      img.onerror = () => {
        this.loadingImages.set(photo.imageUrl, false);
        resolve();
      };
      
      img.src = photo.imageUrl;
    });
  }
  
  /* Cache image URL in memory and localStorage */
  private cacheImage(imageUrl: string): void {
    /* Add to memory cache */
    this.imageCache.set(imageUrl, imageUrl);
    
    /* Maintain cache size (max 30 images) */
    if (this.imageCache.size > 30) {
      const oldestKey = Array.from(this.imageCache.keys())[0];
      this.imageCache.delete(oldestKey);
    }
    
    /* Update localStorage periodically instead of on every image */
    /* to reduce performance impact* */
    if (this.imageCache.size % 5 === 0) {
      this.saveCache();
    }
  }
  
  /* Public method to clear the cache (can be called from template if needed) */
  clearImageCache() {
    this.imageCache = new Map();
    localStorage.removeItem('galeriImageCache');
    
    /* Reset loaded status */
    this.photos.forEach(photo => {
      photo.loaded = false;
      photo.cached = false;
    });
  }
}