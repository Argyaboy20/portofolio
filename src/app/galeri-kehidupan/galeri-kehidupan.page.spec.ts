import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriKehidupanPage } from './galeri-kehidupan.page';

describe('GaleriKehidupanPage', () => {
  let component: GaleriKehidupanPage;
  let fixture: ComponentFixture<GaleriKehidupanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriKehidupanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
