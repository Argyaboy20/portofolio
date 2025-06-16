import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpscalePage } from './upscale.page';

describe('UpscalePage', () => {
  let component: UpscalePage;
  let fixture: ComponentFixture<UpscalePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpscalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
