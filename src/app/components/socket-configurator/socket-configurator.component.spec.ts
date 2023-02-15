import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketConfiguratorComponent } from './socket-configurator.component';

describe('SocketConfiguratorComponent', () => {
  let component: SocketConfiguratorComponent;
  let fixture: ComponentFixture<SocketConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocketConfiguratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocketConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
