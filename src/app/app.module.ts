import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CrearReclamoComponent } from './components/crear-reclamo/crear-reclamo.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CrearReclamoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CrearReclamoComponent
  ]
})
export class AppModule { }
