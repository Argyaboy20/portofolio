import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  // Mapping route ke title
  private titleMap = new Map([
    ['/locana', 'Locana - Maulana Farras Blog\'s'],
    ['/pertanianmobile', 'Pertanian Mobile - Maulana Farras Blog\'s'],
    ['/portofolio', 'Portofolio - Maulana Farras Blog\'s'],
    ['/aplikasir', 'Aplikasir - Maulana Farras Blog\'s'],
    ['/biodata', 'Biodata - Maulana Farras Blog\'s'],
    ['/galeri-kehidupan', 'Galeri Kehidupan - Maulana Farras Blog\'s'],
    ['/admin', 'Administrasi - Maulana Farras Blog\'s'],
    ['/relawan', 'Relawan - Maulana Farras Blog\'s'],
    ['/aboutme', 'About Me - Maulana Farras Blog\'s'],
    ['/privacypolicy', 'Privacy Policy - Maulana Farras Blog\'s'],
    ['/upscale', 'Upscale - Maulana Farras Blog\'s'],
    ['/tabs/tab2', 'Pertanian Mobile - Maulana Farras Blog\'s'],
    ['/tabs/tab3', 'Portofolio - Maulana Farras Blog\'s'],
    ['/tabs/tab4', 'Aplikasir - Maulana Farras Blog\'s'],
  ]);

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    // Listen to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Navigation to:', event.urlAfterRedirects);
      
      // Set title berdasarkan route
      const title = this.titleMap.get(event.urlAfterRedirects) || 'Maulana Farras Blog\'s - Blog Pribadi Maulana Farras';
      
      // Set dengan delay untuk memastikan tidak ke-override
      setTimeout(() => {
        this.titleService.setTitle(title);
        console.log('Title set to:', title);
      }, 100);
    });
  }
}