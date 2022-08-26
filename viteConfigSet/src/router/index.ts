import {createRouter,createWebHashHistory} from 'vue-router'
const CommonRoutes = [
  {path:'/',component:import("@/views/common/401.vue")},
]

function getRouter(){
  return createRouter({
    history:createWebHashHistory(),//采用hash模式
    routes:CommonRoutes
  })
}

const router = getRouter()

export default router