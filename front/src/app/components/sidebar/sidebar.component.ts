import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services";
import { MODEL } from "src/app/shared";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission?: string[];
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Tela inicial",
    icon: "ni-tv-2 text-primary",
    class: "",
    permission: ["administrator"],
  },
  {
    path: "/icons",
    title: "Detalhes dos gerentes",
    icon: "ni-planet text-blue",
    class: "",
    permission: ["administrator"],
  },
  {
    path: "/user-profile",
    title: "Pagina inicial cliente",
    icon: "ni-single-02 text-blue",
    class: "",
    permission: ["client"],
  },
  {
    path: "/saque",
    title: "Saque",
    icon: "ni-building text-red",
    class: "",
    permission: ["client"],
  },
  {
    path: "/deposito",
    title: "Deposito",
    icon: "ni-cart text-green",
    class: "",
    permission: ["client"],
  },
  {
    path: "/transferencia",
    title: "Transferência",
    icon: "ni-building text-green",
    class: "",
    permission: ["client"],
  },
  {
    path: "/extrato",
    title: "Extrato",
    icon: "ni-sound-wave text-yellow",
    class: "",
    permission: ["client"],
  },
  {
    path: "/tables",
    title: "Gerenciar auto-cadastro",
    icon: "ni-check-bold text-green",
    class: "",
    permission: ["manager"],
  },
  {
    path: "/clients",
    title: "Clientes",
    icon: "ni-single-02 text-blue",
    class: "",
    permission: ["manager"],
  },
  {
    path: "/clientes-fieis",
    title: "Maiores clientes",
    icon: "ni-single-02 text-blue",
    class: "",
    permission: ["manager"],
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => {
      if (menuItem?.permission?.includes(this.userLogged.type)) {
        return menuItem;
      }
    });

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  get userLogged(): MODEL.User | null {
    return this.authService.userLogged;
  }
}
