import Phaser from "phaser";
import Game from "./scenes/game";
import Main from "./scenes/main";
import Character from "./scenes/character";
import Deck from "./scenes/deck";
import Stuff from "./scenes/stuff"
import AccountCreation from "./scenes/accountCreation";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 780,
    },
    scene: [
        Main, Game, Character,Deck, Stuff, AccountCreation
    ],
    dom: {
        createContainer: true
    },
};

const game = new Phaser.Game(config)