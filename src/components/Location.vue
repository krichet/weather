<template>
  <div v-if="locations" class="locations">
    <div v-for="(item, index) in locations" class="location" :key="index">
      <h3 class="location__id">{{item.name}}</h3>
        <div class="location__bullets">          
          <p class="location__temp">{{item.temp}} °C</p>
          <p class="location__sky">{{item.sky}}</p>
          <button @click="$emit('removeLocation', index)" :id="index">remove</button>
        </div>
    </div>
  </div>
  <div v-else-if="!locations" class="locations-empty">
    <h3>No locations added. Choose your first location</h3>
  </div>  
</template>

<script>

export default {
  props:['locations'],
  data() {
    return {
      storage: null
    }
  },
  methods: {

  }
}


</script>