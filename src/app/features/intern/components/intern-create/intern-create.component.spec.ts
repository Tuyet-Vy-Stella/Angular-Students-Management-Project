import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternCreateComponent } from './intern-create.component';

describe('InternCreateComponent', () => {
  let component: InternCreateComponent;
  let fixture: ComponentFixture<InternCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
