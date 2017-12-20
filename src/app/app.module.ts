import { BrowserModule } from '@angular/platform-browser';
// import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataQueryComponent } from './data-query/data-query.component';
import { SettingComponent } from './setting/setting.component';
import { PopularizeComponent } from './popularize/popularize.component';
import { PopularizeNoAvatarComponent } from './popularize-no-avatar/popularize-no-avatar.component';
import { MyDataComponent } from './my-data/my-data.component';

import { CookieModule } from 'ngx-cookie';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard';
import { AuthAccountComponent } from './auth-account/auth-account.component';
import { AuthBankComponent } from './auth-bank/auth-bank.component';

import { ShareServiceService } from './service/share-service.service';
import { LandPageComponent } from './land-page/land-page.component';
import { TeamworkComponent } from './pact/teamwork/teamwork.component';
import { MarkComponent } from './pact/mark/mark.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/popularize', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'query', component: DataQueryComponent, canActivate: [AuthGuard] },
  { path: 'query/mine', component: MyDataComponent, canActivate: [AuthGuard] },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'popularize/style_no_avatar', component: PopularizeNoAvatarComponent, canActivate: [AuthGuard] },
  { path: 'popularize/style_with_avatar', component: PopularizeComponent, canActivate: [AuthGuard] },
  { path: 'popularize', component: LandPageComponent, canActivate: [AuthGuard] },
  { path: 'auth/account', component: AuthAccountComponent },
  { path: 'auth/bank', component: AuthBankComponent },
  { path: 'auth/teamwork',component:TeamworkComponent},
  { path: 'auth/mark',component:MarkComponent}
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
    LandPageComponent,
    PopularizeNoAvatarComponent,
    TeamworkComponent,
    MarkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    ClipboardModule,
    CookieModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    // RouterModule.forChild(authRoutes)
  ],
  providers: [AuthGuard, UserService, ShareServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
