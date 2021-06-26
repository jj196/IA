const express = require('express');
const cors = require('cors');
const route = express.Router();
const app = express();

app.set('port', 8080);
app.use(route);
app.use(cors());



const fichasDerecha = (tablero, posX, posY, turno) => {
    var fichas = 0;
    while (posY < 7) {
        posY = posY + 1;
        if (tablero[posX][posY] == 2) {
            return { x: posX, y: posY, total: fichas }
        }
        else if (tablero[posX][posY] != turno) {
            fichas++;
        } else {
            fichas = 0;
            break;
        }
    }

    return { x: posX, y: posY, total: 0 }
}

const fichasIzquierda = (tablero, posX, posY, turno) => {
    var fichas = 0;
    while (posY > 0) {
        posY--;
        if (tablero[posX][posY] == 2) {
            return { x: posX, y: posY, total: fichas }
        }
        else if (tablero[posX][posY] != turno) {
            fichas++;
        } else {
            fichas = 0;
            break;
        }
    }
    return { x: posX, y: posY, total: 0 }
}

const fichasArriba = (tablero, posX, posY, turno) => {
    var fichas = 0;
    while (posX > 0) {
        posX--;
        if (tablero[posX][posY] == 2) {
            return { x: posX, y: posY, total: fichas }
        }
        else if (tablero[posX][posY] != turno) {
            fichas++;
        } else {
            fichas = 0;
            break;
        }
    }
    return { x: posX, y: posY, total: 0 }
}

const fichasAbajo = (tablero, posX, posY, turno) => {
    var fichas = 0;
    while (posX < 7) {
        posX++;
        if (tablero[posX][posY] == 2) {
            return { x: posX, y: posY, total: fichas }
        }
        else if (tablero[posX][posY] != turno) {
            fichas++;
        } else {
            fichas = 0;
            break;
        }
    }
    return { x: posX, y: posY, total: 0 }
}

const fichasDiagonalIzqArr = (tablero, posX, posY, turno) => {
    var fichas = 0;
    while (posY > 0) {
        posY--;
        while (posX > 0) {
            posX--;
            if (tablero[posX][posY] == 2) {
                return { x: posX, y: posY, total: fichas }
            }
            else if (tablero[posX][posY] != turno) {
                fichas++;
                break;
            } else {
                return { x: posX, y: posY, total: 0 }
            }
        }
    }
    return { x: posX, y: posY, total: 0 }
}

const fichasDiagonalIzqAb = (tablero, posX, posY, turno) => {
    var fichas = 0;
    while (posY > 0) {
        posY--;
        while (posX < 7) {
            posX++;
            if (tablero[posX][posY] == 2) {
                return { x: posX, y: posY, total: fichas }
            }
            else if (tablero[posX][posY] != turno) {
                fichas++;
                break;
            } else {
                return { x: posX, y: posY, total: 0 }
            }
        }
    }
    return { x: posX, y: posY, total: 0 }
}

const fichasDiagonalDerArr = (tablero, posX, posY, turno) => {
    var fichas = 0;
    while (posY < 7) {
        posY++;
        while (posX > 0) {
            posX--;
            if (tablero[posX][posY] == 2) {
                return { x: posX, y: posY, total: fichas }
            }
            else if (tablero[posX][posY] != turno) {
                fichas++;
                break;
            } else {
                return { x: posX, y: posY, total: 0 }
            }
        }
    }
    return { x: posX, y: posY, total: 0 }
}

const fichasDiagonalDerrAb = (tablero, posX, posY, turno) => {
    var fichas = 0;
    while (posY < 7) {
        posY++;
        while (posX < 7) {
            posX++;
            if (tablero[posX][posY] == 2) {
                return { x: posX, y: posY, total: fichas }
            }
            else if (tablero[posX][posY] != turno) {
                fichas++;
                break;
            } else {
                return { x: posX, y: posY, total: 0 }
            }
        }
    }
    return { x: posX, y: posY, total: 0 }
}



route.get('/', (req, res) => {
    try {
        var turno = req.query.turno;
        var estado = req.query.estado;

        let tablero = new Array(8);
        for (var i = 0; i < 8; i++) {
            tablero[i] = new Array(8);
        }

        var posX = 0;
        var posY = 0;
        for (var i = 0; i < estado.length; i++) {
            tablero[posX][posY] = estado[i];
            posY++;
            if (posY == 8) {
                posX++;
                posY = 0;
            }

        }
        var coordenada = { x: 0, y: 0, total: 0 };

        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                if (tablero[x][y] != turno)
                    continue;

                var fichasAb = fichasAbajo(tablero, x, y, turno);
                if (fichasAb.total > coordenada.total)
                    coordenada = fichasAb;

                var fichasArr = fichasArriba(tablero, x, y, turno);
                if (fichasArr.total > coordenada.total)
                    coordenada = fichasArr;
                
                var fichasIzq = fichasIzquierda(tablero, x, y, turno);
                if (fichasIzq.total > coordenada.total)
                    coordenada = fichasIzq;

                var fichasDer = fichasDerecha(tablero, x, y, turno);
                if (fichasDer.total > coordenada.total)
                    coordenada = fichasDer;

                var fichasIzqArr = fichasDiagonalIzqArr(tablero, x, y, turno);
                if (fichasIzqArr.total > coordenada.total)
                    coordenada = fichasIzqArr;


                var fichasDerArr = fichasDiagonalDerArr(tablero, x, y, turno);
                if (fichasDerArr.total > coordenada.total)
                    coordenada = fichasDerArr;


                var fichasIzqAb = fichasDiagonalIzqAb(tablero, x, y, turno);
                if (fichasIzqAb.total > coordenada.total)
                    coordenada = fichasIzqAb;


                var fichasDerAb = fichasDiagonalDerrAb(tablero, x, y, turno);
                if (fichasDerAb.total > coordenada.total)
                    coordenada = fichasDerAb;


            }
        }

        res.send(String(coordenada.x) + String(coordenada.y));
    } catch (error) {
        console.log(error)
        res.send(error)
    }

});

app.listen(app.get('port'), () => {
    console.log("app running in port 8080")
});