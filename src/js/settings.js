
export class Settings
{
    constructor()
    {
        this.constantes =
        {
            TILE_X: 109,
            TILE_Y: 109,
            TILE_XX: "109",
            TILE_YY: "109",
            FILAS: 6,
            COLUMNAS: 7,
            PX: 'px',
            NUMERO_PARTICULAS_CONFETI: 1200,
            ESCALAR_PARTICULAS: 1,
            VP_WIDTH: window.innerWidth,
            VP_HEIGHT: window.innerHeight,
            tiempoRespuestaCPU: 3200,
            DELAY_WINNER_MODAL: 500,
            DELAY_GAMEOVER: 3900,
            FPS: 50
        };

        this.doms =
        {
            main: document.getElementById('main'),
            textos: document.getElementById('textos'),
            textosP: document.getElementById('textosP'),
            //info: document.getElementById('info'),
            tablero: document.getElementById('canvas'),
            botonesInicio: document.getElementsByClassName('botones-inicio')
        };

        this.arrayTablero = [];

        this.estado =
        {
            preJuego: true,
            enJuego: false,
            gameOver: false
        };

        this.turno = true;
        this.primera_partida = true;
        this.contadorJugadas = 0;

        this.ficha;
        
        this.resultado =
        {
            ganaJugador: false,
            ganaCPU: false,
            empate: false
        };

        this.colores =
        {
            FONDO: "#373736",
            TABLERO: "#0084BD",
            FICHA_ROJA: "#9E0018",
            FICHA_VERDE: "#F7A20F"
        };

        this.sonidos =
        {
            ficha1: new Audio('assets/audio/chipsCollide1.ogg'),
            ficha2: new Audio('assets/audio/chipsCollide2.ogg'),
            gameover: new Audio('assets/audio/gameover.mp3'),
            boooh: new Audio('assets/audio/boooh.mp3'),
            winner: new Audio('assets/audio/aplausoseagle.mp3'),
            musicafondo: new Audio('assets/audio/music-puzzle-game1.mp3')
        };

        this.volumen =
        {
            ficha1: 0.9,
            ficha2: 0.9,
            gameover: 0.9,
            boooh: 0.5,
            winner: 0.7,
            musicafondo: 0.2
        };

        this.detectarAnchoPantalla();
    }

    detectarAnchoPantalla()
    {
        if (window.innerWidth <= 768)
        {
            console.log("Comienzo con pantalla pequeña");
            this.constantes.TILE_X = 60;
            this.constantes.TILE_Y = 60;
            this.constantes.ESCALAR_PARTICULAS = 2;
            return;
        }

        console.log("Comienzo con pantalla grande")
        this.constantes.TILE_X = 109;
        this.constantes.TILE_Y = 109;
        this.constantes.ESCALAR_PARTICULAS = 1;
    }
}
