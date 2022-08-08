import Header from 'components/common/header/Header.vue'
import Footer from 'components/content/footer/Footer.vue'
export default function registerComponent(App) {
  App.component('Header', Header)
  App.component('Footer', Footer)
}
