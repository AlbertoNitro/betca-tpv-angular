import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementDialogComponent } from './role-management-dialog.component';

describe('RoleManagementDialogComponent', () => {
  let component: RoleManagementDialogComponent;
  let fixture: ComponentFixture<RoleManagementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
