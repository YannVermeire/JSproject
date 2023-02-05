import Zone from "../helpers/zone";
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
        this.stuffBack={}
        
        this.stuffZone=new Zone(this,200,500,1130,300)
        this.interactiveStuffZone=self.stuffZone.renderZone()
        this.showStuffZone=self.stuffZone.renderOutline(this.interactiveStuffZone)

        this.bankZone=new Zone(this,900,500,500,300)
        this.interactiveBankZone=self.bankZone.renderZone()
        this.showBankZone=self.bankZone.renderOutline(this.interactiveBankZone)

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