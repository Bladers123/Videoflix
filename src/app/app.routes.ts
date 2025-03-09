import { Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileSelectionComponent } from './profile-selection/profile-selection.component';
import { HomeComponent } from './home/home.component';




export const routes: Routes = [
    { path: 'd', component: SplashScreenComponent },
    { path: '', component: AuthComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile-selection', component: ProfileSelectionComponent },
];
