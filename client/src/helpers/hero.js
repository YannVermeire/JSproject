import HealthBar from "./HealthBar";


export default class Hero {
    constructor(scene,Health,Defense,Attack){
        var Health;
        var Defense;
        var Attack;
        var X;
        var Y;
        this.render = (x,y,sprite) => {
            X = x;
            Y = y;
            let hero = scene.add.image(x,y,sprite).setScale(1,1);
            return hero;
        }

        this.renderHB = () => {
            let HB = new HealthBar(scene,X-60,Y+95,Health); 
            return HB;
        }

    }
} 