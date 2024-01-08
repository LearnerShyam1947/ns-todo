import { Component, OnInit } from "@angular/core"
import { AuthService } from "~/app/services/AuthService.service";
import { TaskService } from "~/app/services/TaskService.service";
import * as applicationSettings from "@nativescript/core/application-settings";
import { RouterExtensions } from "@nativescript/angular";
import { Dialogs } from "@nativescript/core";

@Component({
    selector: 'ns-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

    user:any;
    tasks:any;

    constructor(
        private authService:AuthService,
        private taskService:TaskService,
        private router:RouterExtensions
    ) {}

    ngOnInit(): void {
        this.user = this.authService.getCurrentUser();
        
        if(this.user) {
            this.tasks = this.taskService.getAllTasks(this.user);
        }
    }

    goToTask(data:any) {
        console.log(data);
        data = JSON.stringify(data);
        this.router.navigate(['task', data]);
    }
    
    logout() {
        Dialogs.confirm({
            title: 'Confirm!',
            message: 'Are you sure you want to delete the task?',
            okButtonText: 'Yes',
            cancelButtonText: 'No',
            neutralButtonText: 'Cancel',
        }).then((result) => {
            if(result) {
                this.authService.logout();
                this.router.navigate(['login'], {
                    clearHistory: true
                })
            }
        })
    }
}   
