import { Injectable } from '@angular/core';

export interface Tool {
  name: string;
  icon: string;
  category: 'programmer' | 'data-analyst';
  level: 'Advanced' | 'Intermediate' | 'Basic';
  isTechStack: boolean;
}

export interface Project {
  title: string;
  duration: string;
  description: string;
  image: string;
  demoLink: string;
  sourceLink: string;
  startDate: Date;
}

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {

  // ✅ Data langsung ada di sini, tidak perlu diisi dari Tab1
  readonly tools: Tool[] = [
    { name: 'VS Code',      icon: 'code-slash-outline', category: 'programmer',   level: 'Advanced',     isTechStack: false },
    { name: 'GitHub',       icon: 'logo-github',        category: 'programmer',   level: 'Intermediate', isTechStack: false },
    { name: 'NPM/Node.js',  icon: 'logo-npm',           category: 'programmer',   level: 'Intermediate', isTechStack: false },
    { name: 'Ionic CLI',    icon: 'logo-ionic',         category: 'programmer',   level: 'Intermediate', isTechStack: true  },
    { name: 'Angular CLI',  icon: 'logo-angular',       category: 'programmer',   level: 'Intermediate', isTechStack: true  },
    { name: 'Git',          icon: 'git-branch-outline', category: 'programmer',   level: 'Intermediate', isTechStack: false },
    { name: 'Capacitor',    icon: 'logo-capacitor',     category: 'programmer',   level: 'Intermediate', isTechStack: true  },
    { name: 'Vercel',       icon: 'logo-vercel',        category: 'programmer',   level: 'Intermediate', isTechStack: false },
    { name: 'Laravel',      icon: 'logo-laravel',       category: 'programmer',   level: 'Intermediate', isTechStack: true  },
    { name: 'React',        icon: 'logo-react',         category: 'programmer',   level: 'Intermediate', isTechStack: true  },
    { name: 'Adonis Js',    icon: '',                   category: 'programmer',   level: 'Intermediate', isTechStack: true  },
    { name: 'Python',       icon: 'logo-python',        category: 'data-analyst', level: 'Intermediate', isTechStack: true  },
    { name: 'Apache Spark', icon: 'flash-outline',      category: 'data-analyst', level: 'Intermediate', isTechStack: false },
    { name: 'Firebase',     icon: 'logo-firebase',      category: 'programmer',   level: 'Basic',        isTechStack: true  },
    { name: 'Figma',        icon: 'logo-figma',         category: 'programmer',   level: 'Basic',        isTechStack: false },
    { name: 'Leaflet',      icon: 'map-outline',        category: 'programmer',   level: 'Basic',        isTechStack: true  },
    { name: 'WebSocket',    icon: 'pulse-outline',      category: 'programmer',   level: 'Basic',        isTechStack: true  },
    { name: 'C#',           icon: 'code-outline',       category: 'programmer',   level: 'Basic',        isTechStack: true  },
  ];

  readonly projects: Project[] = [
    {
      title: 'PMM Connect',
      duration: 'Oktober 2025 - Desember 2025',
      description: 'Project ini dibuat sebagai hasil output dari magang PKL di kampus untuk kebutuhan akademik. Menggunakan framework adonis js dengan bahasa Typescript dan lainnya.',
      image: '/assets/logopmm.png',
      demoLink: '/pmmconnect',
      sourceLink: 'https://github.com/Argyaboy20/connectpmm.git',
      startDate: new Date(2025, 10, 27)
    },
    {
      title: 'Perancangan Social-Vit',
      duration: 'Juni 2025 - September 2025',
      description: 'Project ini dibuat sebagai hasil output dari magang di Eduwork sebagai Programmer selama 3 bulan. Menggunakan framework Laravel dengan bahasa PHP dan lainnya.',
      image: '/assets/socialvit.webp',
      demoLink: '/socialvit',
      sourceLink: 'https://gitlab.com/eduwork.development/socialvit-admin/-/tree/faras',
      startDate: new Date(2025, 6, 26)
    },
    {
      title: 'Locana App',
      duration: 'Mei 2025 - Agustus 2025',
      description: 'Project ini bertujuan sebagai project iseng-iseng saya yang dikembangkan dengan Ionic Framework berbasis HTML, Node.js, dan PHP.',
      image: '/assets/logolocana.jpg',
      demoLink: '/locana',
      sourceLink: 'https://github.com/Argyaboy20/locana.git',
      startDate: new Date(2025, 5, 2)
    },
    {
      title: 'Web Portofolio',
      duration: 'Februari 2025 - sekarang',
      description: 'Project ini bertujuan untuk website pribadi sebagai portofolio saya di bidang Fullstack Developer yang dikembangkan dengan Framework Ionic, Node.js, Angular dan Javascript.',
      image: '/assets/portofolio.png',
      demoLink: '/portofolio',
      sourceLink: 'https://github.com/Argyaboy20/portofolio.git',
      startDate: new Date(2025, 1, 1)
    },
    {
      title: 'Pertanian Mobile App',
      duration: 'November 2024 - Februari 2025',
      description: 'Project ini dikembangkan dengan tujuan sebagai tugas akhir di mata kuliah Pemograman Mobile dan menjawab tantangan di bidang Pertanian saat ini. Dirancang dengan Framework Ionic dengan backend berupa MySql.',
      image: '/assets/permo_logo.jpg',
      demoLink: '/pertanianmobile',
      sourceLink: 'https://github.com/Argyaboy20/PertanianMobile.git',
      startDate: new Date(2024, 11, 1)
    },
    {
      title: 'ApliKasir',
      duration: 'April - Mei 2024',
      description: 'Dirancang secara berkelompok selama mengikuti Pertukaran Mahasiswa Merdeka batch 4 ke Telkom University. Ditujukan sebagai tugas besar dari mata kuliah KPL dengan bahasa C#.',
      image: '/assets/ApliKasir/home.png',
      demoLink: '/aplikasir',
      sourceLink: 'https://github.com/hshinosa/ApliKasir-UI.git',
      startDate: new Date(2024, 3, 1)
    }
  ];

  // ✅ Getter langsung, tidak perlu setter lagi
  getTechStackCount(): number {
    return this.tools.filter(t => t.isTechStack).length;
  }

  getProjectsCount(): number {
    return this.projects.length;
  }

  getCodingYears(): number {
    return Math.floor(new Date().getFullYear() - 2024);
  }
}