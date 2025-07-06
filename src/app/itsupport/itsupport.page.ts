import { Component, OnInit } from '@angular/core';
import { inject } from "@vercel/analytics"


inject();

@Component({
  selector: 'app-itsupport',
  templateUrl: './itsupport.page.html',
  styleUrls: ['./itsupport.page.scss'],
  standalone: false,
})
export class ItsupportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
