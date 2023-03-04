import HealthBar from "./HealthBar";


export default class Hero {
    constructor(scene,Health,Defense,Attack){
        this.Health = Health;
        this.Defense = Defense;
        this.Attack = Attack;
        this.X;
        this.Y;
        this.HB;
        this.scene = scene;
    }
    render(x,y,sprite)
    {
        this.X = x;
        this.Y = y;
        let hero = this.scene.add.image(this.X,this.Y,sprite).setScale(1,1);
        this.HB = new HealthBar(this.scene,this.X-60,this.Y+95,this.Health); 
        return hero;
    }
    TakeDamage(Damage)
    {
        if (Damage-this.Defense>0)
        {
            let DamageReceive = (Damage - this.Defense);
            this.Health = this.HB.decrease(DamageReceive);
        }
    }
    Healing(Heal)
    {
        this.Health = this.HB.increase(Heal);
    }
    DefenseUp(Defense)
    {
        
    }
    GetDamage()
    {
        return this.Attack;
    }

    GetHealth()
    {
        return this.Health;
    }

    GetDefense()
    {
        return this.Defense;
    }

    
} 