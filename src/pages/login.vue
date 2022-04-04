<template>
<menu-bar-manage />
<div class="container">
    <div class="card">
        <form ref="form" @submit.prevent="login(e)">
        <div>
            <label for="name">用户名</label>
            <input
                type="text"
                name="name"
                placeholder="请输入用户名"
                v-model="name" 
                required
                variant="outlined"
            />
        </div>
        <div>
            <label for="password">密码</label>
            <input 
                name="password"
                type="password"
                placeholder="请输入密码"
                v-model="password" 
                required
            />
        </div>
            <button type="submit">登录</button>
        </form>
    </div>
    </div>
</template>

<script>
import MenuBarManage from "../components/MenuBarManage.vue"

export default {
    name: "login",
    data: () => ({
        name: "",
        password: ""
    }),
    methods: {
        async login(e) {
            try {
                const res = await fetch("api/login", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.name,
                        password: this.password
                    })
                });
                if (res.status === 403) {
                    alert("用户名或密码错误");
                }
                else if (res.status === 200) {
                    this.$router.push("/manage");
                }
                else {
                    const data = await res.json();
                    alert(data.error);
                }
            }
            catch (err) {
                alert(err);
            }
        }
    },
    components: { MenuBarManage }
}
</script>

<style scoped>
.card {
    display: flex;
    height: 300px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
form {
    padding: 1.8rem;
    border-radius: 15px;
    border: 3px solid #f1f1f1;
}
button[type='submit'] {
    cursor: pointer;
    border: none;
    padding: .6rem 1rem;
    border-radius: 12px;
    color: white;
    background: #0070F3;
}

/* Set a style for all buttons */
button {
    transition: all .15s;
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>