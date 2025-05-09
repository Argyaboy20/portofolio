import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocanaPage } from './locana.page';

describe('LocanaPage', () => {
  let component: LocanaPage;
  let fixture: ComponentFixture<LocanaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
