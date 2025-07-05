import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialvitPage } from './socialvit.page';

describe('SocialvitPage', () => {
  let component: SocialvitPage;
  let fixture: ComponentFixture<SocialvitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialvitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
