import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SocketConfiguratorService } from 'src/app/services/socket-configurator.service';

import { SocketConfiguratorComponent } from './socket-configurator.component';

fdescribe('SocketConfiguratorComponent', () => {
    let component: SocketConfiguratorComponent;
    let fixture: ComponentFixture<SocketConfiguratorComponent>;
    let configuratorServiceSpy: SocketConfiguratorService;


    beforeEach(async () => {
        configuratorServiceSpy = jasmine.createSpyObj(SocketConfiguratorService, ['setTimerValue', 'setArraySize']);
        await TestBed.configureTestingModule({
            declarations: [SocketConfiguratorComponent],
            providers: [
                { provide: SocketConfiguratorService, useValue: configuratorServiceSpy }
            ]
        })
            .compileComponents();

        TestBed.inject(SocketConfiguratorService);

        fixture = TestBed.createComponent(SocketConfiguratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onTimerValueChanged called with a truthy parameter', () => {
        it('should call SocketConfiguratorService.setTimerValue', () => {
            component.onTimerValueChanged('araeg');
            expect(configuratorServiceSpy.setTimerValue).toHaveBeenCalled();
        });
    });

    describe('onTimerValueChanged called with a falsy parameter', () => {
        it('should not call SocketConfiguratorService.setTimerValue', () => {
            component.onTimerValueChanged('');
            expect(configuratorServiceSpy.setTimerValue).not.toHaveBeenCalled();
        });
    });

    describe('onArraySizeChanged called with a falsy parameter', () => {
        it('should not call SocketConfiguratorService.setArraySize', () => {
            component.onArraySizeChanged('');
            expect(configuratorServiceSpy.setArraySize).not.toHaveBeenCalled();
        });
    });

    describe('onArraySizeChanged called with a truthy parameter', () => {
        it('should call SocketConfiguratorService.setArraySize', () => {
            component.onArraySizeChanged('araeg');
            expect(configuratorServiceSpy.setArraySize).toHaveBeenCalled();
        });
    });
});
