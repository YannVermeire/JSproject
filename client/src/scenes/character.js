import Zone from "../helpers/zone";
export default class Character extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'Character'
        });
    }
    init(data)
    {
        console.log(data);
    }
    preload() {
        this.load.image('character','src/assets/character.png')
        //this.load.image('backGround','')
    }
    create(){
        let self=this
        this.add.image(640, 365, 'character').setScale(0.3, 0.3).setInteractive();

        this.deckZone=new Zone(this,200,500,150,300)
        this.interactiveDeckZone=self.deckZone.renderZone()
        this.showDeckZone=self.deckZone.renderOutline(this.interactiveDeckZone)
        this.interactiveDeckZone.on('pointerdown',()=>{
            self.scene.start('Deck','toto')
        })

        this.stuffZone=new Zone(this,200,500,1130,300)
        this.interactiveStuffZone=self.stuffZone.renderZone()
        this.showStuffZone=self.stuffZone.renderOutline(this.interactiveStuffZone)
        this.interactiveStuffZone.on('pointerdown',()=>{
            console.log('going to stuff')
            self.scene.start('Stuff')
        })
    }
}