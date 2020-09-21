export class UserInfo {
  constructor (nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about= document.querySelector(aboutSelector);
    this._avatar= document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name : this._name.textContent,
      about : this._about.textContent,
    }
  }

  setUserInfo(newName, newAbout, newAvatar) {
    this._name.textContent = newName;
    this._about.textContent = newAbout;
    this._avatar.src = newAvatar;
  }
}
