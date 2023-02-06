
export default class Card {
    constructor(scene,ID) {
        let sprite='WoodCardFront';
        this.ID_ = ID;
        switch(this.ID_) {
            case 1:
                sprite=('WoodCardFront');
              break;
            case 2:
                sprite=('WoodCardBack');
              break;
            default:
                sprite=('WoodCardFront');
          }
        this.render = (x, y) => {
            let card = scene.add.image(x, y, sprite).setScale(1, 1).setInteractive();
            scene.input.setDraggable(card);
            return card;
        }
        this.getID=()=>{
          return this.ID_;
        }
    }
}