class Semaforo{
    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
        this.createStructure();
    }

    createStructure(){
        const container = document.querySelector('main');
        
        const encabezado = document.createElement('h3');
        encabezado.textContent = 'Tiempo de Reacción: El Semáforo';
        container.appendChild(encabezado);

        for (let i = 0; i < this.lights ; i++){
            const luz = document.createElement('div');
            container.appendChild(luz);
        }

        const botonInicio = document.createElement('button');
        botonInicio.textContent = 'Arranque';
        botonInicio.id = 'botonInicio'
        botonInicio.addEventListener('click', this.initSequence.bind(this));
        container.appendChild(botonInicio);

        const botonReaccion = document.createElement('button');
        botonReaccion.id = 'botonParada';
        botonReaccion.textContent = 'Reacción';
        botonReaccion.disabled = true;
        botonReaccion.addEventListener('click', this.stopReaction.bind(this));
        container.appendChild(botonReaccion);
        
        const reactionTime = document.createElement('p');
        reactionTime.id = 'reactionTime';
        container.appendChild(reactionTime);
    }

    initSequence() {
        document.querySelector('main').classList.add('load');
        document.getElementById('botonInicio').disabled = true;
        setTimeout(() => {
            this.unload_moment = new Date();
            this.endSequence();
        }, 2000 + this.difficulty * 1000);
    }

    endSequence() {
        document.querySelector('main').classList.remove('load');
        document.querySelector('main').classList.add('unload');
        document.getElementById('botonParada').disabled = false;
    }

    stopReaction() {
        this.clic_moment = new Date();
        const reactionTime = (this.clic_moment - this.unload_moment) / 1000;
        document.getElementById('reactionTime').textContent = `Tiempo de reacción: ${reactionTime.toFixed(3)} segundos`;
        
        document.querySelector('main').classList.remove('unload');
        document.getElementById('botonParada').disabled = true;
        document.getElementById('botonInicio').disabled = false;
    }    
}
document.addEventListener('DOMContentLoaded', () => new Semaforo());