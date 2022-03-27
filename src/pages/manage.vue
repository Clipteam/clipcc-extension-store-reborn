<template>
    <div class="header">
        <h2>扩展管理</h2>
        <v-btn variant="outlined" @click="handleCreate()">添加扩展</v-btn>
    </div>
  <v-table>
    <template v-slot:default>
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
              <v-btn icon="mdi-pencil" size="small" variant="text" @click="handleEdit(item)"></v-btn>
              <v-btn icon="mdi-delete" size="small" variant="text" @click="handleDelete(item)"></v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
  <extension-edit-dialog ref='dialog' :onSave="getExtension()" />
</template>


<script>
import ExtensionEditDialog from "../components/ExtensionEditDialog.vue"
import cookie from "js-cookie";

export default {
    name: 'manage',
    components: {
        ExtensionEditDialog
    },
    methods: {
        async getExtension() {
          const response = await fetch('api/getExtension')
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
.header {
    display: flex;
    justify-content: space-between;
}
</style>