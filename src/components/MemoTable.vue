<template>
  <div>
    <table class="styled-table">
      <thead>
        <tr>
          <th >ลำดับ</th>
          <th >รายรับ</th>
          <th >รายจ่าย</th>
          <th >วัน เดือน ปี</th>
          <th >รายละเอียด</th>
          <th ></th>
          <th ></th>

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
        <h2> รวมเงินคงเหลือ Total : {{ result }}</h2>
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
      totals:0,
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
  computed: {
    result: function() {
      let income = 0;
      let expense = 0;
      for (let inx of this.memos) {
        income += parseFloat(inx.money.profits);
        expense += parseFloat(inx.money.losts);
      }
      return income - expense;
    },
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
    total(){  
      var totals = 0
      for(i=0;i<this.form.money.length;i++){
          totals = this.form.money.profits-this.form.money.losts
        }
    }
  },
}
</script>
  
<style scoped lang ="scss">
  
  .second{
    margin: 50px 0 0;
  }

  .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}
.styled-table th,
.styled-table td {
    padding: 12px 15px;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}


.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}
.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
</style>
