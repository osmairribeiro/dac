import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthLayoutRoutes } from "./auth-layout.routing";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthLayoutModule {}
