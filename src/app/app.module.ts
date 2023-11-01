import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { HomeComponent } from './modules/admin/apps/home/home.component';
import { ShowAllChapterComponent } from './modules/admin/apps/show-all-chapter/show-all-chapter.component';
import { ShowLessonsComponent } from './modules/admin/apps/show-lessons/show-lessons.component';
import { ShowLessonDiscComponent } from './modules/admin/apps/show-lesson-disc/show-lesson-disc.component';
import { ShowTestComponent } from './modules/admin/apps/show-test/show-test.component';
import { ShowExerciceComponent } from './modules/admin/apps/show-exercice/show-exercice.component';
import { ProfilComponent } from './modules/admin/apps/profil/profil.component';
import { PaymentComponent } from './modules/admin/apps/payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { EditProfilComponent } from './modules/admin/apps/profil/edit_profil/edit-profil/edit-profil.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FuseCardModule } from '@fuse/components/card';
import { MatButtonModule } from '@angular/material/button';
import { LanguagesModule } from "./layout/common/languages/languages.module";
import { ShortcutsModule } from "./layout/common/shortcuts/shortcuts.module";
import { SearchModule } from "./layout/common/search/search.module";
import { MessagesModule } from "./layout/common/messages/messages.module";
import { NotificationsModule } from "./layout/common/notifications/notifications.module";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from './shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ChaaatComponent } from './modules/admin/apps/chatmm/chaaat/chaaat.component';
import { AboutComponent } from './modules/admin/apps/about_us/about/about.component';
import { PartnersComponent } from './modules/admin/apps/partners/partners/partners.component';
import { ContactComponent } from './modules/admin/apps/contact_us/contact/contact.component';
import { MettingComponent } from './modules/admin/apps/metting/metting/metting.component';
import { ShowanswerComponent } from './modules/admin/apps/showanswer/showanswer.component';
import { CertificateComponent } from './modules/admin/apps/certificate/certificate.component';
import { HistoricalComponent } from './modules/admin/apps/historical/historical.component';


const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ShowAllChapterComponent,
        ShowLessonsComponent,
        ShowLessonDiscComponent,
        ShowTestComponent,
        ShowExerciceComponent,
        ProfilComponent,
        PaymentComponent,
        EditProfilComponent,
        ChaaatComponent,
        AboutComponent,
        PartnersComponent,
        ContactComponent,
        MettingComponent,
        ShowanswerComponent,
        CertificateComponent,
        HistoricalComponent,
        
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        // Core module of your application
        CoreModule,
        // Layout module of your application
        LayoutModule,
        FuseCardModule,
        MatButtonModule,
        MatIconModule,
        // <----- this module will be deprecated in the future version.
        MatDatepickerModule,
        MatNativeDateModule,
        LanguagesModule,
        ShortcutsModule,
        SearchModule,
        MessagesModule,
        NotificationsModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatFormFieldModule,
     

        MatSidenavModule,
        MatSlideToggleModule,
        SharedModule, MatTabsModule
    ]
})
export class AppModule
{
}
