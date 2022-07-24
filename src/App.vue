<template>
  <header>


  </header>

  <main>
    <Location />
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
        lon: 45,
        lat: 39
      },
      weather: {
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
    getWeather() {
      this.axios
        .get(`https://fcc-weather-api.glitch.me/api/current?lat=${this.location.lat}&lon=${this.location.lon}`)
        .then((response) => {
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
        })
    }    
  },
  mounted () {
    this.getWeather()
  }  
}

</script>