import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@im-angular/authentication';

import { RootComponent } from './components/root/root.component';
import { HomeComponent } from './components/home/home.component';

import { ApplicationsResolve } from './resolvers/applications.resolve';

const routes: Routes = [  
  { path:'', component: RootComponent, canActivate: [AuthenticationGuard], children: [  
    { path: 'home', component: HomeComponent, resolve: { applications: ApplicationsResolve}},
    { path: 'organizations', loadChildren: 'app/modules/organization/organization.module#OrganizationModule'},
    { path: 'users', loadChildren: 'app/modules/administration/administration.module#AdministrationModule'}
  ]},
  { path: 'e-smat', loadChildren: 'app/modules/esmat/esmat.module#EsmatModule'},
  { path: 'e-risk', loadChildren: 'app/modules/erisk/erisk.module#EriskModule'},
  { path: 'e-action', loadChildren: 'app/modules/eaction/eaction.module#EactionModule'},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }