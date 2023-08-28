import routes from './routes'
console.log(import.meta.env.BASE_URL, import.meta.env.VITE_APP_CURRENT_MODE)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
