import Card from '../helpers/card';
import Zone from "../helpers/zone";
export default class Deck extends Phaser.Scene{
    constructor() {
        super({
            key: 'Deck'
        });
    }
    init(data)
    {
    }
    preload(){
        this.load.image('WoodCardFront', 'src/assets/WoodCardFront.png');
        this.load.image('WoodCardBack', 'src/assets/WoodCardBack.png');
    }
    create(){
        let self=this;
        this.cardLimit=8;
        this.cardBank=[];
        this.back=this.add.text(200,700, ['Back']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        this.deckZone=new Zone(this,200,500,150,300)
        this.interactiveDeckZone=self.deckZone.renderZone()
        this.deckZone.renderOutline(this.interactiveDeckZone)
        this.interactiveDeckZone.setData({'type' : 'deck'})

        this.bankZone=new Zone(this,900,500,780,300)
        this.interactiveBankZone=self.bankZone.renderZone()
        this.bankZone.renderOutline(this.interactiveBankZone)
        this.interactiveBankZone.setData({'type' : 'bank'})

        this.fillBank = () =>{
            //si le joueur ne s'est jamais connecté, fournir un deck de base
            if(localStorage.getItem('default')==='true')
            {
                console.log("filling default")
                for (let i = 0; i < 5; i++) 
                {
                    self.cardBank.push(new Card(this,2,'bank'));
                }
                for (let i = 0; i < 5; i++) 
                {
                    self.cardBank.push(new Card(this,1,'bank'));
                }
                localStorage.setItem('default',false);
                localStorage.setItem('cardBank',JSON.stringify({cardBank:self.cardBank}));
            }
            //sinon rechercher sa liste de carte dans le storage et remplir la liste de cartes
            else
            {
                let localBank=JSON.parse(localStorage.getItem('cardBank')).cardBank;
                for(let key in localBank)
                {
                    self.cardBank.push(new Card(self,localBank[key].identifier,localBank[key].location))
                }
            }
            //NB : il faut remplacer le localStorage par une vraie BDD avec credentials, mais pour l"intant on fait avec
            for (let key in this.cardBank)
            {
                if (this.cardBank[key].location==='deck')
                {
                    self.interactiveDeckZone.data.values.cards++;
                }
            }
        }
        this.fillBank();

        this.renderCards=()=>
        {
            for (let key in self.cardBank)
            {
                switch(self.cardBank[key].location)
                {
                    case 'deck':
                        self.cardBank[key].render(self.interactiveDeckZone.x,self.interactiveDeckZone.y);
                        break;
                    case 'bank':
                        self.cardBank[key].render(self.interactiveBankZone.x,self.interactiveBankZone.y);
                        break;
                    default:
                        break;
                }    
            }
        }
        this.renderCards();

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        // event sur fin de drag, dropped = true ==> posé sur une dropzone
        // drop = false ==> posé en dehors d'une drop zone.
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x =  gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })
        //  event sur fin de drag dans une dropzone.
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            switch(dropZone.data.values.type)
            {
                case 'deck':
                    
                    if (gameObject.getData('owner').location==='bank' && self.interactiveDeckZone.getData('cards')<self.cardLimit)
                    {
                        //la carte viens de la banque et il reste de la place dans le deck alors on l'ajoute
                        self.interactiveDeckZone.data.values.cards++;
                        gameObject.getData('owner').location='deck'
                    }
                    else if(gameObject.getData('owner').location=='bank')
                    {
                        //la carte viens de la banque et il n'y a plus de place alors elle reviens dans la banque
                        gameObject.x =  gameObject.input.dragStartX;
                        gameObject.y = gameObject.input.dragStartY;
                    }
                break;
                case 'bank':
                    if (gameObject.getData('owner').location==='deck')
                    {
                        //la carte vient du deck et va vers la banque on l'enleve du deck
                        self.interactiveDeckZone.data.values.cards--;
                        gameObject.getData('owner').location='bank'
                    }
                    break;
                default:
                    break;
            }
            console.log(gameObject.getData('owner'))
        })

        this.back.on('pointerdown',()=>{
            localStorage.setItem('cardBank',JSON.stringify({cardBank:self.cardBank}));
            self.scene.start('Character');
        })
        self.back.on('pointerover', ()=>{
            self.back.setColor('#ff69b4');
        })

        self.back.on('pointerout', ()=>{
            self.back.setColor('#00ffff');
        })
    }
}