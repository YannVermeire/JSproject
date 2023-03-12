import Card from '../helpers/card';
import Zone from '../helpers/zone';
import Hero from '../helpers/hero';
import Enemy from '../helpers/enemy';
import HealthBar from '../helpers/HealthBar';



export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
        this.MainHero = new Hero(this,150,30,10);
        this.Enemy1 = new Enemy(this,100,15,5);
        this.Enemy2 = new Enemy(this,100,15,5);
        this.Action = 0;
    }

    preload() {
        this.load.image('Background','src/assets/background game.png')
        this.load.image('WoodCardBack', 'src/assets/WoodCardBack.png');
        this.load.image('WoodCardFront', 'src/assets/WoodCardFront.png');
        this.load.image('CardDeck','src/assets/Deck of card.png');
        this.load.image('Hero','src/assets/SwordMaster_right.png');
        this.load.image('Enemy_1','src/assets/Savage_left.png');

    }

    create() {

        //Background image
        this.add.image(640,390,'Background');
        //Zone drop de carte
        this.zoneDrop = new Zone(this,1200,500,640,300);
        this.dropZone = this.zoneDrop.renderZone();
        this.outline1 = this.zoneDrop.renderOutline(this.dropZone);
        //Zone Main de carte
        this.zoneHand = new Zone(this,900,180,640,660);
        this.handZone = this.zoneHand.renderZone();
        this.outline2 = this.zoneHand.renderOutline(this.handZone);
        //Spawn Hero
        this.MainHero.render(150,430,'Hero');
        //Spawn enemies  
        this.Enemy1.render(1130,430,'Enemy_1'); 
        this.Enemy2.render(950,430,'Enemy_1');
        
        

        
        let self = this;
        //Affichage du deck de jeu
        this.CardDeck = this.add.image(1175,670,'CardDeck').setScale(1.5,1.5).setInteractive();
        //Gestion de l'ajour de carte dans la main du joueur
		this.CardDeck.on('pointerdown', function () {
            self.dealCards();
        })
        //Distribution des cartes
        this.dealCards = () => {
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(this);
                playerCard.render(475 + (i * 112), 650, 'WoodCardFront');
            }
        }
        //Aide visiuel pour l'intéraction (voir quel visual cue mettre)
        this.CardDeck.on('pointerover', function () {})
        this.CardDeck.on('pointerout', function () {})


        //Gestion du drag and drop des cartes: suivie de la sourie
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        //Aide visuel pour l'intéraction
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })
        //Comportement de la carte pendant le laché de cette dernière
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
            self.CardAction(0);

        })

        this.CardAction = (Action) => {
            switch(Action) //Remplacer avec l'ID de la carte dans le future 
            {
                case 0 :  //deal damage 
                    console.log("Enemy life : "+this.Enemy1.GetHealth());
                    this.Enemy1.TakeDamage(this.MainHero.GetDamage());
                    console.log("Enemy 1 take "+ this.MainHero.GetDamage()+" damage from hero");
                    console.log("Enemy life : "+this.Enemy1.GetHealth());
                    break;
                case 1 :  //Take damage
                    this.MainHero.TakeDamage(10); 
                    break;
                case 2 :  //Heal
                    this.MainHero.Healing(30);
                    break;
                case 3 :  //Upgrade Defense
                    break;
                case 4 :  //Downgrade Defense
                    break;
                default :
                    break;
            }
        }

        
        
    
    }
    
    update() {
       
    }

    
}