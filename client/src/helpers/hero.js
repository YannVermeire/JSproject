export default class Hero {
    constructor(scene,Health,Defense,Attack){
        var Health;
        var Defense;
        var Attack;
        this.render = (x,y,sprite) => {
            let hero = scene.add.image(x,y,sprite).setScale(1,1);
            return hero;
        }
    }
} 