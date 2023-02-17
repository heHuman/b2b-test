import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketConfiguratorComponent } from './components/socket-configurator/socket-configurator.component';
import { WorkerDataTableViewComponent } from './components/worker-data-table-view/worker-data-table-view.component';

@NgModule({
    declarations: [
        AppComponent,
        SocketConfiguratorComponent,
        WorkerDataTableViewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
