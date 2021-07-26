<template>
  <div>
    <div class="home">
      <h1>บันทึกรายรับรายจ่าย</h1>
      <h3>เพิ่มข้อมูล</h3>
    </div>

    <div class="tables">
      <div>
        <label for="make">รายรับ</label>
        <input type="text" v-model="form.money.profits">
      </div>

      <div>
        <label for="take">รายจ่าย</label>
        <input type="text" v-model="form.money.losts">
      </div>

      <div>
        <label for="type">วัน,เดือน,ปี</label>
        <input type="text" v-model="form.type">
      </div>

      <div>
        <label for="detail">รายละเอียด</label>
        <input type="text" v-model="form.detail">
      </div>
      <div>
        <button @click="addMemo">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import MemoStore from '@/store/Memo'

export default {
  data() {
    return {
      form: {
        detail:'',
        money: {
          profits: '',
          losts: ''
        },
        type: ''
      }
    }
  },
  methods: {
    clearForm() {
      this.form = {
        money: {
          profits: '',
          losts: ''
        },detail:'',
        type: ''
      }
    },
    addMemo() {
      let payload = {
        money: this.form.money,
        detail: this.form.detail,
        type: this.form.type.split(',').map(
          (item) => item.trim()
        )
      }

      MemoStore.dispatch('addMemo', payload)
      console.log(payload)
      this.clearForm()
    }
  }
}
</script>

<style scoped lang="scss">
  h1 {
    margin: 20px 0 0;
  }
  h3 {
    margin: 10px 0 0;
  }
  .tables{
    margin: 30px 0 0;
  }

</style>