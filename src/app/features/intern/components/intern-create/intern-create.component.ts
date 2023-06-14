import { Component, OnInit, ViewChild } from '@angular/core';
import { InternListComponent } from '../../pages';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-intern-create',
    templateUrl: './intern-create.component.html',
    styleUrls: ['./intern-create.component.scss'],
})
export class InternCreateComponent implements OnInit {
    @ViewChild(InternListComponent, { read: InternListComponent })
    internList: InternListComponent | undefined;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}
    ngOnInit(): void {
        console.log({
            ref: this.ref,
            config: this.config.data.onClose,
        });
    }
    handleClose() {
        console.log(this.internList);
        this.config.data.onClose();
        // this.internList.ref.close();
    }
}
