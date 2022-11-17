const { createApp } = Vue

createApp({
    data(){
        return{
            eventos:[],
            category:[],
            categoriaSeleccionada:[],
            aux:[],
            input:"",
            date:"",
            
        }
    },
    created(){
        this.cargarCartas()
        
    },
    mounted(){
        
    },
    methods: {
        cargarCartas(){
        fetch("http://amazing-events.herokuapp.com/api/events") // hace una peticion
            .then( response => response.json() ) // como respuesta, devuelve una promesa, de esa respuesta nos importa el metido json
            .then(data => {
                this.eventos = data.events.filter(tarjeta=> tarjeta.category)
                this.aux = this.eventos
                this.date = data.currentDate
                this.category = this.eventos.map(evento => evento.category)
                this.category = new Set(this.eventos.map(evento => evento.category))
                this.category = Array.from(category)
                this.eventos.forEach(element => {
                    if(!this.category.includes(element.category)){
                        this.category.push(element.category)
                    }
                    
                });
            })
            .catch( error => console.log(error) )
        }
    },
    computed: {
        
        filtrarCheckbox(){
            let filtro1 = this.aux.filter(evento => evento.name.toLowerCase().includes(this.input.toLowerCase()))
            let filtro2 = filtro1.filter(filtroEventos => this.categoriaSeleccionada.includes(filtroEventos.category))
            if(filtro2.length > 0 ){
                this.eventos = filtro2
            }else{
                this.eventos = filtro1
            }
        }
    }
}).mount('#app')
