import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-classroom-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  faXmarkIcon = faXmark;
  @Input() teacherList$!: Observable<
    {
      id: number;
      name: string;
      subject_name: string;
    }[]
  >;
  @Input('title') modalTitle = '';
  @Input('content') modalContent = '';
  @Output('onClose') onCloseEvent = new Subject<void>();
  @Output('onAccept') onAcceptEvent = new Subject<number>();

  @ViewChild('teacherSelect', { static: true })
  teacherSelectEl!: ElementRef<HTMLSelectElement>;
  teacherId!: number;

  teacherList: {
    id: number;
    name: string;
    subject_name: string;
  }[] = [];

  // On click close button || decline button
  closeModal() {
    this.onCloseEvent.next();
  }

  // On click accept button
  onClickAcceptButton() {
    const target = this.teacherSelectEl.nativeElement.value;
    this.onAcceptEvent.next(+target);
  }

  ngOnInit(): void {
    this.teacherList$.subscribe((data) => {
      this.teacherList = data;
      this.teacherSelectEl.nativeElement.selectedIndex = 0;
    });
  }
}
