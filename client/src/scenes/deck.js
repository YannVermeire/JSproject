import Card from '../helpers/card';
import Zone from "../helpers/zone";
export default class Deck extends Phaser.Scene{
    constructor() {
        super({
            key: 'Deck'
        });
    }
    init(data){
        console.log(data);
    }
    preload(){
        this.load.image('WoodCardFront', 'src/assets/WoodCardFront.png');
    }
    create(){
        let self=this;
        this.cardBank=[];
        this.back=this.add.text(200,700, ['Back']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        this.deckZone=new Zone(this,200,500,150,300)
        this.interactiveDeckZone=self.deckZone.renderZone()
        this.showDeckZone=self.deckZone.renderOutline(this.interactiveDeckZone)

        this.bankZone=new Zone(this,900,500,780,300)
        this.interactiveBankZone=self.bankZone.renderZone()
        this.showBankZone=self.bankZone.renderOutline(this.interactiveBankZone)

        this.fillBank = () =>{
            if(localStorage.getItem('default')==='true')
            {
                console.log('filling default');
                localStorage.setItem('default',false);
                for (let i = 0; i < 5; i++) 
                {
                    self.cardBank.push(new Card(this,2));
                }
                for (let i = 0; i < 5; i++) 
                {
                    self.cardBank.push(new Card(this,1));
                }
                localStorage.setItem('cardBank',self.cardBank);
            }
            else
            {
                for(let each_card in self.cardBank)
                {
                    
                }
            }
        }
        self.fillBank();
        console.log(self.cardBank);

        this.back.on('pointerdown',()=>{
            self.scene.start('Character','dataDeck');
        })
        self.back.on('pointerover', ()=>{
            self.back.setColor('#ff69b4');
        })

        self.back.on('pointerout', ()=>{
            self.back.setColor('#00ffff');
        })
    }
}