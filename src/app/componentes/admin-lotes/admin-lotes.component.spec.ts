import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLotesComponent } from './admin-lotes.component';

describe('AdminLotesComponent', () => {
  let component: AdminLotesComponent;
  let fixture: ComponentFixture<AdminLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
