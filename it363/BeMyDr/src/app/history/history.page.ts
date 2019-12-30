import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryComponent implements OnInit {
  history = 'date';
  histories = [];
  constructor( private historyService: HistoryService) { }

  ngOnInit() {
    this.historyService.getUserData().then(res => {
      this.histories = JSON.parse(res);
    });
  }

  getDateDiagnosis(date: string) {
    this.historyService.getDiagnosisByDate(date).then(res => {
      this.histories = JSON.parse(res);
    });
  }

}
