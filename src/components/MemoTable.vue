<template>
  <div class = "tables">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>รายรับ</th>
          <th>รายจ่าย</th>
          <th>วัน เดือน ปี</th>
          <th>รายละเอียด</th>

        </tr>
      </thead>
      <tbody >
        <tr v-for="(mem, index) in memos" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="index !== editIndex">{{ mem.money.profits }}</td>
          <td v-if="index === editIndex">
            <input type="text" v-model="form.money.profits" />
          </td>

          <td v-if="index !== editIndex">{{ mem.money.losts }}</td>
          <td v-if="index === editIndex">
            <input type="text" v-model="form.money.losts" />
          </td>

          <td v-if="index !== editIndex">{{ mem.type }}</td>
          <td v-if="index === editIndex">
            <input type="text" v-model="form.type" />
          </td>

          <td v-if="index !== editIndex">{{ mem.detail }}</td>
          <td v-if="index === editIndex">
            <input type="text" v-model="form.detail" />
          </td>

          <td v-if="index !== editIndex">
            <button @click="openForm(index, mem)">Click to Edit</button>
          </td>
          <td v-if="index === editIndex">
            <button @click="editMemo">Update</button>
            <button @click="closeForm">Cancel</button>
          </td>
        </tr>
      </tbody>
      <div class = "second">
        <tr>
          <th> รวมรายรับ </th>|
          <th> รวมรายจ่าย </th>
        </tr>
        
      </div>
    </table>
  </div>
</template>

<script>
import MemoStore from "@/store/Memo"
export default {
  data() {
    return {
      // สำหรับแสดงข้อมูล
      memos: [],

      // สำหรับฟอร์มแก้ไข
      editIndex: -1,
      form: {
        money: {
          profits: "",
          losts: "",
        },
        type: "",detail:""
      },
    }
  },
  created() {
    this.fetchMemo()
  },
  methods: {
    fetchMemo() {
      // เรียก actions จาก Store ด้วย ชื่อStore.dispatch('ชื่อ action')
      MemoStore.dispatch("fetchMemo")
      this.memos = MemoStore.getters.memos
    },
    openForm(index, memmon) {
      this.editIndex = index
      let cloned = JSON.parse(JSON.stringify(memmon))
      this.form.detail = cloned.detail
      this.form.money = cloned.money
      this.form.type = cloned.type.join(", ")
    },
    closeForm() {
      this.editIndex = -1
      this.form = {
        money: {
          profits: "",
          losts: "",
        },
        type: "",detail:"",
      }
    },
    editMemo() {
      let payload = {
        index: this.editIndex,
        detail: this.form.detail,
        money: this.form.money,
        type: this.form.type.split(",").map((item) => item.trim()),
      }
      console.log(payload)
      MemoStore.dispatch("editMemo", payload)
      this.closeForm()
    },
    total_profits(){
        profits = Number(document.calculator.people.value);
        b = Number(document.calculator.price.value);
        c = a * b;
        document.calculator.total.value=c;
    }
  },
}
</script>
  
<style scoped lang ="scss">
  .tables{
    margin: 40px 0 0;
  }
  .second{
    margin: 30px 0 0;
  }
</style>
