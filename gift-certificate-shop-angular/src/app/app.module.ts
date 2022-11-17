import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// bootstrab library
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ngx-translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// for multiselect and froms
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

// cookie
import { CookieService } from 'ngx-cookie-service';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { GiftCertificateCatalogComponent } from './gift-certificate-catalog/gift-certificate-catalog.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { GiftCertificateListComponent } from './gift-certificate-list/gift-certificate-list.component';
import { FooterComponent } from './semantic-components/footer/footer.component';
import { HeaderComponent } from './semantic-components/header/header.component';
import { NavComponent } from './semantic-components/nav/nav.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { TagEditPageComponent } from './tag-list/tag-edit-page/tag-edit-page.component';
import { GiftCertificateEditPageComponent } from './gift-certificate-list/gift-certificate-edit-page/gift-certificate-edit-page.component';
import { MultiDropdownComponent } from './components/multi-dropdown/multi-dropdown.component';
import { GiftCertificatePageComponent } from './gift-certificate-catalog/gift-certificate-page/gift-certificate-page.component';
import { GiftCertificateCardComponent } from './gift-certificate-catalog/gift-certificate-card/gift-certificate-card.component';
import { CartRowComponent } from './cart-page/cart-row/cart-row.component';
import { GiftCertificateListCardComponent } from './gift-certificate-list/gift-certificate-list-card/gift-certificate-list-card.component';
import { TagListRowComponent } from './tag-list/tag-list-row/tag-list-row.component';
import { TagAddPageComponent } from './tag-list/tag-add-page/tag-add-page.component';
import { GiftCertificateAddPageComponent } from './gift-certificate-list/gift-certificate-add-page/gift-certificate-add-page.component';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { CsrfHeaderInterceptor } from './interceptors/csrf-header.interceptor';
import { LanguageInterceptor } from './interceptors/language.interceptor';
import { UserDataService } from './services/user-data.service';
import { LanguageService } from './services/language.service';
import { UserOrderRowComponent } from './user-page/user-order-row/user-order-row.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListRowComponent } from './user-list/user-list-row/user-list-row.component';
import { UserListUserPageComponent } from './user-list/user-list-user-page/user-list-user-page.component';
import { GlobalErrorHandler } from './error/global-error-handler';
import { GiftCertificateSearchBoxComponent } from './gift-certificate-catalog/gift-certificate-search-box/gift-certificate-search-box.component';
import { GiftCertificateListSearchBoxComponent } from './gift-certificate-list/gift-certificate-list-search-box/gift-certificate-list-search-box.component';
import { TagListSearchBoxComponent } from './tag-list/tag-list-search-box/tag-list-search-box.component';
import { UserListSearchBoxComponent } from './user-list/user-list-search-box/user-list-search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    GiftCertificateCatalogComponent,
    UserPageComponent,
    ErrorPageComponent,
    TagListComponent,
    GiftCertificateListComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    HomePageComponent,
    CartPageComponent,
    TagEditPageComponent,
    GiftCertificateEditPageComponent,
    MultiDropdownComponent,
    GiftCertificatePageComponent,
    GiftCertificateCardComponent,
    CartRowComponent,
    GiftCertificateListCardComponent,
    TagListRowComponent,
    TagAddPageComponent,
    GiftCertificateAddPageComponent,
    UserOrderRowComponent,
    UserListComponent,
    UserListRowComponent,
    UserListUserPageComponent,
    GiftCertificateSearchBoxComponent,
    GiftCertificateListSearchBoxComponent,
    TagListSearchBoxComponent,
    UserListSearchBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // bootstrab library
    NgbModule,

    // for multiselect
    FormsModule,

    // for forms
    ReactiveFormsModule,

    // ngx-translate
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    // cookie
    CookieService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfHeaderInterceptor,
      multi: true,
      deps: [CookieService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
      deps: [UserDataService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true,
      deps: [LanguageService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// ngx-translate
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
