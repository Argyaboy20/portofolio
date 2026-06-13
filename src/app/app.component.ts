import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { inject } from "@vercel/analytics";

/* Initialize Vercel Analytics */
inject();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  // Mapping route ke title
  private titleMap = new Map([
    ['/aboutme', 'About Me - Maulana Farras Blog\'s'],
    ['/admin', 'Administrasi - Maulana Farras Blog\'s'],
    ['/biodata', 'Biodata - Maulana Farras Blog\'s'],
    ['/connectpmm', 'PMM Connect - Maulana Farras Blog\'s'],
    ['/galeri-kehidupan', 'Galeri Kehidupan - Maulana Farras Blog\'s'],
    ['/itsupport', 'IT Support - Maulana Farras Blog\'s'],
    ['/locana', 'Locana App - Maulana Farras Blog\'s'],
    ['/privacypolicy', 'Privacy Policy - Maulana Farras Blog\'s'],
    ['/relawan', 'Relawan - Maulana Farras Blog\'s'],
    ['/socialvit', 'SocialVit - Maulana Farras Blog\'s'],
    ['/pertanianmobile', 'Pertanian Mobile - Maulana Farras Blog\'s'],
    ['/portofolio', 'Web Portofolio - Maulana Farras Blog\'s'],
    ['/aplikasir', 'Aplikasir - Maulana Farras Blog\'s'],
  ]);

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    // Listen to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      
      // Set title berdasarkan route
      const title = this.titleMap.get(event.urlAfterRedirects) || 'Maulana Farras Blog\'s - Blog Pribadi Maulana Farras';
      
      // Set dengan delay untuk memastikan tidak ke-override
      setTimeout(() => {
        this.titleService.setTitle(title);
      }, 100);
    });
  }
}