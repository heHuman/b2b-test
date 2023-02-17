import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDataTableViewComponent } from './worker-data-table-view.component';

describe('WorkerDataTableViewComponent', () => {
  let component: WorkerDataTableViewComponent;
  let fixture: ComponentFixture<WorkerDataTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerDataTableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDataTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
