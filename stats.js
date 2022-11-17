const  {createApp}  = Vue  

createApp ( {
    data(){    //
        return{
            eventos : [],
            pastEvents : [],
            upcomingEvents : [],
            pastEventsCategory: [],
            upcomingEventsCategory: [],
            pastCategoryArray: [],
            upcomingCategoryArray: [],
            highAssistance: [],
            lowAssistance: [],
            highCapacity: []
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
                this.eventos = data.events
                this.pastEvents = this.eventos.filter(event => (event.date < data.currentDate) )
                this.upcomingEvents = this.eventos.filter(event => (event.date >= data.currentDate) )

                const fnCategory = events => events.category
                this.upcomingEventsCategory = Array.from(new Set (this.upcomingEvents.map(fnCategory)))

                this.pastEventsCategory = Array.from(new Set (this.pastEvents.map(fnCategory)))

                const attendanceEvents = this.percentajeDescendent(this.pastEvents);
                const capacityEvents = this.capacityDescendent(this.pastEvents);
                this.highAssistance = attendanceEvents[0];
                this.lowAssistance = attendanceEvents[attendanceEvents.length - 1];
                this.highCapacity = capacityEvents[0];

                this.pastCategoryArray = this.statsPast(this.pastEventsCategory, this.pastEvents)

                this.upcomingCategoryArray = this.statsUp(this.upcomingEventsCategory, this.upcomingEvents)


            })
            },

            statsPast( categoria, evento ){
                let array = []
                categoria.forEach(element => {

                    const eventosIguales = evento.filter( evento => evento.category === element)
                    
                    const ganancias = eventosIguales.map(evento => (evento.assistance * evento.price)).reduce((acumulador, value)=> acumulador + value)
            
            
            
                    const asistencia = eventosIguales.map(evento => (evento.assistance * 100 ) / evento.capacity)
                    const sumaAsistencia = asistencia.reduce((acumulador, value) => acumulador + value) / asistencia.length 
            
                    const datos = {
                        nombre: element,
                        ganancia: ganancias,
                        porcentaje: sumaAsistencia.toFixed(2)

                    }
                    array.push(datos)
                });
                return array
            },
            statsUp( categoria, evento ){
                let array = []
                categoria.forEach(element => {

                    const eventosIguales = evento.filter( evento => evento.category === element)
                    
                    const ganancias = eventosIguales.map(evento => (evento.estimate * evento.price)).reduce((acumulador, value)=> acumulador + value)
            
            
            
                    const asistencia = eventosIguales.map(evento => (evento.estimate * 100 ) / evento.capacity)
                    const sumaAsistencia = asistencia.reduce((acumulador, value) => acumulador + value) / asistencia.length 
            
                    const datos = {
                        nombre: element,
                        ganancia: ganancias,
                        porcentaje: sumaAsistencia.toFixed(2)

                    }
                    array.push(datos)
                });
                return array
            },
            percentajeDescendent(array) {
                return array.map(events => events).sort((b, a) => (((a.assistance * 100) / a.capacity) - ((b.assistance * 100) / b.capacity)))
            },
            capacityDescendent(array) {
                return array.map(events => events).sort((b, a) => (a.capacity - b.capacity));
            }
    },

    computed: {    
    }
}).mount("#app")