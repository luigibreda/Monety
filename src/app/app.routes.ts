import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './services/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ArquivosComponent } from './pages/arquivos/arquivos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "arquivos",
        component: ArquivosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "usuarios",
        component: UsuariosComponent,
        canActivate: [AuthGuard],
        data: { isAdmin: true } 
    },
    {
        path: "configuracoes",
        component: ConfiguracoesComponent,
        canActivate: [AuthGuard],
        data: { isAdmin: true } 
    },
    {
        path: "perfil",
        component: PerfilComponent,
        canActivate: [AuthGuard]
    }
];
