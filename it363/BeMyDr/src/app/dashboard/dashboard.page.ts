import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { ChatbotService, Message } from '../services/chatbot.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/scan';

declare var ApiAIPlugin: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  messages: Observable<Message[]>;
  formValue: string;
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private chat: ChatbotService,
    private speechRecognition: SpeechRecognition,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (this.platform.is('cordova')) {
      this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            );
        }
      });
    } else {
      // You're testing in browser, do nothing or mock the plugins' behaviour.
      //
      // var url: string = 'assets/mock-images/image.jpg';
      console.log('browser');
    }
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation
      .asObservable()
      .scan((acc, val) => acc.concat(val));
  }

  start() {
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          console.log(matches);
          this.formValue = matches[0];
          alert(this.formValue);
        }
      );
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

  logout() {
    this.authService
      .logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
