import { profile } from './constants.js'

export class UserInfo {
  constructor (nameSelector, professionSelector) {
    this._nameSelector = nameSelector;
    this._professionSelector= professionSelector;
  }

  getUserInfo() {
    return {
      name : profile.querySelector(this._nameSelector),
      profession : profile.querySelector(this._professionSelector)
    }
  }

  setUserInfo(newName, newProfession) {
    profile.querySelector(this._nameSelector).textContent = newName;
    profile.querySelector(this._professionSelector).textContent = newProfession;
  }
}
