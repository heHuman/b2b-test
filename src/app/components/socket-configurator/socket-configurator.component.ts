import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, fromEvent, Observable, Subject, takeUntil, tap, throwError } from 'rxjs';
import { SocketConfiguratorService } from 'src/app/services/socket-configurator.service';

@Component({
    selector: 'app-socket-configurator',
    templateUrl: './socket-configurator.component.html',
    styleUrls: ['./socket-configurator.component.scss']
})
export class SocketConfiguratorComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('timerInput') timerInput!: ElementRef<HTMLInputElement>;
    @ViewChild('arraySizeInput') arraySizeInput!: ElementRef<HTMLInputElement>;
    @ViewChild('idListInput') idListInput!: ElementRef<HTMLInputElement>;

    public formGroup!: FormGroup;

    private destroyed$ = new Subject<void>();

    constructor(
        private socketConfiguratorService: SocketConfiguratorService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            timer: this.formBuilder.control(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
            arraySize: this.formBuilder.control(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
            idList: this.formBuilder.control(null)
        });
    }

    ngAfterViewInit(): void {
        this.subscribeToInputs();
    }

    private subscribeToInputs(): void {
        this.subscribeToChangesWithDebounce(this.formGroup.get('timer')!.valueChanges)
            .subscribe(val => this.onTimerValueChanged(val));
        this.subscribeToChangesWithDebounce(this.formGroup.get('arraySize')!.valueChanges)
            .subscribe(val => this.onArraySizeChanged(val));
        this.subscribeToChangesWithDebounce(this.formGroup.get('idList')!.valueChanges)
            .subscribe(val => this.onIdListChanged(val));
    }

    private subscribeToChangesWithDebounce(observable: Observable<any>): Observable<any> {
        return observable.pipe(
            takeUntil(this.destroyed$),
            debounceTime(350),
            tap(_ => {
                this.formGroup.markAllAsTouched();
                if (!this.formGroup.valid) throwError(() => {});
            })
        );
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
        const newIdList = idList?.split(',').map(id => id.trim()).filter(id => id.length > 0) ?? [];
        this.socketConfiguratorService.setIdList(newIdList);
    }
}
