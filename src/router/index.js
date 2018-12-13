import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue';
import Auth from '../components/auth.vue';
import Registr from '../components/registr.vue';
import Dashboard from '../components/dashboard.vue'
import Parsing from '../components/parsing.vue'
import AdminPanel from '../components/admin.vue'
import Hash from '../components/hash.vue'
import Page1 from '../components/Page1.vue'
import Page2 from '../components/Page2.vue'

Vue.use(Router)

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

function guardRoute (to, from, next) {
  if (window.confirm(`Navigate to ${to.path}?`)) {
    next()
  } else if (window.confirm(`Redirect to /page1?`)) {
    next('/page1')
  } else {
    next(false)
  }
}

function guardAdmin (to, from, next) {
  // debugger
  if (localStorage.token) {
    const data = parseJwt(localStorage.token)
    if (data.role == "admin") {
      return next()
    }
  }
  return next('/home-page')
}
function guardDashboard (to, from, next) {
  // debugger
  if (localStorage.token) {
    const data = parseJwt(localStorage.token)
    if (data.role) {
      return next()
    }
  }
  return next('/home-page')
}



export default new Router({
  routes: [
    { path: '/', redirect: { name: 'auth' } },
    {
      name: 'homePage',
      path: '/home-page',
      component: HomePage
    },
    {
      name: 'auth',
      path: '/auth',
      component: Auth
    },
    {
      name: 'registration',
      path: '/registration',
      component: Registr
    },
    {
      // name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
      beforeEnter:guardDashboard
    },
    {
      name: 'parsing',
      path: '/parsing',
      component: Parsing
    },
    {
      name: 'adminPanel',
      path: '/admin-panel',
      component: AdminPanel,
      beforeEnter: guardAdmin
    },
    {
      path: '/page1',
      component: Page1,
      beforeEnter: guardRoute
    },
    {
      path: '/page2',
      component: Page2
    }
    // {
    //   name:"Hash",
    //   path:'/hash/:id',
    //   component: Hash
    // }
  ]
})


// router.beforeEach((to, from, next) => {

// })
// export default router