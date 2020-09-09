import { profile } from '../utils/constants.js'

export class UserInfo {
  constructor (nameSelector, professionSelector) {
    this._nameSelector = nameSelector;
    this._professionSelector= professionSelector;
  }

  getUserInfo() {
    return {
      name : profile.querySelector(this._nameSelector).textContent,
      profession : profile.querySelector(this._professionSelector).textContent
    }
  }

  setUserInfo(newName, newProfession) {
    profile.querySelector(this._nameSelector).textContent = newName;
    profile.querySelector(this._professionSelector).textContent = newProfession;
  }
}
