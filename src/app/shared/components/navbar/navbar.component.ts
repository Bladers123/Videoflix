import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { ChangeUserDataDialogComponent } from "./change-user-data-dialog/change-user-data-dialog.component";
import { CommonModule } from '@angular/common';
import { LegalNoticeComponent } from "../../../legal-notice/legal-notice.component";
import { PrivacyPolicyComponent } from "../../../privacy-policy/privacy-policy.component";



@Component({
    selector: 'app-navbar',
    imports: [RouterModule, ButtonModule, Menu, ChangeUserDataDialogComponent, CommonModule, LegalNoticeComponent, PrivacyPolicyComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})



export class NavbarComponent implements OnInit {

    items: MenuItem[] | undefined;
    changeProfileDataDialogVisible: boolean = false;
    privacyPolicyVisible: boolean = false;
    legalNoticeVisible: boolean = false;


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
                        label: 'Impressum',
                        icon: PrimeIcons.HOME,
                        command: () => {
                            this.onLegalNotice();
                        }
                    },
                    {
                        label: 'Datenschutzerklärung',
                        icon: PrimeIcons.BOOK,
                        command: () => {
                            this.onPrivacyPolicy();
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


    onPrivacyPolicy() {
        this.privacyPolicyVisible = true;
    }
    onLegalNotice() {
        this.legalNoticeVisible = true;
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

    onClosePrivacyPolicy() {
        this.privacyPolicyVisible = false;
    }

    onCloseLegalNotice() {
        this.legalNoticeVisible = false;
    }

    onClosecCangeProfileDataDialog() {
        this.changeProfileDataDialogVisible = false;
    }


}
