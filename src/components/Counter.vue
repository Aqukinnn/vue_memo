<template>
  <div class="mb-20">
    Counter: {{ number }}
    <div>
      <label for="counter" :title="number">Counter: </label>
      <input type="text" v-model="number">
      <button @click="increase(1)">+</button>
      <button @click="increase(-1)">-</button>
      <button @click="increase(10)">+10</button>
      <button @click="increase(number)">x2</button>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 200
    }
  },
  methods: {
    increase(number) {
      this.number += number
    },
  }
}
</script>

<style scoped lang="scss">
.mb-20 {
  margin-bottom: 20px;
}
</style>