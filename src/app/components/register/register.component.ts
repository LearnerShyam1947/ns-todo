import { Component } from "@angular/core";
import { AuthService } from "./../../services/AuthService.service"
import { RouterExtensions } from "@nativescript/angular";
import { Dialogs } from "@nativescript/core";

@Component({
    selector: 'ns-register',
    templateUrl: "./register.component.html"
})
export class RegisterComponent{
    constructor(
        private authService:AuthService,
        private router:RouterExtensions
    ) {}

    user:any = {
        username: '',
        password: '',
        email: ''
    }

    register() {
        console.log(this.user);
        
        let result = this.authService.register(this.user);
        console.log(result);
        if(result.status == 'success') {
            alert("New account created successfully");
            this.router.navigate(['login']);
        }
        else {
            Dialogs.alert({
                title:'Error...!!',
                message: 'Given email is already in use',
                okButtonText: 'OK',
                cancelable: true
            });
        }
    }
}