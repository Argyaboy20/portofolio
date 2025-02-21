import { Component } from '@angular/core';

interface ProjectImage {
  url: string;
  originalCaption: string;
  caption: string;
  details: string;
  techStack: string[];
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page {
  currentLanguage: 'id' | 'en' = 'id';
  translations = {
    id: {
      subtitle: 'di Dunia Digital',
      viewProject: 'Lihat Project',
      techStack: 'Tech Stack',
      details: 'Detail Project'
    },
    en: {
      subtitle: 'to Digital World',
      viewProject: 'View Project',
      techStack: 'Tech Stack',
      details: 'Project Details'
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
      techStack: ['Angular Forms', 'Firebase Auth']
    },
    // Add other project images similarly
  ];

  isModalOpen = false;
  selectedProject: ProjectImage | null = null;

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