import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-providers';

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.page.html',
  styleUrls: ['./biodata.page.scss'],
  standalone: false,
})
export class BiodataPage implements OnInit {
  isGalleryModalOpen = false;
  currentGalleryImage = '';
  formData = {
    nama: '',
    email: '',
    pesan: ''
  };

  constructor(
    private postProvider: PostProvider,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  openGalleryModal(imageSrc: string) {
    this.currentGalleryImage = imageSrc;
    this.isGalleryModalOpen = true;
  }

  closeGalleryModal() {
    this.isGalleryModalOpen = false;
  }

  async submitForm() {
    if (!this.formData.nama || !this.formData.email || !this.formData.pesan) {
      await this.presentToast('Tolong isi semua data yang dibutuhkan', 'warning');
      return;
    }

    const data = {
      aksi: 'add_connect',
      nama: this.formData.nama,
      email: this.formData.email,
      pesan: this.formData.pesan
    };

    this.postProvider.postData(data, 'koneksi.php').subscribe({
      next: async (response: any) => {
        if (response.success) {
          await this.presentToast('Pesan berhasil terkirim!', 'success');
          this.formData = { nama: '', email: '', pesan: '' };
        } else {
          await this.presentToast(response.message || 'Pesan gagal terkirim', 'danger');
        }
      },
      error: async (error) => {
        console.error('Error:', error);
        await this.presentToast(error.message || 'Terjadi kesalahan pada server', 'danger');
      }
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}