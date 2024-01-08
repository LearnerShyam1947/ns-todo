import { Injectable } from "@angular/core"
import * as applicationSettings from "@nativescript/core/application-settings";
import { user } from "./../Models/Datatypes"

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    users:any = []; 
    user:any; 

    register(data: user) {
        this.users = applicationSettings.getString("users");
        if(this.users) {
            this.users = JSON.parse(this.users);
        }
        else {
            this.users = [];
        }
        
        let flag:boolean = true;

        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i].email == data.email) {
                flag = false;
                return {
                    'status' : 'failed'
                }
            }
        }

        if(flag) {
            this.users.push(data);
    
            this.users = JSON.stringify(this.users);
            applicationSettings.setString("users", this.users);
    
            return {
                'status' : 'success'
            }
        }
    }

    login(data: user) {
        this.users = applicationSettings.getString("users");
        this.users = JSON.parse(this.users);

        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i].email == data.email &&
                this.users[i].password == data.password) {

                this.user = this.users[i];
                break;
            }
        }

        if(this.user) {
            applicationSettings.setString("user", JSON.stringify(this.user))
            return {
                'status' : 'success'
            }
        }

        else {
            return {
                'status' : 'failed'
            }
        }
    }

    getCurrentUser() :user | null {
        this.user = applicationSettings.getString("user");
        if(this.user) {
            this.user = JSON.parse(this.user);
            return this.user;
        }
        return null;
    }

    logout() {
        applicationSettings.remove("user");
    }
}
