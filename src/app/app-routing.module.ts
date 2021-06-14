import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';

const routes: Routes = [
  {
    path: '', 
    component: LogInFormComponent
   },
   {
    path: 'login', 
    component: LogInFormComponent
   },
  {
    path: 'home', 
    component: HomeComponent
   },
   {
    path: 'header', 
    component: HeaderComponent
   },
   {
    path: 'footer', 
    component: FooterComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
