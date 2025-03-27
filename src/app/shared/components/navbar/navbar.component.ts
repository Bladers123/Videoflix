import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { ChangeUserDataDialogComponent } from "./change-user-data-dialog/change-user-data-dialog.component";
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-navbar',
    imports: [RouterModule, ButtonModule, Menu, ChangeUserDataDialogComponent, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})



export class NavbarComponent implements OnInit {

    items: MenuItem[] | undefined;
    changeProfileDataDialogVisible: boolean = false;


    constructor(private authService: AuthService, private profileService: ProfileService) { }

    ngOnInit() {
        this.loadMenuItems();
    }

    loadMenuItems() {
        this.items = [
            {
                label: 'Optionen',
                items: [
                    {
                        label: 'Accountdaten ändern',
                        icon: PrimeIcons.USER_EDIT,
                        command: () => {
                            this.onChangeAccountData();
                        }
                    },
                    {
                        label: 'Profil wechseln',
                        icon: PrimeIcons.WINDOW_MINIMIZE,
                        command: () => {
                            this.onChangeProfile();
                        }
                    },
                    {
                        label: 'Ausloggen',
                        icon: PrimeIcons.SIGN_OUT,
                        command: () => {
                            this.onLogout();
                        }
                    }
                ]
            }
        ];
    }

    onChangeAccountData() {
        this.changeProfileDataDialogVisible = true;
    }

    onChangeProfile() {
        this.profileService.changeProfile();
    }

    onLogout() {
        this.authService.logout();
    }

    onClosecCangeProfileDataDialog(){
        this.changeProfileDataDialogVisible = false;
    }
    

}
