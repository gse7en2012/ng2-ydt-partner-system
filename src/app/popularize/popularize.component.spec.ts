/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopularizeComponent } from './popularize.component';

describe('PopularizeComponent', () => {
  let component: PopularizeComponent;
  let fixture: ComponentFixture<PopularizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
