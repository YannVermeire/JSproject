export default class Stuff extends Phaser.Scene{
    constructor() {
        super({
            key: 'Stuff'
        });
    }
    init(data){
        console.log(data);
    }
    preload(){

    }
    create(){
        let self=this;
        this.back=this.add.text(200,700, ['Back']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        
        this.back.on('pointerdown',()=>{
            self.scene.start('Character','dataStuff');
        })
        self.back.on('pointerover', ()=>{
            self.back.setColor('#ff69b4');
        })

        self.back.on('pointerout', ()=>{
            self.back.setColor('#00ffff');
        })
    }
}