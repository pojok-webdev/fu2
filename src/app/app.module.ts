import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx'
import { LazyComponent } from './lazy/lazy.component';
import { SearchticketComponent } from './searchticket/searchticket.component';
import { EditorModule } from '@tinymce/tinymce-angular'
@NgModule({
  declarations: [AppComponent,LazyComponent,SearchticketComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, EditorModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HttpClientModule,HTTP],
  bootstrap: [AppComponent],
})
export class AppModule {}
