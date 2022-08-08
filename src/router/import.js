const Home = () => import(/* webpackChunkName: "home" */ 'views/home/Home.vue')
const Takeout = () => import(/* webpackChunkName: "takeout" */ 'views/takeout/Takeout.vue')
const Order = () => import(/* webpackChunkName: "order" */ 'views/order/Order.vue')
const Search = () => import(/* webpackChunkName: "search" */ 'views/search/Search.vue')
const Profile = () => import(/* webpackChunkName: "profile" */ 'views/profile/Profile.vue')
export { Home, Takeout, Order, Search, Profile }
