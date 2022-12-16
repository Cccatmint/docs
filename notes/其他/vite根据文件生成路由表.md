```js
import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'



function generateDemoRouteList() {
  const list = []
  const demoFiles = import.meta.globEager("../views/DemoViews/*/index.vue")
  Object.keys(demoFiles).forEach(fileName => {
    const r = {
      path: fileName.replace('../views/DemoViews/', '').replace('/index.vue', ""),
      name: fileName.replace('../views/DemoViews/', '').replace('/index.vue', ""),
      component: () => new Promise((resolve) => { resolve(demoFiles[fileName].default) })
    }
    list.push(r)
  })
  return list
}
const demoRoutes = generateDemoRouteList()
export { demoRoutes }


const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView,
      children: demoRoutes
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

```

