<template>
  <div v-if="locations" class="locations">
    <div v-for="(item, index) in locations" class="location" :key="index">
      <h3 class="location__id">Location: {{item.name}}</h3>
      <div class="location__bullets">
        <div class="location__col">
          <p class="location__bullet">Sky {{item.sky}}</p>
          <p class="location__bullet">Temperature {{item.temp}}</p>
          <p class="location__bullet">Temperature min {{item.temp_min}}</p>
          <p class="location__bullet">Temperature max {{item.temp_max}}</p>
          <p class="location__bullet">Feels like {{item.feels_like}}</p>      
        </div>
        <div class="location__col">
          <p class="location__bullet">Preassure {{item.preassure}}</p>
          <p class="location__bullet">Sea level {{item.sea_lvl}}</p>
          <p class="location__bullet">Humidity {{item.humidity}}</p>
          <p class="location__bullet">Wind speed {{item.wind_speed}}</p>
          <p class="location__bullet">Wind gust {{item.wind_gust}}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="!locations" class="locations-empty">
    <h3>No locations added. Choose your first location</h3>
  </div>  
</template>

<script>

export default {
  props:['locations']
}


</script>