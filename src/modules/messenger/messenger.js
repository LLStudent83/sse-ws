import createRequest from '../http/createRequest';
// eslint-disable-next-line import/no-cycle
import { ws } from '../../app';

export default class Messenger {
  constructor(popUp) {
    this.popUp = popUp;
    this.container = document.getElementsByClassName('container');
    this.init();
  }

  init() {
    this.popUp.renderingPopUpStart();
    this.ws = new WebSocket('ws://localhost:8080/ws');
    this.ws.addEventListener('open', (e) => {
      console.log('соединение с сервером открыто', e);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async signIn(event) {
    const { currentTarget } = event;
    this.login = currentTarget.querySelector('.form_inputNickName').value;
    // this.message = JSON.stringify({
    //   action: 'signIn',
    //   login: this.login,
    // });
    this.message = 'hi';
    this.ws.send('hi');
    this.ws.addEventListener('message', (e) => {
      console.log('печатаю сообщение от сервера', e);
    });
    // const response = await createRequest({
    //   data: this.login,
    //   url: 'signIn',
    // });
    // // console.log(response);
    // if (response.result) {
    //   const activeUsers = response.result;
    //   this.popUp.closepopUp();
    //   // ws.openWS();
    //   this.popUp.openMessenger(activeUsers, this.login);
    // } else {
    //   currentTarget.querySelector('.form_inputNickName').value = '';
    //   // eslint-disable-next-line no-alert
    //   alert('Введенное вами имя уже рарегистрировано введите другое');
    // }
  }
}
