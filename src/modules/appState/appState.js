/* eslint-disable class-methods-use-this */
export default class appState {
  saveStateActiveUsers(activeUsers, login) {
    sessionStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    sessionStorage.setItem('login', JSON.stringify(login));
  }

  saveStateMessages(messages) {
    sessionStorage.setItem('messages', JSON.stringify(messages));
  }
}
