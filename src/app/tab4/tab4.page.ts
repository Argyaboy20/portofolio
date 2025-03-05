import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { inject } from "@vercel/analytics"


inject();

interface ProjectImage {
  url: string;
  originalCaption: string;
  caption: string;
  details: string;
  techStack: string[];
}

interface DevTool {
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit, OnDestroy {
  currentLanguage: 'id' | 'en' = 'id';
  translations = {
    id: {
      subtitle: 'di Dunia Digital',
      viewProject: 'Lihat Project',
      techStack: 'Tech Stack',
      details: 'Detail Project',
      devTools: 'Alat alat Pengembangan'
    },
    en: {
      subtitle: 'to Digital World',
      viewProject: 'View Project',
      techStack: 'Tech Stack',
      details: 'Project Details',
      devTools: 'Development Tools'
    }
  };

  projectImages: ProjectImage[] = [
    {
      url: '/assets/apliKasir.png',
      originalCaption: 'Tampilan Halaman Utama',
      caption: 'Home Page View',
      details: 'Halaman utama aplikasi dengan UI modern dan user-friendly',
      techStack: ['C#', 'Json', 'API']
    },
    {
      url: '/assets/editHutang.png',
      originalCaption: 'Tampilan Menu Edit',
      caption: 'Edit Menu View',
      details: 'Form untuk melakukan edit data transaksi atau hutang',
      techStack: ['General Libraries', 'Firebase Auth']
    },
    // Add other project images similarly
  ];

  developmentTools: DevTool[] = [
    {
      name: 'Bahasa C#',
      icon: 'code-slash',
      description: 'Bahasa pemrograman utama untuk pengembangan aplikasi desktop'
    },
    {
      name: 'Json',
      icon: 'document-text',
      description: 'Format data untuk penyimpanan dan pertukaran data dalam aplikasi'
    },
    {
      name: 'General Library',
      icon: 'library',
      description: 'Pustaka umum untuk mendukung fungsi-fungsi aplikasi'
    },
    {
      name: 'Password Hashing',
      icon: 'lock-closed',
      description: 'Teknik pengamanan untuk melindungi data sensitif pengguna'
    }
  ];


  isModalOpen = false;
  selectedProject: ProjectImage | null = null;
  private backButtonSubscription!: Subscription;

  constructor(
    private platform: Platform,
    private router: Router
  ) {}

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      // Check if modal is open
      if (this.isModalOpen) {
        this.closeModal();
      } else {
        // Navigate back to tab1
        this.router.navigate(['/tabs/tab1']);
      }
    });
  }

  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
  }

  openProjectModal(project: ProjectImage) {
    this.selectedProject = project;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProject = null;
  }
}