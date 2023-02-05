import Card from '../helpers/card';
import Zone from '../helpers/zone';
import Hero from '../helpers/hero';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('Background','src/assets/background game.png')
        this.load.image('WoodCardBack', 'src/assets/WoodCardBack.png');
        this.load.image('WoodCardFront', 'src/assets/WoodCardFront.png');
        this.load.image('Deck','src/assets/Deck of card.png');
        this.load.image('Hero','src/assets/SwordMaster_right.png');
        this.load.image('Enemy_1','src/assets/Savage_left.png');

    }

    create() {

        //Background image
        this.add.image(640,390,'Background');
        //Zone drop de carte
        this.zoneDrop = new Zone(this,1200,500,640,300);
        this.dropZone = this.zoneDrop.renderZone();
        //this.outline1 = this.zoneDrop.renderOutline(this.dropZone);
        //Zone Main de carte
        this.zoneHand = new Zone(this,900,180,640,660);
        this.handZone = this.zoneHand.renderZone();
        //this.outline2 = this.zoneHand.renderOutline(this.handZone);
        //Spawn Hero
        let MainHero = new Hero(this,150,30,25);
        MainHero.render(150,430,'Hero');
        MainHero.renderHB();


        
        //this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        
        


        let self = this;
        this.dealCards = () => {
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(this);
                playerCard.render(475 + (i * 100), 650, 'WoodCardFront');
            }
        }

		this.dealText.on('pointerdown', function () {
            self.dealCards();
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
        })
    
    }
    
    update() {
	
    }
}