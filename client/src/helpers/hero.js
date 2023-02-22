import HealthBar from "./HealthBar";


export default class Hero {
    constructor(scene,Health,Defense,Attack){
        var Health;
        var Defense;
        var Attack;
        var X;
        var Y;
        var HB
        this.render = (x,y,sprite) => {
            X = x;
            Y = y;
            let hero = scene.add.image(x,y,sprite).setScale(1,1);
            HB = new HealthBar(scene,X-60,Y+95,Health); 
            return hero;
        }
        this.TakeDamage = (Damage) => {
            if (Damage-Defense>0)
            {
                let DamageReceive = (Damage - Defense);
                Health -= DamageReceive;
                Defense = 0;
                HB.decrease(DamageReceive);
                return DamageReceive;
            }
        }
        this.GetDamage = () => {
            return Attack;
        }

    }
} 