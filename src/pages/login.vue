<template>
    <v-card class="card">
        <h2>登录</h2>
        <v-form ref="form" @submit="login()">
            <v-text-field 
                label="用户名" 
                v-model="username" 
                :rules="nameRules"
                required
                variant="outlined"
            ></v-text-field>
            <v-text-field 
                label="密码" 
                :rules="passwordRules"
                variant="outlined"
                type="password"
                v-model="password" 
                required
            ></v-text-field>
            <v-btn type="submit">登录</v-btn>
        </v-form>
    </v-card>
</template>

<script>

export default {
    name: 'login',
    data: () => ({
        name: '',
        password: '',
        nameRules: [
            v => !!v || '请输入用户名',
        ],
        passwordRules: [
            v => !!v || '请输入密码',
        ],
    }),
    methods: {
        async login() {
            try {
                const res = await fetch('api/login',{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                })
                if (res.status === 403) {
                    alert('用户名或密码错误')
                } else if (res.status === 200) {
                    this.$router.push('/manage')
                } else {
                    const data = await res.json()
                    alert(data.error)
                }
            } catch(err) {
                alert(err)
            }
        }
    }
}
</script>

<style scoped>
.card {
    padding: 1.1em;
}
</style>