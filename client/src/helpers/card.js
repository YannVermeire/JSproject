export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setScale(1, 1).setInteractive();
            scene.input.setDraggable(card);
            return card;
        }
    }
}