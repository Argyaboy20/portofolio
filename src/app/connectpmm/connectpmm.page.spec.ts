import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectpmmPage } from './connectpmm.page';

describe('ConnectpmmPage', () => {
  let component: ConnectpmmPage;
  let fixture: ComponentFixture<ConnectpmmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectpmmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
