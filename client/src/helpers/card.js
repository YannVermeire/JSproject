export default class Card{
    constructor(scene,ID,loc) {
      //sert a identifier la localisation de la carte (deck ou banque)
        this.location=loc;
        let sprite='WoodCardFront';
        this.identifier = ID;
        let self=this;
        switch(this.identifier) {
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
            let card = scene.add.image(x, y, sprite).setScale(1.5, 1.5).setInteractive();
            scene.input.setDraggable(card);
            //sert a lier la carte et son render
            card.setData({'owner':self})
            return card;
        }
    }
}