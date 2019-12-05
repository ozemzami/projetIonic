import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  readonly token = environment.dialogflow.chatbot;
  readonly client = new ApiAiClient({accessToken: this.token});

  conversation = new BehaviorSubject<Message[]>([]);
  speech = '';

  constructor() { }

  talk() {
    this.client.textRequest('Hi')
      .then(res => res );
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  // Sends and receives messages via dialogflow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);


    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        const botMessage = new Message(speech, 'bot');
        this.update(botMessage);
      });
  }


}
