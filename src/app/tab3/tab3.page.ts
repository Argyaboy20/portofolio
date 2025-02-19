import { Component } from '@angular/core';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface Contact {
  icon: string;
  label: string;
  link: string;
}

interface Translations {
  heroTitle: string;
  heroSubtitle: string;
  skillsTitle: string;
  contactTitle: string;
}

interface TranslationDict {
  id: Translations;
  en: Translations;
}

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  currentLanguage: 'id' | 'en' = 'id';
  translations: TranslationDict = {
    id: {
      heroTitle: 'Web Portofolio',
      heroSubtitle: 'Pengembang Web, Pengembang Full-Stack, Desainer UI/UX & Pengembang Ionic',
      skillsTitle: 'Bahasa Pemograman',
      contactTitle: 'Kontak'
    },
    en: {
      heroTitle: 'Web Portofolio',
      heroSubtitle: 'Web Developer, Fullstack Developer, UI/UX Designer, Ionic Developer',
      skillsTitle: 'Programming language',
      contactTitle: 'Contact'
    }
  };

  skills: Skill[] = [
    { name: 'HTML/CSS', level: 90, icon: 'code-outline' },
    { name: 'JavaScript', level: 85, icon: 'logo-javascript' },
    { name: 'Angular', level: 80, icon: 'logo-angular' },
    { name: 'Node.js', level: 75, icon: 'server-outline' },
    { name: 'UI/UX Design', level: 85, icon: 'color-palette-outline' },
    { name: 'Database', level: 80, icon: 'server' }
  ];

  contacts: Contact[] = [
    { icon: 'mail-outline', label: 'Email', link: 'mailto:maulanafarras030520@gmail.com' },
    { icon: 'logo-github', label: 'GitHub', link: 'https://github.com/Argyaboy20' },
    { icon: 'logo-linkedin', label: 'LinkedIn', link: 'https://linkedin.com/in/maulanafarras' }
  ];

  constructor() {}

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'id' ? 'en' : 'id';
  }
}