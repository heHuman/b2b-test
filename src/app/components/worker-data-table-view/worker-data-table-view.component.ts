import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataItem } from 'src/app/model/array-item';
import { WorkerMessagingService } from 'src/app/services/worker-messaging.service';

type DataItemKey = keyof DataItem;
@Component({
    selector: 'app-worker-data-table-view',
    templateUrl: './worker-data-table-view.component.html',
    styleUrls: ['./worker-data-table-view.component.scss'],
})
export class WorkerDataTableViewComponent implements OnInit, OnDestroy {

    public dataSource: DataItem[] = [];
    public columnsToDisplay: string[] = ['id', 'int', 'float', 'color', 'child'];
    public simpleTextColumns: DataItemKey[] = ['id', 'int', 'float'];

    private destroyed$ = new Subject<void>();

    constructor(
        private workerMessagingService: WorkerMessagingService
    ) { }

    ngOnInit(): void {
        this.workerMessagingService.messagesFromWorker.pipe(
            takeUntil(this.destroyed$)
        )
        .subscribe(data => {
            this.dataSource = data;
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }
}
