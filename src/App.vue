<template>
  <main>
    <div><h1>Simple weather widget</h1></div>
    <div class="locations"><Location /></div>
      <button @click="this.getWeather()">add location</button>      
    {{weather}}
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
      location: {
        lon: 53,
        lat: 39
      },
      weather: {
        id: null,
        sky: null,
        temp: null,
        temp_min: null,
        temp_max: null,
        feels_like: null,
        preassure: null,
        sea_lvl: null,
        humidity: null,
        wind_speed: null,
        wind_gust: null
      }      
    }
  },
  methods: {
    saveToStorage(response) {

          // save to variables
          this.weather.id = response.data.id
          this.weather.sky = response.data.weather[0].description
          this.weather.temp = response.data.main.temp
          this.weather.temp_min = response.data.main.temp_min
          this.weather.temp_max = response.data.main.temp_max
          this.weather.feels_like = response.data.main.feels_like
          this.weather.preassure = response.data.main.pressure
          this.weather.sea_lvl = response.data.main.sea_level
          this.weather.humidity = response.data.main.humidity
          this.weather.wind_speed = response.data.wind.speed
          this.weather.wind_gust = response.data.wind.gust

          //prepare new location
          let newLocation = {
            id: this.weather.id,
            sky: this.weather.sky,
            temp: this.weather.temp,
            temp_min: this.weather.temp_min,
            temp_max: this.weather.temp_max,
            feels_like: this.weather.feels_like,
            preassure: this.weather.preassure,
            sea_lvl: this.weather.sea_lvl,
            humidity: this.weather.humidity,
            wind_speed: this.weather.wind_speed,
            wind_gust: this.weather.wind_gust
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
          .then((response) => this.saveToStorage(response))
      }
      catch(err) {
        console.log(err)
      }
    }

  },
  mounted () {
    console.log(JSON.parse(localStorage.getItem('weather')))    
  }  
}

</script>