import { Component, OnInit } from '@angular/core';
import { inject } from "@vercel/analytics"

inject();

@Component({
  selector: 'app-socialvit',
  templateUrl: './socialvit.page.html',
  styleUrls: ['./socialvit.page.scss'],
  standalone: false,
})
export class SocialvitPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
