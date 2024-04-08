import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { SaqueComponent } from "../../pages/saque/saque.component";
import { DepositoComponent } from "../../pages/deposito/deposito.component";
import { ExtratoComponent } from "../../pages/extrato/extrato.component";
import { TransferenciaComponent } from "../../pages/transferencia/transferencia.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { ClientesFieisComponent } from "../../pages/clientes-fieis/clientes-fieis.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    SaqueComponent,
    DepositoComponent,
    TransferenciaComponent,
    ExtratoComponent,
    ClientesFieisComponent,
    TablesComponent,
  ],
})
export class AdminLayoutModule {}
