export default class HealthBar {

    constructor (scene, x, y, value)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = value;
        this.maxLife = value;

        this.draw();
        scene.add.existing(this.bar);
    }

    decrease (amount)
    {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return this.value;
    }

    increase (amount)
    {
        this.value += amount;

        if (this.value > this.maxLife)
        {
            this.value =this.maxLife;
        }

        this.draw();

        return this.value;
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 120, 24);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 116, 20);

        this.bar.fillStyle(0x00ff00);
        var coeff = this.value/this.maxLife;
        console.log(this.value);
        console.log(this.maxLife);
        console.log(coeff);
        this.bar.fillRect(this.x + 2, this.y + 2, Math.floor(116 * coeff), 20);
        
    }

}