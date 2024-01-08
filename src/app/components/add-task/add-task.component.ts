import { Component, OnInit } from "@angular/core"
import { RouterExtensions } from "@nativescript/angular";
import { AuthService } from "~/app/services/AuthService.service";
import { TaskService } from "./../../services/TaskService.service";

@Component({
    selector: 'ns-add-task',
    templateUrl: './add-task.component.html'
})
export class AddTaskComponent implements OnInit{
    
    description:any;
    title:any;
    user:any;
    task:any = {
        title : "",
        email : "",
        completed : "",
        description : "",
    };
    
    constructor(
        private router:RouterExtensions,
        private authService:AuthService,
        private taskService:TaskService,
    ) {}

    ngOnInit(): void {
        this.user = this.authService.getCurrentUser();
        if(this.user == null) {
            this.router.navigate(['home']);
        }
        // console.log(this.user);
    }


    addTask() {

        this.task.title = this.title;
        this.task.description = this.description,
        this.task.completed = 'no',
        this.task.email = this.user.email

        console.log(this.task);

        let result = this.taskService.addTask(this.task);
        if(result.status == 'success') {
            alert("Task added successfully");
            this.router.navigate(['home']);
        }
        else {
            alert("Already a task exists with same title");
        }
    }
}
