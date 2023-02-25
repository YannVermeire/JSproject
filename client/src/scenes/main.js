import Game from "./game";
import InputText from "phaser3-rex-plugins/plugins/inputtext";

export default class Main extends Phaser.Scene {
    constructor() {
        super({
            key: 'Main'
        });
    }
    preload(){
        if(localStorage.getItem('default')===null)
        {
            localStorage.setItem('default',true);
        }
    }
    create(){
        let self=this;
        this.connect=this.add.text(640,370,'Connect',{fontSize : '18px', fontFamily : 'Trebuchet MS', color : '#00ffff'}).setInteractive().setOrigin(0.5,0.5)
        this.createAccount=this.add.text(640,400,'Create Account',{fontSize : '18px', fontFamily : 'Trebuchet MS', color : '#00ffff'}).setInteractive().setOrigin(0.5,0.5)
        var usernameInput = new InputText(this, 640, 310, 150, 30, {placeholder : 'username',fontSize : '18px',align:'center' })
        var passwordInput = new InputText(this, 640 , 340, 150, 30, {placeholder : 'password', type : 'password',fontSize : '18px' ,align:'center'})
        this.add.existing(passwordInput)
        this.add.existing(usernameInput)

        self.connect.on('pointerover', ()=>{
            self.connect.setColor('#ff69b4');
        })

        self.connect.on('pointerout', ()=>{
            self.connect.setColor('#00ffff');
        })
        self.connect.on('pointerdown', ()=>{
            if(usernameInput.text==='' || passwordInput.text==='')
            {
                console.log('wrong auth');
            }
            else
            {
                //recherche en bdd de l'utilisateur
                this.scene.start('Character');
            }

        })

        self.createAccount.on('pointerover', ()=>{
            self.createAccount.setColor('#ff69b4');
        })

        self.createAccount.on('pointerout', ()=>{
            self.createAccount.setColor('#00ffff');
        })

        self.createAccount.on('pointerdown', ()=>{
            this.scene.start('accountCreation');
        })

        usernameInput.on('focus',()=>{
            usernameInput.setStyle('backgroundColor', '#416788')
        }
        )
        usernameInput.on('blur',()=>{
            usernameInput.setStyle('backgroundColor', 'transparent')
        }
        )
        
        passwordInput.on('focus',()=>{
            passwordInput.setStyle('backgroundColor', '#416788')
        }
        )
        passwordInput.on('blur',()=>{
            passwordInput.setStyle('backgroundColor', 'transparent')
        }
        )
    }

}