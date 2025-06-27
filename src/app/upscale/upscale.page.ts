import { Component, OnInit } from '@angular/core';
import { inject } from "@vercel/analytics"

inject();

@Component({
  selector: 'app-upscale',
  templateUrl: './upscale.page.html',
  styleUrls: ['./upscale.page.scss'],
  standalone: false,

})
export class UpscalePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
