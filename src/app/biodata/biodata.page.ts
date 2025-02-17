import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.page.html',
  styleUrls: ['./biodata.page.scss'],
  standalone: false,
})
export class BiodataPage implements OnInit {
  // Gallery modal properties
  isGalleryModalOpen = false;
  currentGalleryImage = '';
  formData = {
    nama: '',
    email: '',
    pesan: ''
  };

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }
  ngOnInit() {
  }

  // Method to open the gallery modal
  openGalleryModal(imageSrc: string) {
    this.currentGalleryImage = imageSrc;
    this.isGalleryModalOpen = true;
  }

  // Method to close the gallery modal
  closeGalleryModal() {
    this.isGalleryModalOpen = false;
  }

  async submitForm() {
    if (!this.formData.nama || !this.formData.email || !this.formData.pesan) {
      this.presentToast('Tolong isi semua data yang dibutuhkan', 'warning');
      return;
    }

    const data = {
      aksi: 'add_connect',
      ...this.formData
    };

    try {
      const response: any = await this.http.post('http://127.0.0.1/api1/koneksi.php', data).toPromise();
      
      if (response.success) {
        this.presentToast('Pesan berhasil terkirim!', 'success');
        this.formData = { nama: '', email: '', pesan: '' };
      } else {
        this.presentToast('Pesan gagal terkirim', 'error');
      }
    } catch (error) {
      this.presentToast('An error occurred', 'error');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}