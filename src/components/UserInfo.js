import { profile } from '../utils/constants.js'

export class UserInfo {
  constructor (nameSelector, aboutSelector, id) {
    this._nameSelector = nameSelector;
    this._aboutSelector= aboutSelector;
  }

  getUserInfo() {
    return {
      name : profile.querySelector(this._nameSelector).textContent,
      about : profile.querySelector(this._aboutSelector).textContent,
    }
  }

  setUserInfo(newName, newAbout) {
    profile.querySelector(this._nameSelector).textContent = newName;
    profile.querySelector(this._aboutSelector).textContent = newAbout;
  }
}
