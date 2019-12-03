import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

declare var ApiAIPromises: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  answer: string;

  constructor(
    public platform: Platform, 
    public ngZone: NgZone,
    private navCtrl: NavController,
    private authService: AuthenticateService
    ) {
      platform.ready().then(() => {
        ApiAIPromises.init({
          clientAccessToken: 'b6c69c510be742a09ad5aa6404566dc6'
        }).then(result => console.log(result));
      });
  }

  ngOnInit() {
    if (this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack('');
    }
  }

  ask(question) {
    ApiAIPromises.requestText({
      query: question
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(() => {
         this.answer = speech;
       });
    });
  }

  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
  }
}

