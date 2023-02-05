export default class Zone {
    constructor(scene,Width,Height,x,y) {
        var Width;
        var Height;
        var x;
        var y;
        this.renderZone = () => {
            let dropZone = scene.add.zone(x, y, Width, Height).setRectangleDropZone(Width, Height);
            dropZone.setData({ cards: 0 });
            return dropZone;
        };
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(5, 0xFFFFFF);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
        }
    }
}