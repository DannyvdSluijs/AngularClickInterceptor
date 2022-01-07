import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HrefInterceptorService } from './ClickInterceptor/HrefInterceptorService';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot([])],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(hrefInterceptorService: HrefInterceptorService) {}
}
