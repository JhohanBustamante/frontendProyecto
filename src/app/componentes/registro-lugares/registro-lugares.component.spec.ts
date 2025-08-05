import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroLugaresComponent } from './registro-lugares.component';

describe('RegistroLugaresComponent', () => {
  let component: RegistroLugaresComponent;
  let fixture: ComponentFixture<RegistroLugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroLugaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
