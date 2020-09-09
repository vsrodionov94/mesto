import { Popup } from './Popup.js';
import {
  popupAlbumImage,
  popupAlbumCaption,
} from '../utils/constants.js';


export class PopupWithImage extends Popup {
  open(link, name) {
    super.open();
    popupAlbumImage.setAttribute('src', link);
    popupAlbumImage.setAttribute('alt', name);
    popupAlbumCaption.textContent = name;
  }
}
