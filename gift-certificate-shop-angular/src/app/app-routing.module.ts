import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { GiftCertificateCatalogComponent } from './gift-certificate-catalog/gift-certificate-catalog.component';
import { UserPageComponent } from './user-page/user-page.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { GiftCertificateListComponent } from './gift-certificate-list/gift-certificate-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { TagEditPageComponent } from './tag-list/tag-edit-page/tag-edit-page.component';
import { GiftCertificateEditPageComponent } from './gift-certificate-list/gift-certificate-edit-page/gift-certificate-edit-page.component';
import { GiftCertificatePageComponent } from './gift-certificate-catalog/gift-certificate-page/gift-certificate-page.component';
import { TagAddPageComponent } from './tag-list/tag-add-page/tag-add-page.component';
import { GiftCertificateAddPageComponent } from './gift-certificate-list/gift-certificate-add-page/gift-certificate-add-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { AuthenticationGuard } from './guards/authentication.guard';
import { UserListUserPageComponent } from './user-list/user-list-user-page/user-list-user-page.component';

const routes: Routes = [
  {path: '', canActivate:[AuthenticationGuard], runGuardsAndResolvers: 'always', children: [
    {path: 'home-page', component: HomePageComponent},
    {path: 'login-page', component: LoginPageComponent},
    {path: 'registration-page', component: RegistrationPageComponent},
    {path: 'gift-certificate-catalog', component: GiftCertificateCatalogComponent},
    {path: 'cart-page', component: CartPageComponent},
    {path: 'tag-list', component: TagListComponent},
    {path: 'gift-certificate-list', component: GiftCertificateListComponent},
    {path: 'tag-edit-page/:id', component: TagEditPageComponent},
    {path: 'gift-certificate-edit-page/:id', component: GiftCertificateEditPageComponent},
    {path: 'tag-add-page', component: TagAddPageComponent},
    {path: 'gift-certificate-add-page', component: GiftCertificateAddPageComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'gift-certificate-page/:id', component: GiftCertificatePageComponent},
    {path: 'user-page', component: UserPageComponent},
    {path: 'user-list-user-page/:id', component: UserListUserPageComponent},

    {path: 'error-page', component: ErrorPageComponent},
    {path: '', redirectTo: '/home-page', pathMatch: 'full'},
    {path: '**', component: ErrorPageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
