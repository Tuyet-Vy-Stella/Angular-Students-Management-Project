import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent, SidebarComponent, FooterComponent } from './layouts';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [HeaderComponent, SidebarComponent, FooterComponent],
    imports: [
        CommonModule,
        SidebarModule,
        RouterModule,
        FontAwesomeModule,
        InputTextModule,
        ButtonModule,
    ],
    exports: [HeaderComponent, SidebarComponent, FooterComponent],
})
export class CoreModule {}
