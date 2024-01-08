import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs } from '@nativescript/core';
import { TaskService } from '~/app/services/TaskService.service';

@Component({
    selector: 'ns-task-details',
    templateUrl: './task-details.component.html'
})

export class TaskDetailsComponent implements OnInit {
    task:any;
    taskId:any;
    description:any;
    isTextChanged:any = 0;

    constructor(
        private taskService:TaskService,
        private router:RouterExtensions,
        private active:ActivatedRoute
    ) { }

    ngOnInit() {
        this.task = this.active.snapshot.params.id;
        this.task = JSON.parse(this.task);
        this.taskId = this.task.id;

        this.description = this.task.description;
    }

    deleteTask() {
        Dialogs.confirm({
            title: 'Confirm!',
            message: 'Are you sure you want to delete the task?',
            okButtonText: 'Yes',
            cancelButtonText: 'No',
            neutralButtonText: 'Cancel',
        }).then((result) => {
            if(result) {
                this.taskService.deleteTask(this.task);
                this.router.navigate(['home'], {
                    clearHistory: true
                })
            }
        })
    }

    textChanged() {
        this.isTextChanged = this.isTextChanged + 1;
    }

    updateDescriptionOfTask() {
        Dialogs.confirm({
            title: 'Confirm!',
            message: 'Are you sure you want to update the task?',
            okButtonText: 'Yes',
            cancelButtonText: 'No',
            neutralButtonText: 'Cancel',
        }).then((result) => {
            if(result) {
                this.taskService.updateTask(this.task, 'description', this.description);
                this.router.navigate(['home'], {
                    clearHistory: true
                });
                // this.toastService.success("Task edited successfully");
            }
        })
    }
    
    markAsComplete() {
        Dialogs.confirm({
            title: 'Confirm!',
            message: 'Are you sure you want to mark this task as complete?',
            okButtonText: 'Yes',
            cancelButtonText: 'No',
            neutralButtonText: 'Cancel',
        }).then((result) => {
            if(result) {
                this.taskService.updateTask(this.task, 'completed', 'yes');
                this.router.navigate(['home'], {
                    clearHistory: true
                })
            }
        })
    }
    
    markAsInComplete() {
        Dialogs.confirm({
            title: 'Confirm!',
            message: 'Are you sure you want to mark this task as complete?',
            okButtonText: 'Yes',
            cancelButtonText: 'No',
            neutralButtonText: 'Cancel',
        }).then((result) => {
            if(result) {
                this.taskService.updateTask(this.task, 'completed', 'no');
                this.router.navigate(['home'], {
                    clearHistory: true
                })
            }
        })
    }
}