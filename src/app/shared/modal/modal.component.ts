import { Component, Output, Input } from '@angular/core'
import { Subject } from 'rxjs'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  faXmarkIcon = faXmark
  @Input('title') modalTitle = ''
  @Input('content') modalContent = ''
  @Output('onClose') onCloseEvent = new Subject<void>()
  @Output('onAccept') onAcceptEvent = new Subject<void>()

  // On click close button || decline button
  closeModal() {
    this.onCloseEvent.next()
  }

  // On click accept button
  onClickAcceptButton() {
    this.onAcceptEvent.next()
  }
}
