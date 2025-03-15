// app.routes.ts
import { Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileSelectionComponent } from './profile-selection/profile-selection.component';
import { HomeComponent } from './home/home.component';




export const routes: Routes = [
    { path: '', component: SplashScreenComponent },
    { path: 'auth', component: AuthComponent }, 
    { path: 'profile-selection', component: ProfileSelectionComponent },
    { path: 'home', component: HomeComponent },
];
