import { BrowserModule } from '@angular/platform-browser';
// import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataQueryComponent } from './data-query/data-query.component';
import { SettingComponent } from './setting/setting.component';
import { PopularizeComponent } from './popularize/popularize.component';
import { MyDataComponent } from './my-data/my-data.component';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard';
import { AuthAccountComponent } from './auth-account/auth-account.component';
import { AuthBankComponent } from './auth-bank/auth-bank.component';

import { ShareServiceService} from './service/share-service.service';


const appRoutes: Routes = [
  { path: '', redirectTo: '/query', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'query', component: DataQueryComponent, canActivate: [AuthGuard] },
  { path: 'query/mine', component: MyDataComponent, canActivate: [AuthGuard] },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'popularize', component: PopularizeComponent, canActivate: [AuthGuard] },
  { path: 'auth/account', component: AuthAccountComponent },
  { path: 'auth/bank', component: AuthBankComponent }
]
const authRoutes: Routes = [
  {
    path: 'auth/account', component: AuthAccountComponent, children: [
      {
        path: 'bank',
        component: AuthBankComponent
      }
    ]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DataQueryComponent,
    SettingComponent,
    PopularizeComponent,
    MyDataComponent,
    AuthAccountComponent,
    AuthBankComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    // RouterModule.forChild(authRoutes)
  ],
  providers: [AuthGuard, CookieService, UserService,ShareServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
