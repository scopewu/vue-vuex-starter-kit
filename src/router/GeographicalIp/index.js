/**
 * Async Component Improvements
 * See: https://github.com/vuejs/vue/releases/tag/v2.3.0
 * **/

const GeographicalIp = () => ({
  component: import('./GeographicalIp.vue'),
  // loading: LoadingComp, // A component to use while the async component is loading
  // error: ErrorComp, // A component to use if the load fails
  // delay: 200, // Delay before showing the loading component. Defaults to 200ms.
  timeout: 4000
})

export default GeographicalIp
