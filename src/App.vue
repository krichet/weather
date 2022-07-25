<template>
  <main id="wrapper">
    <h1 class="headline">Simple weather widget</h1>
    <div class="coordinates">
      <h3>Choose your coordinates</h3>
        <span>latitude <input v-model="location.lat" type="text" placeholder="latitude"></span>
        <span>longitude <input v-model="location.lon" type="text" placeholder="longitude"></span>
        <button @click="this.getWeather()" class="btn-submit">add location</button>
    </div>    

    <Location :locations="locations"/>

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
      locations: [],
      location: {
        lat: '',
        lon: ''
      }
    }
  },
  methods: {
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
        let storage = JSON.parse(localStorage.getItem('weather'))                
        
        let newItem = storage.find((item) => item.name === newLocation.name)

        if (!newItem) {
          console.log('added')
          storage.push(newLocation)
        }

        else {
          console.log(`${newLocation.name} is already added`)
        }

        localStorage.setItem('weather', JSON.stringify(storage))
      }

      else {
        let storage = []
        storage.push(newLocation)
        JSON.stringify(storage)
        localStorage.setItem('weather', JSON.stringify(storage))
      }      

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

    displayLocations() {
      this.locations = JSON.parse(localStorage.getItem('weather'))      
      // console.log(this.locations)
    },    

    getUserCoordinates(data) {
      this.location.lat = data.coords.latitude
      this.location.lon = data.coords.longitude
    }   
  },
  created () {
    
    // request user coorinates
    window.navigator.geolocation.getCurrentPosition((data) => {
      this.getUserCoordinates(data)
      this.getWeather()
    }, console.log);

    // render locations
    this.displayLocations()    
  }  
}




</script>