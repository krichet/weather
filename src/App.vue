<template>
  <main id="wrapper">
    <h1 class="headline">Simple weather widget</h1>
    <div class="coordinates">
      <h3>Choose your coordinates</h3>
        <span>latitude <input v-model="location.lat" type="text" placeholder="latitude"></span>
        <span>longitude <input v-model="location.lon" type="text" placeholder="longitude"></span>
        <button @click="getWeather" class="btn-submit">add location</button>
    </div>    

    <Location :locations="locations" @removeLocation="removeLocation"/>

    <vue-awesome-paginate
      :total-items="this.totalItems"
      :items-per-page="this.perPage"
      :on-click="displayLocations"
    />

  </main>
</template>

<script>
import Location from "./components/Location.vue"


export default {
  components: {
    Location
  },  
  data() {
    return {
      totalItems: 0,
      perPage: 5,
      page: 1,
      locations: [],
      location: {
        lat: '',
        lon: ''
      },
      storage: null
    }
  },
  methods: {
    displayPagination() {
      let pagination = document.getElementsByClassName('pagination-container')[0]
        if(this.totalItems > 5) {
          pagination.style.display = 'flex'
        }
    },
    updateTotalLocations() {
      this.totalItems = JSON.parse(localStorage.getItem('weather')).length
      
      this.displayPagination()

    },
    saveToStorage(response) {

      //prepare new location
      let newLocation = {
        id: response.data.id,
        name: response.data.name,
        sky: response.data.weather[0].description,
        temp: response.data.main.temp,
      }


      // add location to local storage
      if (localStorage.getItem('weather')) {
        this.storage = JSON.parse(localStorage.getItem('weather'))                
        
        let newItem = this.storage.find((item) => item.name === newLocation.name)

        if (!newItem) {
          console.log('added')
          this.storage.push(newLocation)
        }

        else {
          console.log(`${newLocation.name} is already added`)
        }

        localStorage.setItem('weather', JSON.stringify(this.storage))
      }

      else {
        this.storage = []
        this.storage.push(newLocation)
        JSON.stringify(this.storage)
        localStorage.setItem('weather', JSON.stringify(this.storage))
      }   

      
      
      this.updateTotalLocations()

    },

    getWeather() {
      try {
        this.axios
          .get(`https://fcc-weather-api.glitch.me/api/current?lat=${this.location.lat}&lon=${this.location.lon}`)
          .then((response) => {
            this.saveToStorage(response)                
            this.displayLocations()
          })
      }
      catch(err) {
        console.log(err)
      }
    },

    displayLocations(pageId) {

      if (this.storage) {
        this.storage = JSON.parse(localStorage.getItem('weather'))          

        // show first page by default
        this.page = pageId || 1

        //display locations for other pages
        let from = (this.page * this.perPage) - this.perPage
        let to = (this.page * this.perPage)
        this.locations = this.storage.slice(from, to)    
      }      
    },    

    getUserCoordinates(data) {
      this.location.lat = data.coords.latitude
      this.location.lon = data.coords.longitude
    },
    
    removeLocation(id) {
      this.storage = JSON.parse(localStorage.getItem('weather'))            
      this.storage.splice(id, 1)   
      console.log('removed')   
      this.locations = this.storage
      localStorage.setItem('weather', JSON.stringify(this.storage))      

      this.updateTotalLocations()
    }       
  },
  created () {
    
    // request user coordinates and display location by default
    window.navigator.geolocation.getCurrentPosition((data) => {
      this.getUserCoordinates(data)
      this.getWeather()
    }, console.log);

    // render locations
    this.displayLocations()    
    this.displayPagination()

  }
}




</script>