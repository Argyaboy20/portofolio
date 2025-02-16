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

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  projects: Project[] = [
    {
      title: 'Web Portofolio',
      duration: 'Februari 2025 - sekarang',
      description: 'Deskripsi singkat proyek dan teknologi yang digunakan.',
      image: '/assets/portofolio.png',
      demoLink: '/tabs/tab3',
      sourceLink: 'https://github.com/Argyaboy20/portofolio.git',
      startDate: new Date(2025, 1, 1)  // February 1, 2025
    },
    {
      title: 'Pertanian Mobile App',
      duration: 'November 2024 - Februari 2025',
      description: 'Deskripsi singkat proyek dan teknologi yang digunakan.',
      image: '/assets/permo_logo.jpg',
      demoLink: '/tabs/tab2',
      sourceLink: 'https://github.com/Argyaboy20/Permo.git',
      startDate: new Date(2024, 10, 1)  // November 1, 2024
    },
    {
      title: 'ApliKasir',
      duration: 'April - Mei 2024',
      description: 'Deskripsi singkat proyek dan teknologi yang digunakan.',
      image: 'assets/project-3.jpg',
      demoLink: '/tabs/tab4',
      sourceLink: 'https://github.com/hshinosa/ApliKasir-UI.git',
      startDate: new Date(2024, 3, 1)  // April 1, 2024
    }
  ];
  
  constructor(private navCtrl: NavController) {}
  
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
}