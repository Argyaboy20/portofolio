import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItsupportPage } from './itsupport.page';

describe('ItsupportPage', () => {
  let component: ItsupportPage;
  let fixture: ComponentFixture<ItsupportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
