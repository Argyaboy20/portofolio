import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/angular';

interface Project {
  title: string;
  duration: string;
  description: string;
  image: string;
  demoLink: string;
  sourceLink: string;
  startDate: Date;  // For sorting purposes
}

// interface penerjemahan
interface Translations {
  profilSingkat: string;
  aboutContent: string;
  aboutContent2: string;
  keahlian: string;
  projectTerbaru: string;
  terbaru: string;
  terlama: string;
  contactPerson: string;
  viewDemo: string;
  sourceCode: string;
  copyright: string;
  pendidikan: string;
  sarjanaTI: string;
  semester: string;
  achievements: string;
}

interface TranslationDict {
  id: Translations;
  en: Translations;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  currentLanguage: 'id' | 'en' = 'id'; // default to Indonesian
  translations: TranslationDict = {
    id: {
      profilSingkat: 'Profil Singkat',
      aboutContent: 'Seorang Software Engineer yang fokus di pengembangan aplikasi mobile hybrid. Saya memiliki keahlian utama dalam Ionic Framework yang saya kombinasikan dengan JavaScript dan HTML untuk membuat aplikasi-aplikasi mobile yang bisa digunakan di berbagai platform.',
      aboutContent2: 'Di dunia perkuliahan, saya berhasil mencapai IPK 3.73 yang menunjukkan dedikasi saya dalam bidang akademik. Saya memiliki passion yang besar dalam teknologi dan selalu antusias untuk mempelajari hal-hal baru di dunia IT. Sebagai developer, saya senang mengeksplorasi teknologi-teknologi terbaru dan menerapkannya dalam pengembangan aplikasi. Keahlian saya dalam Ionic Framework memungkinkan saya untuk membuat aplikasi mobile hybrid yang efisien dan berkualitas tinggi.',
      keahlian: 'Keahlian',
      projectTerbaru: 'Project Terbaru',
      terbaru: 'Terbaru',
      terlama: 'Terlama',
      contactPerson: 'Kontak Pribadi',
      viewDemo: 'Lihat Demo',
      sourceCode: 'Source Code',
      copyright: '© 2025 - Hak cipta dilindungi undang-undang, Maulana Farras',
      pendidikan: 'Pendidikan',
      sarjanaTI: 'Rekayasa Perangkat Lunak',
      semester: 'Semester',
      achievements: 'Prestasi'
    },
    en: {
      profilSingkat: 'Brief Profile',
      aboutContent: 'A Software Engineer focusing on hybrid mobile application development. I have expertise in Ionic Framework which I combine with JavaScript and HTML to create cross-platform mobile applications.',
      aboutContent2: 'In my academic journey, I achieved a GPA of 3.73 which demonstrates my dedication to academics. I have a great passion for technology and am always enthusiastic about learning new things in the IT world. As a developer, I enjoy exploring the latest technologies and applying them in application development. My expertise in Ionic Framework enables me to create efficient and high-quality hybrid mobile applications.',
      keahlian: 'Skills',
      projectTerbaru: 'Latest Projects',
      terbaru: 'Newest',
      terlama: 'Oldest',
      contactPerson: 'Contact Person',
      viewDemo: 'View Demo',
      sourceCode: 'Source Code',
      copyright: '© 2025 - All Rights Reserved, Maulana Farras',
      pendidikan: 'Education',
      sarjanaTI: 'Bachelor of Software Engineering',
      semester: 'Semester',
      achievements: 'Achievements'
    }
  };

  projects: Project[] = [
    {
      title: 'Web Portofolio',
      duration: 'Februari 2025 - sekarang',
      description: 'Project ini bertujuan untuk website pribadi sebagai portofolio saya di bidang Software Engineering yang dikembangkan dengan Ionic Framework dan backend berupa MySql',
      image: '/assets/portofolio.png',
      demoLink: '/tabs/tab3',
      sourceLink: 'https://github.com/Argyaboy20/portofolio.git',
      startDate: new Date(2025, 1, 1)  // February 1, 2025
    },
    {
      title: 'Pertanian Mobile App',
      duration: 'November 2024 - Februari 2025',
      description: 'Project ini dikembangkan dengan tujuan sebagai tugas akhir di mata kuliah Pemograman Mobile dan menjawab tantangan di bidang Pertanian saat ini. Dirancang dengan Framework Ionic dengan backend berupa MySql',
      image: '/assets/permo_logo.jpg',
      demoLink: '/tabs/tab2',
      sourceLink: 'https://github.com/Argyaboy20/Permo.git',
      startDate: new Date(2024, 10, 1)  // November 1, 2024
    },
    {
      title: 'ApliKasir',
      duration: 'April - Mei 2024',
      description: 'Dirancang secara berkelompok selama mengikuti Pertukaran Mahasiswa Merdeka batch 4 ke Telkom University. Ditujukan sebagai tugas besar dari mata kuliah KPL dengan bahasa C#. ',
      image: '/assets/apliKasir.png',
      demoLink: '/tabs/tab4',
      sourceLink: 'https://github.com/hshinosa/ApliKasir-UI.git',
      startDate: new Date(2024, 3, 1)  // April 1, 2024
    }
  ];

  // Add this method to your class
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
    this.updateContent();
  }

  updateContent() {
    const t = this.translations[this.currentLanguage];

    // Update all text content
    document.querySelector('#about .section-title')!.textContent = t.profilSingkat;
    document.querySelectorAll('#about .section-content p')[0].textContent = t.aboutContent;
    document.querySelectorAll('#about .section-content p')[1].textContent = t.aboutContent2;
    document.querySelector('#skills .section-title')!.textContent = t.keahlian;
    document.querySelector('#projects .section-title')!.textContent = t.projectTerbaru;
    document.querySelector('.contact-info h3')!.textContent = t.contactPerson;

    // Update education section
    document.querySelector('#education .section-title')!.textContent =
      this.translations[this.currentLanguage].pendidikan;

    const degree = document.querySelector('.degree');
    if (degree) {
      degree.textContent = this.translations[this.currentLanguage].sarjanaTI;
    }

    // Update buttons text
    const sortButtons = document.querySelectorAll('.sort-buttons ion-button');
    sortButtons[0].textContent = t.terbaru;
    sortButtons[1].textContent = t.terlama;

    // Update project cards
    this.projects.forEach((project, index) => {
      const projectCards = document.querySelectorAll('.project-card');
      if (index < projectCards.length) {
        const card = projectCards[index];
        const demoLink = card.querySelector('.demo-link');
        if (demoLink) {
          demoLink.textContent = this.currentLanguage === 'id' ? 'Lihat Demo' : 'View Demo';
        }
        const sourceLink = card.querySelector('a[target="_github"]');
        if (sourceLink) {
          sourceLink.textContent = this.currentLanguage === 'id' ? 'Source Code' : 'Source Code';
        }
      }
    });

    // Update footer
    const footer = document.querySelector('footer p');
    if (footer) {
      footer.textContent = this.currentLanguage === 'id'
        ? '© 2025 - Hak cipta dilindungi undang-undang, Maulana Farras'
        : '© 2025 - All Rights Reserved, Maulana Farras';
    }

    // Update project descriptions based on language
    if (this.currentLanguage === 'en') {
      // Translate project descriptions to English
      this.projects[0].description = 'This project aims to create a personal website as my portfolio in Software Engineering, developed with Ionic Framework and MySQL backend';
      this.projects[0].duration = 'February 2025 - present';

      this.projects[1].description = 'This project was developed for my Mobile Programming final assignment and addresses current challenges in Agriculture. It was designed with Ionic Framework and MySQL backend';
      this.projects[1].duration = 'November 2024 - February 2025';

      this.projects[2].description = 'Designed as a group project during the Merdeka Student Exchange batch 4 to Telkom University. It was created as a major assignment for the KPL course using C# language.';
      this.projects[2].duration = 'April - May 2024';
    } else {
      // Reset to original Indonesian descriptions
      this.projects[0].description = 'Project ini bertujuan untuk website pribadi sebagai portofolio saya di bidang Software Engineering yang dikembangkan dengan Ionic Framework dan backend berupa MySql';
      this.projects[0].duration = 'Februari 2025 - sekarang';

      this.projects[1].description = 'Project ini dikembangkan dengan tujuan sebagai tugas akhir di mata kuliah Pemograman Mobile dan menjawab tantangan di bidang Pertanian saat ini. Dirancang dengan Framework Ionic dengan backend berupa MySql';
      this.projects[1].duration = 'November 2024 - Februari 2025';

      this.projects[2].description = 'Dirancang secara berkelompok selama mengikuti Pertukaran Mahasiswa Merdeka batch 4 ke Telkom University. Ditujukan sebagai tugas besar dari mata kuliah KPL dengan bahasa C#.';
      this.projects[2].duration = 'April - Mei 2024';
    }
  }

  // Profile image modal state
  isProfileImageModalOpen = false;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    // Sort projects by newest first by default
    this.sortProjects('newest');
  }

  // Method to sort projects
  sortProjects(order: 'newest' | 'oldest') {
    if (order === 'newest') {
      this.projects.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    } else {
      this.projects.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    }
  }

  // Metode untuk membuka link sosial media
  openLink(url: string) {
    window.open(url, '_blank');
  }

  // Metode untuk navigasi dengan animasi
  navigateWithAnimation(path: string) {
    const animation = (baseEl: HTMLElement, opts?: any): Animation => {
      const enteringAnimation = createAnimation()
        .addElement(opts.enteringEl)
        .duration(300)
        .fromTo('transform', 'translateX(100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1');

      const leavingAnimation = createAnimation()
        .addElement(opts.leavingEl)
        .duration(300)
        .fromTo('transform', 'translateX(0)', 'translateX(-100%)')
        .fromTo('opacity', '1', '0.2');

      return createAnimation()
        .addAnimation(enteringAnimation)
        .addAnimation(leavingAnimation);
    };

    this.navCtrl.navigateForward(path, {
      animated: true,
      animation
    });
  }

  // Open profile image modal
  openProfileImageModal() {
    this.isProfileImageModalOpen = true;
  }

  // Close profile image modal
  closeProfileImageModal() {
    this.isProfileImageModalOpen = false;
  }
}