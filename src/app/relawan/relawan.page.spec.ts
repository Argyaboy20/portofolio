import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelawanPage } from './relawan.page';

describe('RelawanPage', () => {
  let component: RelawanPage;
  let fixture: ComponentFixture<RelawanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RelawanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
