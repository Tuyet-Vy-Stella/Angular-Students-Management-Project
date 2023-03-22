import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMiniSidebar = true
  classes = 'main main mini-sidebar'

  onClickMenuIcon() {
    this.isMiniSidebar = !this.isMiniSidebar
    this.classes = this.isMiniSidebar ? 'main mini-sidebar' : 'main'
  }

  onClickOverlay() {
    this.isMiniSidebar = true
    this.classes = 'main mini-sidebar'
  }
}
