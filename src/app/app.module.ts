import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataQueryComponent } from './data-query/data-query.component';
import { SettingComponent } from './setting/setting.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'query', component: DataQueryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'setting', component: SettingComponent },
  // { path: 'test', component: TestComponent },
  // { path: 'socket', component: SocketComponent, canActivate: [AuthGuard] }
]



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DataQueryComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
