import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketConfiguratorComponent } from './components/socket-configurator/socket-configurator.component';
import { TableViewComponent } from './components/table-view/table-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SocketConfiguratorComponent,
    TableViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
