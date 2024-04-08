import { Routes } from "@angular/router";
import { ClientsComponent } from "../clients/clients.component";
import { DepositoComponent } from "../deposito/deposito.component";
import { ExtratoComponent } from "../extrato/extrato.component";
import { IconsComponent } from "../icons/icons.component";
import { SaqueComponent } from "../saque/saque.component";
import { TransferenciaComponent } from "../transferencia/transferencia.component";
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { AuthGuard } from "./auth-guard";
import { ClienteComponent } from "../cliente/cliente.component";


export const AdminLayoutRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
//   {
//     path: "dashboard",
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//     data: {
//       role: "administrator",
//     },
//   },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: "client",
    },
  },
//   {
//     path: "signup-validation",
//     component: SignupValidationComponent,
//     canActivate: [AuthGuard],
//     data: {
//       role: "manager",
//     },
//   },
//   {
//     path: "tables",
//     component: TablesComponent,
//     canActivate: [AuthGuard],
//     data: {
//       role: "manager",
//     },
//   },
//   {
//     path: "clientes-fieis",
//     component: ClientesFieisComponent,
//     canActivate: [AuthGuard],
//     data: {
//       role: "manager",
//     },
//   },
  {
    path: "clients",
    component: ClientsComponent,
    canActivate: [AuthGuard],
    data: {
      role: "manager",
    },
  },
  {
    path: "saque",
    component: SaqueComponent,
    canActivate: [AuthGuard],
    data: {
      role: "client",
    },
  },
  {
    path: "deposito",
    component: DepositoComponent,
    canActivate: [AuthGuard],
    data: {
      role: "client",
    },
  },
  {
    path: "transferencia",
    component: TransferenciaComponent,
    canActivate: [AuthGuard],
    data: {
      role: "client",
    },
  },
  {
    path: "extrato",
    component: ExtratoComponent,
    canActivate: [AuthGuard],
    data: {
      role: "client",
    },
  },
  {
    path: "icons",
    component: IconsComponent,
    canActivate: [AuthGuard],
    data: {
      role: "administrator",
    },
  },
  {
    path: "client/:id",
    component: ClienteComponent,
    canActivate: [AuthGuard],
    data: {
      role: "manager",
    },
  },
];
