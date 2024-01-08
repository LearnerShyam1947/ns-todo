import { Component, OnInit } from "@angular/core"
import { AuthService } from "./../../services/AuthService.service"
import { Dialogs } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    constructor(
        private authService:AuthService,
        private router:RouterExtensions
    ) {}

    ngOnInit(): void {
        if(this.authService.getCurrentUser()) {
            this.router.navigate(['home'], {
                clearHistory: true
            })
        }
    }

    user:any = {
        username: '',
        password: '',
        email: ''
    }

    login() {
        let result = this.authService.login(this.user);
        if(result.status == 'success') {
            this.router.navigate(['home'])
        }
        else {
            Dialogs.alert({
                title:'Error...!!',
                message: 'Invalid details provided....',
                okButtonText: 'OK',
                cancelable: true
            });
        }
    }
}   