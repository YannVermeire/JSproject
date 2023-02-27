import InputText from "phaser3-rex-plugins/plugins/inputtext";

export default class AccountCreation extends Phaser.Scene {
    constructor() {
        super({
            key: 'accountCreation'
        });
    }
    preload()
    {}
    create(){
        let self=this
        var usernameInput = new InputText(self, 640, 310, 180, 30, {placeholder : 'username',fontSize : '18px',align:'center' })
        var passwordInput = new InputText(self, 640 , 340, 180, 30, {placeholder : 'password', type : 'password',fontSize : '18px' ,align:'center'})
        var passwordInputDuplicate = new InputText(self, 640 , 370, 180, 30, {placeholder : 'password validation', type : 'password',fontSize : '18px' ,align:'center'})
        this.add.existing(passwordInput)
        this.add.existing(usernameInput)
        this.add.existing(passwordInputDuplicate)

        this.createAccount=this.add.text(640 , 400,'Create account',{fontSize : '18px', fontFamily : 'Trebuchet MS', color : '#00ffff'}).setInteractive().setOrigin(0.5,0.5)
        this.RegexMatchText=this.add.text(640 , 280,'Username is alphanumerics, between 5 and 15 characters',{fontSize : '18px', color : '#cf5e61'}).setOrigin(0.5,0.5)
        this.passwordMatchText=this.add.text(800 , 370,'Passwords don\'t match',{fontSize : '18px', color : '#cf5e61'}).setOrigin(0,0.5)
        this.passwordRegexMatchText=this.add.text(800 , 340,'At least 6 characters',{fontSize : '18px', color : '#cf5e61'}).setOrigin(0,0.5)
        this.RegexMatchText.setVisible(false)
        this.passwordMatchText.setVisible(false)
        this.passwordRegexMatchText.setVisible(false)

        self.createAccount.on('pointerdown',()=>{
            this.RegexMatchText.setVisible(false)
            this.passwordMatchText.setVisible(false)
            this.passwordRegexMatchText.setVisible(false)
            if(usernameInput.text.search(/([a-z]|[A-Z]|[0-9]){5,15}/)===-1)
            {
                this.RegexMatchText.setVisible(true)
            }
            else
            { 
                if(passwordInput.text.search(/([a-z]|[A-Z]|[0-9]){6,}/)===-1)
                {
                    this.passwordRegexMatchText.setVisible(true)
                }
                else
                {
                    if(passwordInput.text!==passwordInputDuplicate.text)
                    {
                        this.passwordMatchText.setVisible(true)
                    }
                    else
                    {
                        //inscrire en bdd
                            fetch("http://localhost:3000/addUser", {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                  },
                                body: JSON.stringify({username: usernameInput.text, password: passwordInput.text})
                                }
                            ).then(response=>response.json())
                            .then(data=>{ console.log(data); })
                            .catch((error)=>{
                                console.log("error : "+error.message)
                            });
                    }
                }
            }
        })

        self.createAccount.on('pointerover', ()=>{
            self.createAccount.setColor('#ff69b4');
        })

        self.createAccount.on('pointerout', ()=>{
            self.createAccount.setColor('#00ffff');
        })

        this.back=this.add.text(200,700,'back',{fontSize : '18px', fontFamily : 'Trebuchet MS', color : '#00ffff'}).setInteractive().setOrigin(0.5,0.5)

        self.back.on('pointerdown',()=>{
            this.scene.start('Main');
        })
        self.back.on('pointerover', ()=>{
            self.back.setColor('#ff69b4');
        })

        self.back.on('pointerout', ()=>{
            self.back.setColor('#00ffff');
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
        passwordInputDuplicate.on('focus',()=>{
            passwordInputDuplicate.setStyle('backgroundColor', '#416788')
        }
        )
        passwordInputDuplicate.on('blur',()=>{
            passwordInputDuplicate.setStyle('backgroundColor', 'transparent')
        }
        )
    }
}
