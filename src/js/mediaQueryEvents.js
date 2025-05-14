import { settings } from "./main.js";

const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleChange(e)
{
    if (e.matches)
    {
        console.log("La pantalla es *** pequeña ***");
        settings.constantes.TILE_X = 60;// tamaño casilla movil
        settings.constantes.TILE_Y = 60;
    }
    else
    {
        console.log("La pantalla es grande");
        settings.constantes.TILE_X = 109;// tamaño casilla normal
        settings.constantes.TILE_Y = 109;
    }
}

mediaQuery.addEventListener("change", handleChange);

export default mediaQuery;
