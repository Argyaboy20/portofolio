import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { inject } from "@vercel/analytics";
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

inject();

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false,
})
export class AdminPage implements OnInit {
  /* Language toggle (ID/EN) */
  language: 'id' | 'en' = 'id';

  // Modal properties
  showProjectModal = false;
  currentProject: any = null;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {
    /* Register Swiper elements */
    register();
  }

  ngOnInit() {
    /* Initialize with default language or user preference */
    this.checkUserLanguagePreference();
  }

  // Work Experience Data
  workExperience = [
    {
      titleId: 'Sekretaris dan Bendahara - Panitia BM8 Labuan Bajo (WFH)',
      titleEn: 'Secretary and Treasurer - BM8 Labuan Bajo Committee (WFH)',
      company: 'Bakti Milenial Foundation',
      period: 'Mar - Jul 2025',
      descriptionId: `• Merancang formulir pendaftaran untuk fully funded, partial funded dan self funded serta formulir lainnya jika diperlukan
• Menangani bidang CRM khususnya di bidang pemasaran dalam bentuk WA Blast
• Membuat Rancangan Anggaran Biaya untuk kegiatan selanjutnya
• Mencatat semua transaksi yang masuk dan keluar untuk program BM#8 
• Mengkoordinir peserta baik yang full, parsial maupun swadaya untuk pembekalan`,
      descriptionEn: `• Designing registration forms for fully funded, partially funded and self funded and other forms if needed
• Handling the CRM field, especially in the field of marketing in the form of WA Blasts
• Creating a Draft Budget for later activities
• Recording all incoming and outgoing transactions for the BM#8 program 
• Coordinating fully, partially and self funded participants for briefing`,
      /* Project details for modal */
      projectNameId: 'Administrasi Terpadu dan Optimal',
      projectNameEn: 'Integrated and Optimal Administration',
      projectDescId: `<p>Dalam pekerjaa ini menjabat sebagai sekretaris dan bendahara di Bakti Milenial#8 Labuan Bajo.</p>
<p>Hasil yang dicapai:</p>
<ul>
  <li>Sistem pendaftaran yang terintegrasi dan terdokumentasikan dengan baik</li>
  <li>Membuat Rancangan dan Anggaran Belanja dengan tepat</li>
  <li>Mendukung semua urusan administrasi dan keperluan berkas lainnya selama periode berlangsung</li>
  <li>Mempromosikan kegiatan kegiatan yang diselenggarakan Bakti Milenial dengan WBSPro</li>
</ul>`,
      projectDescEn: `<p>In this job, I served as secretary and treasurer at Bakti Millenial#8 Labuan Bajo.</p>
<p>Achieved results:</p>
<ul>
  <li>Integrated and well-documented registration system</li>
  <li>Make a proper Expenditure Plan and Budget</li>
  <li>Support all administrative matters and other file requirements during the period.</li>
  <li>Promote activities organized by Bakti Milenial with WBSPro</li>
</ul>`,
      images: ['/assets/bm8-1.png', '/assets/bm8-2.png', '/assets/bm8-3.png'],
      technologies: ['Google Sheets', 'Google Docs', 'Google Form', 'WBSPro']
    },

    {
      titleId: 'Kepala Admin & General Affair - Magang (WFH)',
      titleEn: 'Head of Admin & General Affair - Internship (WFH)',
      company: 'Bakti Milenial',
      period: 'Sep 2024 - Jan 2025',
      descriptionId: `• Bertanggung jawab untuk mendukung operasional harian Bakti Milenial dalam hal administrasi umum
• Memenuhi kebutuhan administrasi di divisi Kaptenusa Cloth, Jalan.in Trip, Inspiratrip, dan EduAction`,
      descriptionEn: `• Responsible for supporting the daily operations of Bakti Milenial in terms of general administration
• Fulfill administrative needs in the Captainusa Cloth, Jalan.in Trip division, Inspiratrip, and EduAction`,
      /* Project details for modal */
      projectNameId: 'Sistem Administrasi Terpadu',
      projectNameEn: 'Integrated Administrative System',
      projectDescId: `<p>Proyek ini melibatkan pengembangan dan implementasi sistem administrasi terpadu untuk mengelola operasional harian dari empat divisi Bakti Milenial: Kaptenusa Cloth, Jalan.in Trip, Inspiratrip, dan EduAction.</p>
<p>Tanggung jawab utama:</p>
<ul>
  <li>Merancang sistem pengarsipan digital untuk semua dokumen administrasi</li>
  <li>Membuat SOP untuk alur komunikasi antar divisi</li>
  <li>Mendukung segala jenis kegiatan administrasi setiap divisi</li>
  <li>Mempromosikan kegiatan kegiatan yang diselenggarakan Bakti Milenial dengan WBSPro</li>
</ul>`,
      projectDescEn: `<p>This project involved the development and implementation of an integrated administrative system to manage the daily operations of Bakti Milenial's four divisions: Kaptenusa Cloth, Jalan.in Trip, Inspiratrip, and EduAction.</p>
<p>Main responsibilities:</p>
<ul>
  <li>Designing a digital filing system for all administrative documents</li>
  <li>Creating SOPs for inter-division communication flow</li>
  <li>Support all types of administrative activities of each division</li>
  <li>Promote activities organized by Bakti Milenial with WBSPro</li>
</ul>`,
      images: ['/assets/bakti1.png', '/assets/bakti2.jpg', '/assets/bakti3.png'],
      technologies: ['Google Sheets', 'Google Docs', 'Google Form', 'WBSPro']
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
• Train bootcamp students in job interviews through FGDs for material and mental preparation`,
      /* Project details for modal */
      projectNameId: 'Sistem Pelacakan Karir Lulusan Bootcamp',
      projectNameEn: 'Bootcamp Graduate Career Tracking System',
      projectDescId: `<p>Proyek ini melibatkan pengembangan dan pengelolaan sistem komprehensif untuk melacak perkembangan karir lulusan bootcamp Eduwork. Fokus utama adalah memaksimalkan peluang penempatan kerja melalui aplikasi yang terorganisir dan pelatihan wawancara yang efektif.</p>
<p>Pencapaian utama:</p>
<ul>
  <li>Mengoptimalkan sistem entri data yang meningkatkan akurasi informasi siswa sebesar 15%</li>
  <li>Mengirimkan rata-rata 20 lamaran kerja per siswa per minggu ke berbagai portal lowongan kerja</li>
  <li>Mengembangkan dan memfasilitasi FGD persiapan wawancara yang meningkatkan tingkat keberhasilan wawancara sebesar 25%</li>
  <li>Merancang sistem pelacakan untuk mengidentifikasi pola perekrutan dan meningkatkan strategi penempatan kerja</li>
</ul>`,
      projectDescEn: `<p>This project involved developing and managing a comprehensive system to track Eduwork bootcamp graduates' career progression. The primary focus was maximizing job placement opportunities through organized applications and effective interview training.</p>
<p>Key achievements:</p>
<ul>
  <li>Optimized data entry system that improved student information accuracy by 15%</li>
  <li>Submitted an average of 20 job applications per student weekly to various job portals</li>
  <li>Developed and facilitated interview preparation FGDs that increased interview success rates by 25%</li>
  <li>Designed tracking system to identify recruitment patterns and improve job placement strategies</li>
</ul>`,
      images: ['/assets/eduwork1.png', '/assets/eduwork2.png', '/assets/eduwork3.png', '/assets/eduwork4.png'],
      technologies: ['Dealls Job', 'Google Sheets', 'Zoom', 'Jobstreet', 'Glints', 'LinkedIn', 'Indeed']
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
• Managed and implemented school financial reports, achieving 0% error rate`,
      /* Project details for modal */
      projectNameId: 'Sistem Informasi Manajemen Sekolah',
      projectNameEn: 'School Management Information System',
      projectDescId: `<p>Proyek ini berfokus pada modernisasi sistem administrasi sekolah dan pengembangan sistem informasi manajemen yang efisien untuk SMP Swasta Yayasan Pendidikan Pangkalan Susu.</p>
<p>Hasil yang dicapai:</p>
<ul>
  <li>Mendigitalisasi sistem pencatatan data siswa dan guru, menghemat 15 jam kerja per minggu</li>
  <li>Mengembangkan dan mengimplementasikan sistem pelaporan keuangan yang mencapai tingkat akurasi 100%</li>
  <li>Mengelola sistem integrasi dengan database Dinas Pendidikan Langkat</li>
  <li>Melatih staf administrasi lain dalam mekanisme sistem baru, guna keberlanjutan jangka panjang</li>
  <li>Mengembangkan SOP untuk pemeliharaan dan pembaruan data sekolah</li>
</ul>`,
      projectDescEn: `<p>This project focused on modernizing the school's administrative system and developing an efficient management information system for SMP Swasta Yayasan Pendidikan Pangkalan Susu.</p>
<p>Achievements:</p>
<ul>
  <li>Digitized student and teacher record-keeping systems, saving 15 work hours per week</li>
  <li>Developed and implemented a financial reporting system achieving 100% accuracy rate</li>
  <li>Managed integration system with Langkat Education Department database</li>
  <li>Train other administrative staff in the mechanics of the new system, for long-term sustainability</li>
  <li>Developed SOPs for school data maintenance and updates</li>
</ul>`,
      images: ['/assets/school1.jpg', '/assets/school2.jpg', '/assets/school3.jpg', '/assets/school4.jpeg'],
      technologies: ['MS Office', 'DAPODIK', 'ARKAS']
    }
  ];

  /* Administrative Skills */
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
      icon: 'albums-outline',
      isCustomIcon: true,
      customIconPath: 'assets/icon/GoogleSheets.png',
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
      icon: 'albums-outline', 
      isCustomIcon: true,
      customIconPath: 'assets/icon/Clickup.png', 
      color: 'secondary'
    },
    {
      nameId: 'Trello',
      nameEn: 'Trello',
      icon: 'albums-outline',
      isCustomIcon: true, /* tambahkan flag untuk mengidentifikasi icon kustom */
      customIconPath: 'assets/icon/Trello.png', 
      color: 'dark'
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
    },
    {
      nameId: 'WBSPro',
      nameEn: 'WBSPro',
      icon: 'albums-outline',
      isCustomIcon: true, /* tambahkan flag untuk mengidentifikasi icon kustom */
      customIconPath: 'assets/icon/wbspro.png',
      color: 'light'
    }
  ];

  /* Recommendations */
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

  /* Toggle between Indonesian and English */
  toggleLanguage() {
    this.language = this.language === 'id' ? 'en' : 'id';
    /* Save language preference */
    localStorage.setItem('preferredLanguage', this.language);
  }

  /* Check user's previously saved language preference */
  checkUserLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'id' || savedLanguage === 'en') {
      this.language = savedLanguage;
    }
  }

  /* Open project modal */
  openProjectModal(index: number) {
    this.currentProject = this.workExperience[index];
    this.showProjectModal = true;
  }
  
  /* Close project modal */
  closeProjectModal() {
    this.showProjectModal = false;
    this.currentProject = null;
    /* Navigate back to the admin page */
    this.router.navigateByUrl('/admin');
  }
}