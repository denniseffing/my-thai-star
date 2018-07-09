import { Component, OnInit } from '@angular/core';
import { UserAreaService } from '../user-area/shared/user-area.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private userAuth: UserAreaService) {
    userAuth.handleAuthentication();
   }

  ngOnInit() {
  }

}
