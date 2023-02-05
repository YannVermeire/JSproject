export default class Zone {
    constructor(scene,x,y,width,height) {
        this.renderZone = () => {
            let interativeZone = scene.add.zone(x, y, width, height).setInteractive();
            interativeZone.setData({ cards: 0 });
            return interativeZone;
        };
        this.renderOutline = (interativeZone) => {
            let interativeZoneOutline = scene.add.graphics();
            interativeZoneOutline.lineStyle(4, 0xff69b4);
            interativeZoneOutline.strokeRect(interativeZone.x - interativeZone.input.hitArea.width / 2, interativeZone.y - interativeZone.input.hitArea.height / 2, interativeZone.input.hitArea.width, interativeZone.input.hitArea.height)
        }
    }
}