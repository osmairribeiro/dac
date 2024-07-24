import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const userLogged = authService.userLogged;
  const url = state.url;

  if (userLogged) {
    console.log('usuario logado', userLogged.type);
    const role = route.data?.['role'];
    console.log('role', role);

    if (role && role.indexOf(userLogged.type) === -1) {
      router.navigate(['/login'], {
        queryParams: { error: 'Proibido o acesso a ' + url },
      });
      return false;
    }
    return true;
  }

  router.navigate(['/login'], {
    queryParams: { error: 'Deve fazer o login antes de acessar ' + url },
  });

  return false;
};
