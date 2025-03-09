import { Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ProfileSelectionComponent } from './profile-selection/profile-selection.component';

export const routes: Routes = [
    { path: '', component: SplashScreenComponent },
    { path: 'profile-selection', component: ProfileSelectionComponent },
];
