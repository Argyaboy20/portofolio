import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-providers';

// Define types for our translations
type Language = 'id' | 'en';

interface TranslationKeys {
  heroTitle: string;
  heroSubtitle: string;
  journey: string;
  currentRole: string;
  currentDesc: string;
  webRole: string;
  webDesc: string;
  education: string;
  eduDesc: string;
  hobbiesTitle: string;
  codingDesc: string;
  gamingDesc: string;
  musicDesc: string;
  exerciseDesc: string;
  quickFacts: string;
  projectsCompleted: string;
  yearsCoding: string;
  techStacks: string;
  coffeeCups: string;
  snapshots: string;
  connect: string;
  nameLabel: string;
  messageLabel: string;
  sendButton: string;
  otherWays: string;
  stackOverflowProfile: string;
  quoraProfile: string;
  awardsTitle: string;
}

interface Translations {
  id: TranslationKeys;
  en: TranslationKeys;
}

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.page.html',
  styleUrls: ['./biodata.page.scss'],
  standalone: false,
})
export class BiodataPage implements OnInit, AfterViewInit {
  isAwardsModalOpen = false;
  awards = [
    {
      image: '/assets/bestPerfomance.jpg',
      title: 'Best Perfomance Intern of The Month (October)',
      description: 'Fully contributes to the team at work.'
    },
    {
      image: '/assets/batch4.jpg',
      title: 'PMM Batch 4 2024',
      description: 'Conducted an independent student exchange to Telkom University.'
    },
  ];

  // Tambahkan getter untuk menghitung jumlah awards
  get awardsCount(): string {
    return `+${this.awards.length}`;
  }

  // Add these methods
  openAwardsModal() {
    this.isAwardsModalOpen = true;
  }

  closeAwardsModal() {
    this.isAwardsModalOpen = false;
  }

  isGalleryModalOpen = false;
  currentGalleryImage = '';
  currentLanguage: Language = 'id'; // Default language is Indonesian
  formData = {
    nama: '',
    email: '',
    pesan: ''
  };

  ngAfterViewInit() {
    this.initSectionAnimations();
  }

  private initSectionAnimations() {
    const sections = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px', // Memberikan margin untuk trigger yang lebih tepat
      threshold: [0, 0.2] // Menambahkan multiple thresholds
    };
  
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // Mendapatkan arah scroll
        const boundingRect = entry.boundingClientRect;
        const scrollingDown = boundingRect.top < 0;
  
        if (entry.isIntersecting) {
          // Element masuk viewport
          entry.target.classList.add('animate');
          entry.target.classList.remove('animate-out');
        } else {
          // Element keluar viewport
          if (scrollingDown) {
            // Scroll ke bawah, tidak perlu animasi fade out
            entry.target.classList.remove('animate');
          } else {
            // Scroll ke atas, tambahkan animasi fade out
            entry.target.classList.add('animate-out');
            entry.target.classList.remove('animate');
            
            // Hapus class animate-out setelah animasi selesai
            entry.target.addEventListener('animationend', () => {
              if (!entry.isIntersecting) {
                entry.target.classList.remove('animate-out');
              }
            }, { once: true });
          }
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // Translation objects
  translations: Translations = {
    id: {
      heroTitle: "Halo, Saya",
      heroSubtitle: "Pengembang yang Berdedikasi & Penggemar Teknologi",
      journey: "Perjalananku",
      currentRole: "Mobile App Developer",
      currentDesc: "Mengembangkan aplikasi hybrid dengan Ionic Framework, membangun UI/UX yang menarik dan responsif untuk berbagai klien. Mengoptimalkan performa aplikasi dan implementasi fitur-fitur inovatif.",
      webRole: "Web Developer",
      webDesc: "Memulai karir sebagai front-end developer dengan fokus pada framework Angular. Bekerja dalam tim untuk membangun aplikasi web yang interaktif dan modern.",
      education: "Institut Teknologi dan Bisnis Indonesia",
      eduDesc: "Menempuh pendidikan S1 dengan IPK 3.73. Aktif mencoba semua lomba dan hal hal baru. Mengembangkan project-project inovatif selama masa kuliah.",
      hobbiesTitle: "Hobby dan Ketertarikan",
      codingDesc: "Menghabiskan waktu luang untuk eksplorasi teknologi baru dan mengerjakan side projects.",
      gamingDesc: "Menikmati game sepakbola untuk relaksasi dan mengasah kemampuan problem-solving.",
      musicDesc: "Mendengarkan musik pop dan country sambil coding atau traveling.",
      exerciseDesc: "Berolahraga dengan mandiri untuk menjaga kebugaran jasmani di saat weekend.",
      quickFacts: "Fakta Singkat",
      projectsCompleted: "Proyek Selesai",
      yearsCoding: "Tahun Coding",
      techStacks: "Tech Stack",
      coffeeCups: "Cangkir Kopi",
      snapshots: "Potret Kehidupan",
      connect: "Mari Terhubung",
      nameLabel: "Nama Anda",
      messageLabel: "Pesan Anda",
      sendButton: "Kirim Pesan",
      otherWays: "Platform Diskusi Saya",
      stackOverflowProfile: "Profil Stack Overflow",
      quoraProfile: "Profil Quora",
      awardsTitle: "Penghargaan",
    },
    en: {
      heroTitle: "Hello, I'm",
      heroSubtitle: "Passion-driven Developer & Tech Enthusiast",
      journey: "My Journey",
      currentRole: "Mobile App Developer",
      currentDesc: "Developing hybrid applications with Ionic Framework, building attractive and responsive UI/UX for various clients. Optimizing application performance and implementing innovative features.",
      webRole: "Web Developer",
      webDesc: "Started career as a front-end developer focusing on Angular framework. Working in teams to build interactive and modern web applications.",
      education: "Indonesia Institute of Technology and Business",
      eduDesc: "Pursuing Bachelor's degree with 3.73 GPA. Actively participating in competitions and exploring new opportunities. Developing innovative projects during college years.",
      hobbiesTitle: "Hobbies & Interests",
      codingDesc: "Spending free time exploring new technologies and working on side projects.",
      gamingDesc: "Enjoying football games for relaxation and improving problem-solving skills.",
      musicDesc: "Listening to pop and country music while coding or traveling.",
      exerciseDesc: "Exercising independently to maintain physical fitness on weekends.",
      quickFacts: "Quick Facts",
      projectsCompleted: "Projects Completed",
      yearsCoding: "Years Coding",
      techStacks: "Tech Stacks",
      coffeeCups: "Coffee Cups",
      snapshots: "Life Snapshots",
      connect: "Let's Connect",
      nameLabel: "Your Name",
      messageLabel: "Your Message",
      sendButton: "Send Message",
      otherWays: "My Discussion Platforms",
      stackOverflowProfile: "Stack Overflow Profile",
      quoraProfile: "Quora Profile",
      awardsTitle: "Awards & Achievements",
    }
  };

  constructor(
    private postProvider: PostProvider,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
  }

  getText(key: keyof TranslationKeys): string {
    return this.translations[this.currentLanguage][key];
  }

  openGalleryModal(imageSrc: string) {
    this.currentGalleryImage = imageSrc;
    this.isGalleryModalOpen = true;
  }

  closeGalleryModal() {
    this.isGalleryModalOpen = false;
  }

  async submitForm() {
    if (!this.formData.nama || !this.formData.email || !this.formData.pesan) {
      await this.presentToast('Tolong isi semua data yang dibutuhkan', 'warning');
      return;
    }

    const data = {
      aksi: 'add_connect',
      nama: this.formData.nama,
      email: this.formData.email,
      pesan: this.formData.pesan
    };

    this.postProvider.postData(data, 'koneksi.php').subscribe({
      next: async (response: any) => {
        if (response.success) {
          await this.presentToast('Pesan berhasil terkirim!', 'success');
          this.formData = { nama: '', email: '', pesan: '' };
        } else {
          await this.presentToast(response.message || 'Pesan gagal terkirim', 'danger');
        }
      },
      error: async (error) => {
        console.error('Error:', error);
        await this.presentToast(error.message || 'Terjadi kesalahan pada server', 'danger');
      }
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}