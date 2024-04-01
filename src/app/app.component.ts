import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mbe-Erp';

  users: any[] = [{ name: 'John' }, { name: 'Jane' }, { name: 'Mario' }];
  userFilter: any = { name: '' };
}
