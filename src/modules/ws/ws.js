/* eslint-disable max-len */
/* eslint-disable camelcase */

import { messenger } from '../../app';

/* eslint-disable class-methods-use-this */
export default class Ws {
  constructor(pop_Up, appState) {
    this.appState = appState;
    this.pop_Up = pop_Up;
    if (!this.ws) {
      this.ws = new WebSocket('ws://localhost:8080');
      this.addEventListener();
    }
  }

  addEventListener() {
    this.ws.addEventListener('open', () => { console.log('WS соединенеие установлено'); });
    this.ws.addEventListener('message', (e) => {
      this.handlerMessage(e);
    });
    this.ws.addEventListener('close', (e) => {
      this.handlerCloseWS(e);
    });
    this.ws.addEventListener('error', (e) => {
      this.handlerErrorWS(e);
    });
  }

  sendMessage(message) {
    if (this.ws.readyState === WebSocket.OPEN) { this.ws.send(message); }
    this.login = JSON.parse(message).login;// прокинул имя пользователя в ws
  }

  handlerMessage(e) {
    console.log('Пришло сообщеиние', e);
    const { action, response } = JSON.parse(e.data);
    if (action === 'signIn' && this.login) {
      if (response.status === 'ok') {
        this.pop_Up.closepopUp();
        this.pop_Up.openMessenger(response.activeUsers, this.login);
        this.appState.saveStateActiveUsers(response.activeUsers, this.login);
        // this.ws.close();
      } else {
        document.querySelector('.form_inputNickName').value = '';
        // eslint-disable-next-line no-alert
        alert('Пользователь с таким именем в чате уже зарегистрирован');
      }
    }
    if (action === 'postMessage') {
      if (response.login === this.login) return;
      messenger.renderingMessage(response.message, response.dateMessage, response.login);
    }
  }

  handlerCloseWS(e) {
    this.message = JSON.stringify({
      action: 'deleteUser',
      login: this.login,
    });
    this.sendMessage(this.message);
    console.log('Соединенеие закрыто', e);
  }

  handlerErrorWS(e) {
    console.log('Произошла ошибка', e);
  }
}
