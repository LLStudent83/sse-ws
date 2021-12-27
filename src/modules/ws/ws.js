/* eslint-disable max-len */
/* eslint-disable camelcase */

// eslint-disable-next-line import/no-cycle
import { messenger } from '../../app';

/* eslint-disable class-methods-use-this */
export default class Ws {
  constructor(pop_Up, appState) {
    this.appState = appState; // B
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
        this.pop_Up.openMessenger(response.activeUsers, this.login, response.allMessages);
        // this.appState.saveStateActiveUsers(response.activeUsers, this.login); // B
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

  // eslint-disable-next-line no-unused-vars
  handlerCloseWS(e) {
    // this.message = JSON.stringify({
    //   action: 'deleteUser',
    //   login: this.login,
    // });
    // this.sendMessage(this.message);
  }

  handlerErrorWS(e) {
    // eslint-disable-next-line no-console
    console.log('Произошла ошибка', e);
  }
}
