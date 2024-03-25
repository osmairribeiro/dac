<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
=======
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent]
    })
    .compileComponents();
    
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
