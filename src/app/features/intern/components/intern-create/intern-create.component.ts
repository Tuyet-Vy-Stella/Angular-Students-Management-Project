import { Component, OnInit, ViewChild } from '@angular/core';
import { InternListComponent } from '../../pages';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-intern-create',
    templateUrl: './intern-create.component.html',
    styleUrls: ['./intern-create.component.scss'],
})
export class InternCreateComponent {
    @ViewChild(InternListComponent, { read: InternListComponent })
    internList: InternListComponent | undefined;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}
}
