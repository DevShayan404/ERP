import { Component } from '@angular/core';
import { NavServiceService } from '../../Sales-Services/nav.service';
import { onMainContentChange } from '../animations/animations';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [ onMainContentChange ]
})
export class NavbarComponent {
  public onSideNavChange: boolean | undefined;

  constructor(private _sidenavService: NavServiceService) { 
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })
  }
  
  

  ngOnInit(): void {
  }
}
