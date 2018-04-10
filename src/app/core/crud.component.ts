import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'app-crud',
    templateUrl: 'crud.component.html'
})
export class CrudComponent {

    @Input() title = 'Management';
    @Input() columns: Array<String>;
    @Input() readAction = true;
    @Input() createAction = true;
    @Input() editAction = true;
    @Input() deleteAction = true;
    @Input()
    set data(data: any[]) {
        this.dataSource = new MatTableDataSource<any>(data);
    }

    @Output() read = new EventEmitter<any>();
    @Output() create = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    dataSource: MatTableDataSource<any>;

    onRead(item) {
        this.read.emit(item);
    }

    onCreate() {
        this.create.emit();
    }

    onEdit(item) {
        this.edit.emit(item);
    }

    onDelete(item) {
        this.delete.emit(item);
    }

}
