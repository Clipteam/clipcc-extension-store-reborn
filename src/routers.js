import Home from './pages/home.vue'
import Manage from './pages/manage.vue'
import Login from './pages/login.vue'

export default [
    {
        path: '/',
        component: Home
    },
    {
        path: '/manage',
        component: Manage
    },
    {
        path: '/login',
        component: Login
    }
]