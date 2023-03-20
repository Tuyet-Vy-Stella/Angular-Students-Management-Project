import { Subject } from 'rxjs'
import { Component, Output } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() clickMenuIconEvent = new Subject<void>()

  onClickMenuIcon() {
    this.clickMenuIconEvent.next()
  }
}
