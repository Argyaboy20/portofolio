import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { inject } from "@vercel/analytics"


inject();

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
      imageUrl: 'assets/pmm4.jpg',
      title: 'PMM Beginning',
      description: 'Foto bareng pertama kali sewaktu PMM.',
      date: '17 Feb 2024'
    },
    {
      id: 4,
      category: 'pmm-life',
      imageUrl: 'assets/mnB.jpg',
      title: 'PMM life',
      description: 'Foto bareng grup MN B, Sasalimpetan.',
      date: '19 Feb 2024'
    },
    {
      id: 8,
      category: 'pmm-life',
      imageUrl: 'assets/gedungSate.JPG',
      title: 'Sampurasun Bandung',
      description: 'Modnus pertama ke Gedung Sate',
      date: '24 Feb 2024'
    },
    {
      id: 9,
      category: 'pmm-life',
      imageUrl: 'assets/modnus2.JPG',
      title: 'TFT 2024',
      description: 'Modnus ketika mengikuti TFT 2024 bertajuk belajar bahasa isyarat',
      date: '2 Maret 2024'
    },
    {
      id: 10,
      category: 'pmm-life',
      imageUrl: 'assets/modnus3.jpg',
      title: 'Kaulinan Barudak',
      description: 'Bermain permainan tradisional bersama teman teman.',
      date: '8 Maret 2024'
    },
    {
      id: 11,
      category: 'pmm-life',
      imageUrl: 'assets/modnus4.jpg',
      title: 'Workshop alat musik sunda',
      description: 'Bermain suling sunda.',
      date: '23 Maret 2024'
    },
    {
      id: 12,
      category: 'cerita-hidup',
      imageUrl: 'assets/berangkatPMM.jpg',
      title: 'Acara Pelepasan',
      description: 'Diadakan acara pelepasan bagi yang mengikuti program Kampus Merdeka (flagship) dari pemerintah',
      date: '31 Januari 2024'
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
    this.audio.preload = 'metadata';

    /* Inisialisasi cache dari localStorage jika ada */
    this.initializeCache();
  }

  ngOnInit() {
    /* Initialize filtered photos immediately */
    this.updateFilteredPhotos();

    /* Defer image loading for better initial performance */
    setTimeout(() => {
      this.preloadImages();
    }, 100);

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
          console.log('Audio playback prevented: ', error);
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
      console.error('Error loading image cache:', error);
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
    } catch (error: any) { /* Type assertion untuk error */
      console.error('Error saving image cache:', error);
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
  
  /* Setup lazy loading for all images in the current view */
  private setupLazyLoading() {
    if (!this.imageObserver) return;
    
    setTimeout(() => {
      const imgElements = document.querySelectorAll('.photo-item img[data-photo-id]');
      imgElements.forEach(img => {
        this.imageObserver?.observe(img);
      });
    }, 100);
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
    
    console.log('Image cache cleared');
  }
}