/* eslint-disable class-methods-use-this */
// import createRequest from '../http/createRequest';
// eslint-disable-next-line import/no-cycle
import { messenger } from '../../app';

export default class PopUp {
  constructor(container) {
    if (typeof container === 'string') {
      this.container = document.querySelector('.container');
    } else this.container = container;
  }

  getHTMLPopUpStart() {
    const HTML = `
        <form class="form choosePseudonym" action="">
          <h1 class="form_Name">Выберите псевдоним</h1>
          <p>
          <textarea class="form_input form_inputNickName" type="text" id="content" name='NickName'></textarea>
          </p>
          <footer class="form_footer">
            <button type="button" class="form_continue button">Продолжить</button>
          </footer>
        </form>
    `;
    return HTML;
  }

  renderingPopUpStart() {
    const containerForm = document.createElement('div');
    containerForm.className = 'popup';
    this.container.append(containerForm);
    containerForm.innerHTML = this.getHTMLPopUpStart();
    const forma = containerForm.querySelector('.form');
    forma.addEventListener('click', (event) => {
      event.preventDefault();
      this.onClickPopUp(event);
    });
  }

  getHTMLMessenger() {
    const HTML = `  
      <div class="activeUsers">
        <ul class="usersList"></ul>
      </div>
      <form class="form messengerWindow" action="">
        <div class ="messages"></div>
        <footer class="form_footer">
        <textarea class="messageInput" type="text" placeholder="Введите здесь своё сообщение" name='messageText'></textarea>
          <button type="button" class="buttonSendMess button">Отправить</button>
        </footer>
      </form>
    `;
    return HTML;
  }

  renderingMessenger() {
    this.container.innerHTML = this.getHTMLMessenger();
  }

  openMessenger(activeUsers, login) {
    this.renderingMessenger();
    this.usersList = document.querySelector('.usersList');
    activeUsers.forEach((user) => {
      let html = null;
      if (user !== login) {
        html = `<li class="user">${user}</li>`;
        // this.usersList.innerHTML += html;
      } else {
        html = '<li class="user userYou" >You</li>';
        // this.usersList.innerHTML += html;
      }
      this.usersList.innerHTML += html;
    });
  }

  onClickPopUp(event) {
    const { target } = event;
    if (target.classList.contains('form_continue')) messenger.signIn(event);
  }

  closepopUp() {
    document.querySelector('.popup').remove();
  }
}
