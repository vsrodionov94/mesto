export class Section {
  constructor({items, renderer}) {
    this._renderedItems = items;
    this._renderer = renderer;
  }

  renderItems (){
      this._renderedItems.forEach(item => {
      this._renderer(item)
    });
  }
}
