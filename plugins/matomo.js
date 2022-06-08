import Vue from 'vue'
import VueMatomo from 'vue-matomo'

export default ({ app }) => {
    console.log(11123,app)
  Vue.use(VueMatomo, {
    router: app.router,
    // Configure your matomo server and site by providing
  host: 'https://matomo.example.com',
  siteId: 1,

  // Changes the default .js and .php endpoint's filename
  // Default: 'matomo'
  trackerFileName: 'matomo',

  // Overrides the autogenerated tracker endpoint entirely
  // Default: undefined
  // trackerUrl: 'https://example.com/whatever/endpoint/you/have',

  // Overrides the autogenerated tracker script path entirely
  // Default: undefined
  // trackerScriptUrl: 'https://example.com/whatever/script/path/you/have',

  // Enables automatically registering pageviews on the router
  router: router,

  // Enables link tracking on regular links. Note that this won't
  // work for routing links (ie. internal Vue router links)
  // Default: true
  enableLinkTracking: true,

  // Require consent before sending tracking information to matomo
  // Default: false
  requireConsent: false,

  // Whether to track the initial page view
  // Default: true
  trackInitialView: true,

  // Run Matomo without cookies
  // Default: false
  disableCookies: false,

  requireCookieConsent: false,
  enableHeartBeatTimer: false,
  heartBeatTimerInterval: 15,
  debug: false,
  userId: undefined,
  cookieDomain: undefined,
  domains: undefined,
  preInitActions: [],
  trackSiteSearch: false

    /** Other configuration options **/
  })
}