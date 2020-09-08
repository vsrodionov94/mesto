import { Popup } from './Popup.js';
import {
  popupAlbumImage,
  popupAlbumCaption,
} from './constants.js';


export class PopupWithImage extends Popup {
  open(link, name) {
    super.open();
    popupAlbumImage.setAttribute('src', link);
    popupAlbumImage.setAttribute('alt', name); // хз откуда брать их
    popupAlbumCaption.textContent = name;
  }
}
