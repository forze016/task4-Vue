const { createApp } = Vue

createApp({
    data(){
        return{
            aux:[],
            title:undefined,
            description:undefined,
            date:undefined,
            category:undefined,
            place:undefined,
            capacity:undefined,
            assistance:undefined,
            price:undefined,
            image:undefined,
            estimate:undefined,
            tarjeta:undefined,
            queryString:undefined,
            eventos:[],
        }
    },
    created(){
        this.cargarCartas()
    
    },
    methods: {

        cargarCartas(){
        fetch("http://amazing-events.herokuapp.com/api/events") // hace una peticion
            .then( response => response.json() ) // como respuesta, devuelve una promesa, de esa respuesta nos importa el metido json
            .then(data => {
                this.eventos = data.events
                this.queryString = location.search;
                let params = new URLSearchParams(this.queryString);
                let id = params.get("id")
                this.tarjeta = this.eventos.find(item => item._id == id)
                this.date = this.tarjeta.date
                this.category = this.tarjeta.category
                this.title = this.tarjeta.name
                this.place = this.tarjeta.place
                this.description = this.tarjeta.description
                this.capacity = this.tarjeta.capacity
                this.assistance = this.tarjeta.assistance
                this.price = this.tarjeta.price
                this.image = this.tarjeta.image
                this.estimate = this.tarjeta.estimate
                })
            .catch( error => console.log(error) )
        },
    },
}).mount('#app')





