import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
}