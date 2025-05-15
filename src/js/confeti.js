import { settings } from './main.js';

export class ParticulaConfeti
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.ancho = Math.floor(Math.random() * 15) + 10;
        this.alto = Math.floor(Math.random() * 12) + 15;

        this.ancho /= settings.constantes.ESCALAR_PARTICULAS;
        this.alto /= settings.constantes.ESCALAR_PARTICULAS;

        this.angulo = Math.random() * 360;
        this.girar = Math.random() < 0.5 ? -1 : 1;

        const velocidades = [2.9, 3.0, 3.2, 3.5, 3.6, 3.8];
        const rndVel = Math.floor(Math.random() * velocidades.length);
        this.velY = velocidades[rndVel];

        this.color = this.colores();

        this.tablero = settings.doms.tablero;
        this.ctx = this.tablero.getContext('2d');

        const {TILE_X, TILE_Y, FILAS, COLUMNAS} = settings.constantes;
        this.tablero.width = TILE_X * COLUMNAS;
        this.tablero.height = TILE_Y * FILAS;
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

        if (this.y > this.tablero.height)
        {
            const posY_spawn_confeti = 200;
            this.x = Math.floor(Math.random() * this.tablero.width);
            this.y = Math.floor(Math.random() * posY_spawn_confeti) * -1;
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
