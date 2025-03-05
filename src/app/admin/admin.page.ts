import { Component, OnInit} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { inject } from "@vercel/analytics"

inject();

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false,
})
export class AdminPage implements OnInit {
  // Language toggle (ID/EN)
  language: 'id' | 'en' = 'id';

  // Work Experience Data
  workExperience = [
    {
      titleId: 'Kepala Admin & General Affair - Magang (WFH)',
      titleEn: 'Head of Admin & General Affair - Internship (WFH)',
      company: 'Bakti Milenial',
      period: 'Sep 2024 - Jan 2025',
      descriptionId: `• Bertanggung jawab untuk mendukung operasional harian Bakti Milenial dalam hal administrasi umum
• Memenuhi kebutuhan administrasi di divisi Kaptenusa Cloth, Jalan.in Trip, Inspiratrip, dan EduAction`,
      descriptionEn: `• Responsible for supporting the daily operations of Bakti Milenial in terms of general administration
• Fulfill administrative needs in the Captainusa Cloth, Jalan.in Trip division, Inspiratrip, and EduAction`
    },
    {
      titleId: 'Data Entry - Magang (WFH)',
      titleEn: 'Data Entry - Internship (WFH)',
      company: 'Eduwork',
      period: 'Sept - Des 2024',
      descriptionId: `• Menginput dan mengatur data siswa bootcamp dengan tepat dan efisien. 
• Memastikan selalu mengirimkan aplikasi lamaran kerja siswa bootcamp ke berbagai portal lowongan kerja setiap harinya dengan memenuhi target yang ditentukan
• Menanyakan kepada siswa bootcamp apakah ada perkembangan mengenai panggilan wawancara kerja dari aplikasi yang telah disebarkan setiap harinya
• Melatih siswa bootcamp dalam wawancara kerja melalui FGD untuk persiapan materi dan mental`,
      descriptionEn: `• Input and organize bootcamp student data appropriately and efficiently. 
• Ensure that always send job application's bootcamp students to various job portals per day by meeting the specified targets
• Ask bootcamp students if there is any progress regarding job interview calls from applications that have been distributed every day
• Train bootcamp students in job interviews through FGDs for material and mental preparation`
    },
    {
      titleId: 'Staff Administrasi - Fulltime',
      titleEn: 'Administration Staff - Fulltime',
      company: 'SMP Swasta Yayasan Pendidikan Pangkalan Susu',
      period: 'Jul 2021 - Feb 2023',
      descriptionId: `• Berhasil mengelola dan memperbarui data sekolah secara online ke Dinas Pendidikan Langkat
• Mengelola dan mengorganisir semua file dan laporan sekolah, menghasilkan peningkatan efisiensi sebesar 10%
• Mengelola dan mengimplementasikan laporan keuangan sekolah, menghasilkan 0% kesalahan`,
      descriptionEn: `• Successfully managed and updated school data online to the Langkat Education Department
• Managed and organized all school files and reports, resulting in a 10% efficiency improvement
• Managed and implemented school financial reports, achieving 0% error rate`
    }
  ];

  // Administrative Skills
  adminTools = [
    {
      nameId: 'Google Docs',
      nameEn: 'Google Docs',
      icon: 'document-text-outline',
      color: 'primary'
    },
    {
      nameId: 'Google Sheets',
      nameEn: 'Google Sheets',
      icon: 'grid-outline',
      color: 'success'
    },
    {
      nameId: 'Google Calendar',
      nameEn: 'Google Calendar',
      icon: 'calendar-outline',
      color: 'tertiary'
    },
    {
      nameId: 'Google Form',
      nameEn: 'Google Form',
      icon: 'clipboard-outline',
      color: 'warning'
    },
    {
      nameId: 'ClickUp',
      nameEn: 'ClickUp',
      icon: 'checkmark-circle-outline',
      color: 'secondary'
    },
    {
      nameId: 'Trello',
      nameEn: 'Trello',
      icon: 'albums-outline',
      color: 'primary'
    },
    {
      nameId: 'MS Office',
      nameEn: 'MS Office',
      icon: 'desktop-outline',
      color: 'danger'
    },
    {
      nameId: 'Zoom',
      nameEn: 'Zoom',
      icon: 'videocam-outline',
      color: 'medium'
    }
  ];

  // Recommendations
  recommendations = [
    {
      name: 'Qhoifa Fawziah Aulia Keysha',
      position: 'Talent Development Eduwork',
      avatar: '/assets/qhoifa.jpg',
      textId: 'Saya merasa senang bisa membimbing Farras selama magangnya sebagai Spesialis Entri Data di divisi HRC di Eduwork. Farras secara konsisten menunjukkan etos kerja yang luar biasa, perhatian terhadap detail, dan pendekatan proaktif dalam menyelesaikan tugas-tugasnya. Dedikasi, kerja sama tim, dan antusiasme Farras untuk berkembang membuatnya menjadi individu yang menonjol. Saya sangat merekomendasikannya sebagai tambahan yang berharga bagi organisasi mana pun yang mencari anggota tim yang termotivasi dan dapat diandalkan.',
      textEn: 'I had the pleasure of mentoring Farras during his internship as a Data Entry Specialist in the HRC division at Eduwork. Farras consistently demonstrated exceptional work ethic, attention to detail, and a proactive approach to completing his tasks. Farras’s dedication, teamwork, and enthusiasm for growth make him a standout individual. I highly recommend him as a valuable addition to any organization seeking a motivated and reliable team member.',
      link: 'https://www.linkedin.com/in/maulanafarras/details/recommendations/'
    },
    {
      name: 'Muhammad Imansyah Putra',
      position: 'Human Resource Exioncare Indonesia',
      avatar: '/assets/iman.jpg',
      textId: 'Maulana Farras menunjukkan inisiatif yang tinggi dan memiliki kemampuan problem sloving yang baik melalui proaktifnya dalam mengidentifikasi tantangan serta memberikan solusi inovatif dalam berkontribusi secara tim sehingga meningkatkan keberhasilan dalam project atau pekerjaan yang dilakukannya.',
      textEn: 'Maulana Farras shows high initiative and has good problem-solving skills through his proactivity in identifying challenges and providing innovative solutions in contributing to the team so as to increase success in the project or work he does.',
      link: 'https://www.linkedin.com/in/maulanafarras/details/recommendations/'
    },
  ];

  constructor() {
    // Register Swiper elements
    register();
  }

  ngOnInit() {
    // Initialize with default language or user preference
    this.checkUserLanguagePreference();
  }

  // Toggle between Indonesian and English
  toggleLanguage() {
    this.language = this.language === 'id' ? 'en' : 'id';
    // Save language preference
    localStorage.setItem('preferredLanguage', this.language);
  }

  // Check user's previously saved language preference
  checkUserLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'id' || savedLanguage === 'en') {
      this.language = savedLanguage;
    }
  }
}