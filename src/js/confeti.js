import { settings } from './main.js';

export class ParticulaConfeti
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.ancho = Math.floor(Math.random() * 15) + 10;
        this.alto = Math.floor(Math.random() * 12) + 15;

        this.angulo = Math.random() * 360;
        this.girar = Math.random() < 0.5 ? -1 : 1;

        this.velY = Math.floor(Math.random() * 2) + 2;
        this.velY *= 10;
        this.velY /= Math.floor(Math.random() * 9) + 4;

        this.color = this.colores();

        this.tablero = settings.doms.tablero;
        this.ctx = this.tablero.getContext('2d');
    }

    dibuja()
    {
        this.actualiza();

        this.ctx.save();
        this.ctx.beginPath();

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angulo * Math.PI / 360 * this.girar);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, this.ancho, this.alto);
        this.ctx.fill();

        this.ctx.closePath();
        this.ctx.restore();
    }

    actualiza()
    {
        this.angulo += 9;
        this.y += this.velY;

        if (this.y > settings.constantes.VP_HEIGHT)
        {
            this.x = Math.floor(Math.random() * settings.constantes.VP_WIDTH);
            this.y = 0;
        }
    }

    colores()
    {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        return `rgb(${r}, ${g}, ${b})`;
    }
}
