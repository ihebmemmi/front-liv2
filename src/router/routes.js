
const routes = [
  {
    path: '/home',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MYLayout.vue'),
    children: [
      
      { path: '/index', component: () => import('pages/Index.vue'),
        meta: {
                requiresAuth: true
              }
     },
      { path: '/settings', component: () => import('pages/Settings.vue'),
        meta: {
                requiresAuth: true
              }          
      },
    
      { path: '/clothinfos', component: () => import('components/ClothInfos.vue'),
          meta: {
                  requiresAuth: true
                }   
      },
      { path: '/profile', component: () => import('pages/Profile.vue'),
          meta: {
                   requiresAuth: true
                }      
      },
      { path: '/gains', component: () => import('src/pages/Gains.vue'),
          meta: {
                 requiresAuth: true
                }  
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    redirect: "/home",
    meta: {
      requiresAuth: true
    }
    //component: () => import('pages/Error404.vue')
  },
  {
    path: "/",
    component: () => import("layouts/AuthenticationLayout.vue"),
    children: [
      {
        path: "/login",
        component: () => import("src/pages/auth/LoginUser.vue")
      },

      {
        path: "/register",
        component: () => import("src/pages/auth/RegisterUser.vue")
      },
      {
        path: "/index",
        alias: "/",
        component: () => import("src/pages/Index.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];

export default routes
