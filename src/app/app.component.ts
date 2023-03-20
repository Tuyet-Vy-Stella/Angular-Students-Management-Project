import {Component} from '@angular/core';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMiniSidebar = false
  classes = 'main'
  clickMenuIconSubscription!: Subscription

  ngOnDestroy() {
    this.clickMenuIconSubscription.unsubscribe()
  }

  onClickMenuIcon() {
    this.isMiniSidebar = !this.isMiniSidebar
    this.classes = this.isMiniSidebar ? 'main mini-sidebar' : 'main'
  }

  onClickOverlay() {
    this.isMiniSidebar = true
    this.classes = 'main mini-sidebar'
  }
}
