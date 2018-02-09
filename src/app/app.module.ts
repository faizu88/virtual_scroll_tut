import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [],
  imports: [
    BrowserModule,
    FormsModule,
    PaginationModule.forRoot(),
    VirtualScrollModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
