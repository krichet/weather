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
        lat: 50.450001,
        lon: 30.523333        
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
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max,
        feels_like: response.data.main.feels_like,
        preassure: response.data.main.pressure,
        sea_lvl: response.data.main.sea_level,
        humidity: response.data.main.humidity,
        wind_speed: response.data.wind.speed,
        wind_gust: response.data.wind.gust
      }


      // add location to local storage
      if (localStorage.getItem('weather')) {
        const storage = JSON.parse(localStorage.getItem('weather'))
        storage.push(newLocation)
        localStorage.setItem('weather', JSON.stringify(storage))
      }

      else {
        const storage = []            
        storage.push(newLocation)
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
    }, console.log);

    // render locations
    this.displayLocations()    
  }  
}




</script>