import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularizeNoAvatarComponent } from './popularize-no-avatar.component';

describe('PopularizeNoAvatarComponent', () => {
  let component: PopularizeNoAvatarComponent;
  let fixture: ComponentFixture<PopularizeNoAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularizeNoAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularizeNoAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
