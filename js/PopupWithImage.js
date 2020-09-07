import { Popup } from './Popup';
import {
  popupAlbum,
  popupAlbumImage,
  popupAlbumCaption,
} from './constants.js';


export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }
  open() {
    super.open(link, name);
    popupAlbumImage.setAttribute('src', link);
    popupAlbumImage.setAttribute('alt', name); // хз откуда брать их
    popupAlbumCaption.textContent = name;
  }
}
