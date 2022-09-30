import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoComponent } from './components/info/info.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ChipComponent } from './components/chip/chip.component';
import { SslGridComponent } from './components/ssl-grid/ssl-grid.component';
import { SslTableComponent } from './components/ssl-table/ssl-table.component';
import { RemainingDaysComponent } from './components/remaining-days/remaining-days.component';
import { LogoutIconComponent } from './components/icons/logout-icon.component';
import { BellIconComponent } from './components/icons/bell-icon.component';
import { TableIconComponent } from './components/icons/table-icon.component';
import { ListIconComponent } from './components/icons/list-icon.component';
import { MaximizeIconComponent } from './components/icons/maximize-icon.component';
import { MinimizeIconComponent } from './components/icons/minimize-icon.component';
import { GridIconComponent } from './components/icons/grid-icon.component';

// icon components
const iconComponents = [
  LogoutIconComponent,
  MaximizeIconComponent,
  MinimizeIconComponent,
  BellIconComponent,
  TableIconComponent,
  ListIconComponent,
  GridIconComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    FooterComponent,
    AuthLayoutComponent,
    AppLayoutComponent,
    HeaderComponent,
    InfoComponent,
    BadgeComponent,
    ChipComponent,
    SslGridComponent,
    SslTableComponent,
    RemainingDaysComponent,
    ...iconComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
