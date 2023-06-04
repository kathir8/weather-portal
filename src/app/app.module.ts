import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { CelToFahPipe } from './utils/cel-to-fah.pipe'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CelToFahPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
