<<<<<<< HEAD
<<<<<<<< HEAD:front/src/app/user-profile/user-profile.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
=======
<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe
>>>>>>> ff91764b54c48e4c57a7cd3ab4abc5c547bac29c

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

<<<<<<< HEAD
=======
<<<<<<< HEAD
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
=======
>>>>>>> ff91764b54c48e4c57a7cd3ab4abc5c547bac29c
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent]
    })
    .compileComponents();
    
<<<<<<< HEAD
=======
>>>>>>> f11a7596b8d2d751e44a38ad9dc641ca5e8145fe
>>>>>>> ff91764b54c48e4c57a7cd3ab4abc5c547bac29c
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
<<<<<<< HEAD
========
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocadastroComponent } from './autocadastro.component';

describe('AutocadastroComponent', () => {
  let component: AutocadastroComponent;
  let fixture: ComponentFixture<AutocadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutocadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>>> ff91764b54c48e4c57a7cd3ab4abc5c547bac29c:front/src/app/autocadastro/autocadastro.component.spec.ts
=======
>>>>>>> ff91764b54c48e4c57a7cd3ab4abc5c547bac29c
