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
        this.createAccount=this.add.text(640,400,'Create an account',{fontSize : '18px', fontFamily : 'Trebuchet MS', color : '#00ffff'}).setInteractive().setOrigin(0.5,0.5)
        var usernameInput = new InputText(this, 640, 310, 150, 30, {placeholder : 'username',fontSize : '18px',align:'center' })
        var passwordInput = new InputText(this, 640 , 340, 150, 30, {placeholder : 'password', type : 'password',fontSize : '18px' ,align:'center'})
        this.add.existing(passwordInput)
        this.add.existing(usernameInput)

        this.credentialsText=this.add.text(640 , 280,'Enter credentials',{fontSize : '18px', color : '#cf5e61'}).setOrigin(0.5,0.5)
        this.authenticationText=this.add.text(640 , 280,'Wrong credentials',{fontSize : '18px', color : '#cf5e61'}).setOrigin(0.5,0.5)
        this.authenticationText.setVisible(false)
        this.credentialsText.setVisible(false)

        self.connect.on('pointerover', ()=>{
            self.connect.setColor('#ff69b4');
        })

        self.connect.on('pointerout', ()=>{
            self.connect.setColor('#00ffff');
        })
        self.connect.on('pointerdown', ()=>{
            this.credentialsText.setVisible(false)
            this.authenticationText.setVisible(false)
            if(usernameInput.text==='' || passwordInput.text==='')
            {
                this.credentialsText.setVisible(true)
            }
            else
            {
                fetch("http://localhost:3000/connectAsUser", {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                  },
                                body: JSON.stringify({username: usernameInput.text, password: passwordInput.text})
                                }
                            ).then(response=>response.json())
                            .then(data=>{ 
                                console.log(data);
                                if (data.username===null)
                                {
                                    this.authenticationText.setVisible(true)
                                }
                                else
                                {
                                    this.scene.start('Character'); 
                                }
                            })
                            .catch((error)=>{
                                console.log("error : "+error.message)
                            });
                //this.scene.start('Character');
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