import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { SocketConfiguratorService } from 'src/app/services/socket-configurator.service';

@Component({
    selector: 'app-socket-configurator',
    templateUrl: './socket-configurator.component.html',
    styleUrls: ['./socket-configurator.component.scss']
})
export class SocketConfiguratorComponent implements AfterViewInit, OnDestroy {
    @ViewChild('timerInput') timerInput!: ElementRef<HTMLInputElement>;
    @ViewChild('arraySizeInput') arraySizeInput!: ElementRef<HTMLInputElement>;
    @ViewChild('idListInput') idListInput!: ElementRef<HTMLInputElement>;

    private destroyed$ = new Subject<void>();

    constructor(private socketConfiguratorService: SocketConfiguratorService) { }

    ngAfterViewInit(): void {
        this.subscribeToInputs();
    }

    private subscribeToInputs(): void {
        this.subscribeToInputWithMethod(this.timerInput.nativeElement, this.onTimerValueChanged.bind(this));
        this.subscribeToInputWithMethod(this.arraySizeInput.nativeElement, this.onArraySizeChanged.bind(this));
        this.subscribeToInputWithMethod(this.idListInput.nativeElement, this.onIdListChanged.bind(this));
    }

    private subscribeToInputWithMethod(input: HTMLInputElement, handlerMethod: (param: string) => void): void {
        fromEvent(input, 'keyup').pipe(
            takeUntil(this.destroyed$),
            debounceTime(500)
        )
        .subscribe(event => handlerMethod((event.target as HTMLInputElement).value));
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    onTimerValueChanged(newValue: string): void {
        if (!newValue) return;
        this.socketConfiguratorService.setTimerValue(Number(newValue));
    }

    onArraySizeChanged(newArraySize: string): void {
        if (!newArraySize) return;
        this.socketConfiguratorService.setArraySize(Number(newArraySize));
    }

    onIdListChanged(idList: string): void {
        const newIdList = idList?.split(',') ?? [];
        this.socketConfiguratorService.setIdList(newIdList);
    }
}
