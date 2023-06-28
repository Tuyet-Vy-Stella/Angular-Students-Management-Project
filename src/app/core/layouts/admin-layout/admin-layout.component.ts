import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
    displaySidebar = false;
}
