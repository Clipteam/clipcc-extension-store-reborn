<template>
  <menu-bar-manage />
  <div class="container">

    <div class="header">
        <h2>扩展管理</h2>
        <button class="create" @click="handleCreate()">添加扩展</button>
    </div>
  <table>
      <thead>
        <tr>
          <th class="text-left">
            id
          </th>
          <th class="text-left">
            扩展名
          </th>
          <th class="text-left">
            版本
          </th>
          <th class="text-left">
            作者
          </th>
          <th class="text-left">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in extension"
          :key="item.id"
        >
          <td>{{ item.extensionId }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.version }}</td>
          <td>{{ item.author }}</td>
          <td>
              <button class='action' @click="handleEdit(item)"><img src='../assets/edit.svg' title="编辑"/></button>
              <button class='action' @click="handleDelete(item)"><img src='../assets/delete.svg' title="删除"/></button>
          </td>
        </tr>
      </tbody>
  </table>
  </div>
  <extension-edit-dialog ref='dialog' @onSave="getExtension()" />
</template>


<script>
import ExtensionEditDialog from "../components/ExtensionEditDialog.vue"
import cookie from "js-cookie";
import MenuBarManage from "../components/MenuBarManage.vue";

export default {
    name: 'manage',
    components: {
      ExtensionEditDialog,
      MenuBarManage
    },
    methods: {
        async getExtension() {
          const response = await fetch('api/getExtension?showHidden=1')
          const data = await response.json()
          this.extension = data
        },
        handleEdit(item) {
            this.$refs.dialog.openDialog(item,false)
        },
        handleCreate() {
            this.$refs.dialog.openDialog(null,true)
        },
        async handleDelete(item) {
          if (!confirm(`你确定要删除扩展”${item.name}“吗？`)) return;
          const response = await fetch('api/DeleteExtension', {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              id: item.id
            })
          })
          if (response.status === 200) {
            await this.getExtension();
          }
        }
    },
    async mounted () {
      if (!cookie.get('user')) return this.$router.push('/login');
      await this.getExtension()
    },
    data () {
      return {
        extension: [],
      }
    },
  }
</script>

<style scoped>
.action {
  border: none;
  margin-right: 8px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 50%;
}
.header {
    display: flex;
    padding-bottom: 10px;
    justify-content: space-between;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.create {
  cursor: pointer;
  border: none;
  padding: .6rem 1rem;
  border-radius: 12px;
  color: white;
  background: #0070F3;
}
</style>