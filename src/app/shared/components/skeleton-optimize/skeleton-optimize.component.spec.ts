import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonOptimizeComponent } from './skeleton-optimize.component';

describe('SkeletonOptimizeComponent', () => {
  let component: SkeletonOptimizeComponent;
  let fixture: ComponentFixture<SkeletonOptimizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonOptimizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonOptimizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
