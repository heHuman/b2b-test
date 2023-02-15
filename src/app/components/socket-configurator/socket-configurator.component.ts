import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, withLatestFrom } from 'rxjs';
import { SocketConfiguratorService } from 'src/app/services/socket-configurator.service';
import { SocketFactoryService } from 'src/app/services/socket-factory.service';

@Component({
    selector: 'app-socket-configurator',
    templateUrl: './socket-configurator.component.html',
    styleUrls: ['./socket-configurator.component.scss']
})
export class SocketConfiguratorComponent implements OnInit, OnDestroy {
    private destroyed$ = new Subject<void>();

    constructor(
        private socketConfiguratorService: SocketConfiguratorService,
        private socketFactory: SocketFactoryService
        ) { }

    ngOnInit(): void {
        this.socketConfiguratorService.timerObservable.pipe(
            takeUntil(this.destroyed$),
            withLatestFrom(this.socketConfiguratorService.arraySizeObservable)
        )
        .subscribe(([timer, arraySize]) => {
            this.socketFactory.createSocket(timer, arraySize, this.socketConfiguratorService.getIdList());
        })
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    onTimerValueChanged(event: Event): void {
        const newValue = (event.target as HTMLInputElement).value;
        this.socketConfiguratorService.setTimerValue(Number(newValue));
    }

    onArraySizeChanged(event: Event): void {
        const newArraySize = (event.target as HTMLInputElement).value;
        this.socketConfiguratorService.setArraySize(Number(newArraySize));
    }

    onIdListChanged(event: Event): void {
        const newIdList = (event.target as HTMLInputElement).value?.split(',') ?? [];
        this.socketConfiguratorService.setIdList(newIdList);
    }
}
