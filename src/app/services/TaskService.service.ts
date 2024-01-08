import { Injectable } from "@angular/core"
import * as applicationSettings from "@nativescript/core/application-settings";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    getAllTasks(user:any) {
        let userTasks:any = [];
        let tasks:any = applicationSettings.getString("tasks");

        if(tasks) {
            tasks = JSON.parse(tasks);
            for(let i = 0; i < tasks.length; i++) {
                if(user.email == tasks[i].email) {
                    userTasks.push(tasks[i]);
                }
            }
            return userTasks;
        }
        return null;
    }
    
    addTask(data:any) {
        let taskId:any = applicationSettings.getNumber("taskId");
        let tasks:any = applicationSettings.getString("tasks");

        if(tasks) {
            tasks = JSON.parse(tasks);
        } else {
            tasks = [];
        }

        for (let index = 0; index < tasks.length; index++) {
            if(tasks[index].title == data.title) {
                return {'status' : 'failed'}
            }
        }

        if(taskId) {
            taskId = taskId + 1;
        } else {
            taskId = 1;
        }
        applicationSettings.setNumber("taskId", taskId);

        data.id=taskId;
        tasks.push(data);

        tasks = JSON.stringify(tasks);
        applicationSettings.setString("tasks", tasks);
        return {
            'status' : 'success'
        }
    }

    updateTask(data:any, type:any, value:any) {
        let tasks:any = applicationSettings.getString("tasks");
        tasks = JSON.parse(tasks);
        console.log(tasks);
        
        if(type == 'completed') {
            data.completed = value;
        }
        else {
            data.description = value
        }
        
        tasks = this.removeByAttr(tasks, 'id', data.id);
        tasks.push(data);
        console.log(tasks);
        tasks = JSON.stringify(tasks);
        applicationSettings.setString("tasks", tasks);
    }

    removeByAttr(arr:any, attr:any, value:any){
        var i = arr.length;
        while(i--){
           if( arr[i] 
               && arr[i].hasOwnProperty(attr) 
               && (arguments.length > 2 && arr[i][attr] === value ) ){ 
                
               arr.splice(i,1);
    
           }
        }
        return arr;
    }

    deleteTask(data:any) {
        let tasks:any = applicationSettings.getString("tasks");
        tasks = JSON.parse(tasks);
        console.log(tasks);
        
        tasks = this.removeByAttr(tasks, 'id', data.id);

        console.log(tasks);
        tasks = JSON.stringify(tasks);
        applicationSettings.setString("tasks", tasks);
    }
}