import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrearReclamoComponent } from './components/crear-reclamo/crear-reclamo.component';
import { ReclamosComponent } from './components/reclamos/reclamos.component';
import { HttpClientModule } from '@angular/common/http';
import { ReclamosService } from './services/reclamos/reclamos.service';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    NavbarComponent,
    CrearReclamoComponent,
    ReclamosComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ReclamosService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CrearReclamoComponent
  ]
})
export class AppModule { }
