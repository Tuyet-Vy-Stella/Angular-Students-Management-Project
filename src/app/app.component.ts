import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isShowNav = true;
  isMiniSidebar = false
  classes = 'main'
  clickMenuIconSubscription!: Subscription;

  constructor(private router : Router) {
  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.isShowNav = event.url !== '/auth';
      }
    })
  }

  ngOnDestroy() {
    this.clickMenuIconSubscription.unsubscribe();
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
