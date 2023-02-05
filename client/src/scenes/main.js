import Game from "./game";

export default class Main extends Phaser.Scene {
    constructor() {
        super({
            key: 'Main'
        });
    }
    preload(){

    }
    create(){
        let self=this;
        this.connect=this.add.text(640, 365, ['Connect']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        
        self.connect.on('pointerover', ()=>{
            self.connect.setColor('#ff69b4');
        })

        self.connect.on('pointerout', ()=>{
            self.connect.setColor('#00ffff');
        })
        self.connect.on('pointerdown', ()=>{
            this.scene.start('Character');
        })
    }

}