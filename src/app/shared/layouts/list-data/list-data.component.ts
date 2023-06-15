import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    faBorderAll,
    faChevronLeft,
    faChevronRight,
    faList,
    faMagnifyingGlass,
    faPenToSquare,
    faPlus,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-list-data',
    templateUrl: './list-data.component.html',
    styleUrls: ['./list-data.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ListDataComponent implements OnChanges {
    icons = {
        faList,
        faBorderAll,
        faPlus,
        faChevronLeft,
        faChevronRight,
        faPenToSquare,
        faTrash,
        faMagnifyingGlass,
    };

    @Input() cols!: any[];
    @Input() data!: any[];
    @Input() fetching!: boolean;
    @Input() title: string = '';
    @Input() deleting!: boolean;
    @Input() globalFilterFields: string[] = [];
    @Input() isCaption: boolean = true;
    @Input() disableActions: boolean = false;

    @Output() onAdd = new EventEmitter();
    @Output() onDelete = new EventEmitter<any>();
    @Output() onUpdate = new EventEmitter<any>();

    first: number = 0;
    rows: number = 10;
    page: number = 0;

    dataToShow!: any[];

    ngOnChanges(changes: SimpleChanges): void {
        this.dataToShow = changes['data'].currentValue.slice(
            this.page * this.rows,
            (this.page + 1) * this.rows
        );
    }

    updateDataToShow() {
        this.dataToShow = this.data.slice(
            this.page * this.rows,
            (this.page + 1) * this.rows
        );
    }

    onPageChange(event: any) {
        this.page = event.page;
        this.rows = event.rows;

        this.updateDataToShow();
    }

    onRowChange(event: any) {
        this.rows = event;
        this.updateDataToShow();
    }
}
