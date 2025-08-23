import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLugaresComponent } from './admin-lugares.component';

describe('AdminLugaresComponent', () => {
  let component: AdminLugaresComponent;
  let fixture: ComponentFixture<AdminLugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLugaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
