import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-relawan',
  templateUrl: './relawan.page.html',
  styleUrls: ['./relawan.page.scss'],
  standalone: false,
})
export class RelawanPage implements OnInit {
  currentLang = 'id';
  scene: any;
  camera: any;
  renderer: any;
  shapes: any[] = [];
  
  // Gallery modal properties
  isGalleryOpen = false;
  currentGalleryPhotos: any[] = [];
  
  experiences = [
    {
      position: 'Volunteer Staff',
      organization: 'MN B Sasalimpetan PMM batch 4',
      period: 'Jun 2024',
      descriptionType: 'paragraph',
      descriptionId: [
        'Kontribusi sosial merupakan bentuk tugas akhir dari kegiatan Merdeka 4 Student Exchange di Telkom University. Acara ini bertujuan untuk memberikan pengetahuan, euforia, kebahagiaan dan merasakan secara langsung keanekaragaman suku dari berbagai pulau di Indonesia yang dibawakan langsung oleh para senior grup MN B dalam pementasan per pulau. Kegiatan bakti sosial ini diselenggarakan di PPSGHD.'
      ],
      descriptionEn: [
        'Social Contribution is a form of final assignment from Merdeka 4 Student Exchange activities at Telkom University. This event aims to provide knowledge, euphoria, happiness and experience firsthand the diversity of tribes from various islands in Indonesia which is presented directly by the MN B group seniors in the performance per island. The social contribution was held in PPSGHD.'
      ],
      photos: [
        {
          url: 'assets/img/volunteer/mnb-1.jpg',
          captionId: 'Grup MN B saat melakukan pementasan budaya',
          captionEn: 'MN B group during cultural performance'
        },
        {
          url: 'assets/img/volunteer/mnb-2.jpg',
          captionId: 'Kegiatan bakti sosial di PPSGHD',
          captionEn: 'Social service activities at PPSGHD'
        },
        {
          url: 'assets/img/volunteer/mnb-3.jpg',
          captionId: 'Foto bersama peserta Student Exchange',
          captionEn: 'Group photo with Student Exchange participants'
        }
      ]
    },
    {
      position: 'Volunteer',
      organization: 'Tel U Education Movement (TEAM)',
      period: 'May 2024',
      descriptionType: 'list',
      descriptionId: [
        'Terpilih sebagai relawan karena aktif dalam talkshow mereka.',
        'Melakukan kegiatan sosial di PPSGHD dan Panti Jompo FAKKU RAQABAH Muhammadiyah Bandung.',
        'Merancang dan menyampaikan materi pembelajaran interaktif yang membantu meningkatkan keterlibatan dan pemahaman siswa dan lansia sebesar 40%.'
      ],
      descriptionEn: [
        'Selected as a volunteer for being active in their talk show.',
        'Conducted social activities at PPSGHD and FAKKU RAQABAH Muhammadiyah Bandung Nursing Home.',
        'Design and deliver interactive learning materials that help increase student and senior engagement and understanding by 40%.'
      ],
      photos: [
        {
          url: 'assets/img/volunteer/team-1.jpg',
          captionId: 'Talkshow Tel U Education Movement',
          captionEn: 'Tel U Education Movement Talkshow'
        },
        {
          url: 'assets/img/volunteer/team-2.jpg',
          captionId: 'Kegiatan di PPSGHD',
          captionEn: 'Activities at PPSGHD'
        },
        {
          url: 'assets/img/volunteer/team-3.jpg',
          captionId: 'Kegiatan di Panti Jompo FAKKU RAQABAH',
          captionEn: 'Activities at FAKKU RAQABAH Nursing Home'
        }
      ]
    },
    {
      position: 'Volunteer',
      organization: 'PRADA (Pejuang Ramadhan dan Idul Adha) Telkom University',
      period: 'Mar 2024 - Apr 2024',
      descriptionType: 'list',
      descriptionId: [
        'Berpartisipasi aktif dalam mengorganisir dan mendistribusikan paket makanan selama Ramadan kepada lebih dari 500 mahasiswa dan staf pengajar.',
        'Membantu mengkoordinasikan acara buka puasa bersama di kampus, memastikan operasional yang lancar dan pengalaman positif bagi semua peserta.',
        'Berkolaborasi dengan tim yang terdiri dari 25 relawan untuk mengelola pengumpulan dan penyaluran donasi untuk perayaan Idul Adha.',
        'Mengkoordinir jamaah salat tarawtih.'
      ],
      descriptionEn: [
        'Actively participated in organizing and distributing food packages during Ramadan to over 500 students and faculty members.',
        'Helped coordinate community iftar events on campus, ensuring smooth operations and positive experiences for all participants.',
        'Collaborated with a team of 25 volunteers to manage donation collection and disbursement for Eid al-Adha celebrations.',
        'Coordinating the tarawtih prayer congregation.'
      ],
      photos: [
        {
          url: 'assets/img/volunteer/prada-1.jpg',
          captionId: 'Distribusi paket makanan selama Ramadhan',
          captionEn: 'Distribution of food packages during Ramadan'
        },
        {
          url: 'assets/img/volunteer/prada-2.jpg',
          captionId: 'Acara buka puasa bersama',
          captionEn: 'Community iftar event'
        },
        {
          url: 'assets/img/volunteer/prada-3.jpg',
          captionId: 'Tim relawan PRADA',
          captionEn: 'PRADA volunteer team'
        },
        {
          url: 'assets/img/volunteer/prada-4.jpg',
          captionId: 'Persiapan pelaksanaan shalat tarawih',
          captionEn: 'Preparation for tarawtih prayer congregation'
        }
      ]
    }
  ];

  constructor() {
    // Register Swiper custom elements
    register();
  }

  ngOnInit() {
    // Initialize 3D background after component loads
    setTimeout(() => {
      this.init3DBackground();
    }, 100);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'id' ? 'en' : 'id';
  }

  // Gallery modal functions
  openGallery(experience: any) {
    this.currentGalleryPhotos = experience.photos;
    this.isGalleryOpen = true;
  }

  closeGallery() {
    this.isGalleryOpen = false;
  }

  init3DBackground() {
    // Create scene
    this.scene = new THREE.Scene();
    
    // Setup camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 20;
    
    // Setup renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    
    // Append renderer to container
    const container = document.getElementById('canvas-container');
    if (container) {
      container.appendChild(this.renderer.domElement);
    }
    
    // Create volunteer-themed 3D objects
    this.createVolunteerObjects();
    
    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    
    // Start animation
    this.animate();
  }
  
  createVolunteerObjects() {
    // Colors from our theme
    const colors = [0x6da0e1, 0xede2e0, 0xff7e67];
    
    // Heart shape (symbolizing care and compassion)
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 2);
    heartShape.bezierCurveTo(2, 2, 2, -1, 0, -2);
    heartShape.bezierCurveTo(-2, -1, -2, 2, 0, 2);
    
    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1
    });
    
    // Create 5 hearts
    for (let i = 0; i < 5; i++) {
      const heart = new THREE.Mesh(
        heartGeometry,
        new THREE.MeshBasicMaterial({ 
          color: colors[i % colors.length], 
          wireframe: false, 
          transparent: true, 
          opacity: 0.7 
        })
      );
      heart.scale.set(0.5, 0.5, 0.5);
      heart.position.set(
        Math.random() * 30 - 15,
        Math.random() * 30 - 15,
        Math.random() * 10 - 5
      );
      heart.rotation.x = Math.random() * Math.PI;
      heart.rotation.y = Math.random() * Math.PI;
      this.scene.add(heart);
      this.shapes.push({
        mesh: heart,
        rotationSpeed: {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01 - 0.005,
          z: Math.random() * 0.01 - 0.005
        },
        movementSpeed: {
          x: Math.random() * 0.02 - 0.01,
          y: Math.random() * 0.02 - 0.01,
          z: Math.random() * 0.01 - 0.005
        }
      });
    }
    
    // Hands shape (symbolizing help)
    const handGeometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create 5 hands
    for (let i = 0; i < 5; i++) {
      const hand = new THREE.Mesh(
        handGeometry,
        new THREE.MeshBasicMaterial({ 
          color: colors[i % colors.length], 
          wireframe: true 
        })
      );
      hand.scale.set(0.5, 0.8, 0.2);
      hand.position.set(
        Math.random() * 30 - 15,
        Math.random() * 30 - 15,
        Math.random() * 10 - 5
      );
      this.scene.add(hand);
      this.shapes.push({
        mesh: hand,
        rotationSpeed: {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01 - 0.005,
          z: Math.random() * 0.01 - 0.005
        },
        movementSpeed: {
          x: Math.random() * 0.02 - 0.01,
          y: Math.random() * 0.02 - 0.01,
          z: Math.random() * 0.01 - 0.005
        }
      });
    }
    
    // Book shape (symbolizing education and knowledge)
    const bookGeometry = new THREE.BoxGeometry(2, 3, 0.3);
    
    // Create 5 books
    for (let i = 0; i < 5; i++) {
      const book = new THREE.Mesh(
        bookGeometry,
        new THREE.MeshBasicMaterial({ 
          color: colors[i % colors.length], 
          wireframe: false, 
          transparent: true, 
          opacity: 0.7 
        })
      );
      book.position.set(
        Math.random() * 30 - 15,
        Math.random() * 30 - 15,
        Math.random() * 10 - 5
      );
      this.scene.add(book);
      this.shapes.push({
        mesh: book,
        rotationSpeed: {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01 - 0.005,
          z: Math.random() * 0.01 - 0.005
        },
        movementSpeed: {
          x: Math.random() * 0.02 - 0.01,
          y: Math.random() * 0.02 - 0.01,
          z: Math.random() * 0.01 - 0.005
        }
      });
    }
  }
  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    // Animate each shape
    this.shapes.forEach(shape => {
      // Rotate shapes
      shape.mesh.rotation.x += shape.rotationSpeed.x;
      shape.mesh.rotation.y += shape.rotationSpeed.y;
      shape.mesh.rotation.z += shape.rotationSpeed.z;
      
      // Move shapes
      shape.mesh.position.x += shape.movementSpeed.x;
      shape.mesh.position.y += shape.movementSpeed.y;
      shape.mesh.position.z += shape.movementSpeed.z;
      
      // Boundary check and reverse direction if needed
      if (Math.abs(shape.mesh.position.x) > 20) {
        shape.movementSpeed.x *= -1;
      }
      if (Math.abs(shape.mesh.position.y) > 20) {
        shape.movementSpeed.y *= -1;
      }
      if (Math.abs(shape.mesh.position.z) > 10) {
        shape.movementSpeed.z *= -1;
      }
    });
    
    this.renderer.render(this.scene, this.camera);
  }
  
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}