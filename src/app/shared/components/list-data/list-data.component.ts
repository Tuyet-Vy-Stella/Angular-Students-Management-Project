import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColListData, PaginationListData } from './list-data.model';

@Component({
    selector: 'app-list-data',
    templateUrl: './list-data.component.html',
    styleUrls: ['./list-data.component.scss'],
})
export class ListDataComponent {
    @Input() data!: any[];
    @Input() cols!: ColListData[];
    @Input() title: string = '';
    @Input() fetching!: boolean;

    @Input() actions: ('update' | 'delete')[] = [];
    @Input() pagination!: PaginationListData;
    @Input() deleting!: boolean;
    @Input() isCaption = true;

    @Output() onAdd = new EventEmitter();
    @Output() onDelete = new EventEmitter<any>();
    @Output() onUpdate = new EventEmitter<any>();
    @Output() onPageChange = new EventEmitter<number>();
    @Output() onSearch = new EventEmitter<any>();
}
