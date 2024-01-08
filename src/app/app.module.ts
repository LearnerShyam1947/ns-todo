import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule, NativeScriptFormsModule, NativeScriptCommonModule, NativeScriptHttpClientModule } from '@nativescript/angular'
import { NativeScriptDateTimePickerModule } from "@nativescript/datetimepicker/angular";

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { AddTaskComponent } from "./components/add-task/add-task.component"
import { TaskDetailsComponent } from "./components/task-details/task-details.component"

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptDateTimePickerModule,
    NativeScriptHttpClientModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptModule, 
    AppRoutingModule
  ],
  declarations: [
    AppComponent, 
    HomeComponent,
    LoginComponent,
    AddTaskComponent,
    RegisterComponent,
    TaskDetailsComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
