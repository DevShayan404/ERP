import { Component } from '@angular/core';
import { onSideNavChange,animateText } from '../../animations/animations';
import { NavServiceService } from '../../../Sales-Services/nav.service';

interface Page {
  link: string;
  name: string;
  icon: string;
}
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText],
})
export class LeftMenuComponent {
  public sideNavState: boolean = false;
  public linkText: boolean = false;

  public pages: Page[] = [
    { name: 'Home', link: 'Dashboard', icon: 'bi bi-grid-fill' },
    { name: 'Sale leads', link: 'leads', icon: 'bi bi-calendar4-week' },
    { name: 'Calling Data', link: 'callingdata', icon: 'bi bi-inboxes' },
    { name: 'Sales Agent', link: 'agent-type', icon: 'bi bi-clipboard2-pulse' },
    { name: 'Managers', link: 'line-of-biz', icon: 'bi bi-bar-chart-line' },
    { name: 'Agent Master', link: 'agent-master-list', icon: 'bi bi-bell' },
  ];

  constructor(private _sidenavService: NavServiceService) {}

  ngOnInit() {}

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }

}
