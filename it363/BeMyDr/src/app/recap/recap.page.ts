import { Component, OnInit } from '@angular/core';
import { RecapService } from '../services/recap.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.page.html',
  styleUrls: ['./recap.page.scss'],
})
export class RecapComponent implements OnInit {
  info = '';
  constructor( private recapService: RecapService) { }

  ngOnInit() {
    this.recapService.getUserData().then(res => {
      this.info = res;
    });
  }

}
