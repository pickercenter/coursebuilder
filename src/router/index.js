import Vue from 'vue'
import Router from 'vue-router'
import Splash from 'components/Splash'
import Home from 'components/Home'
import Syllabus from 'components/Syllabus'
import Program from 'components/ProgramOverview'
import Weekly from 'components/Weekly'
import WeeklyList from 'components/WeeklyList'
import Export from 'components/Export'
import Guide from 'components/Guide'
import Credits from 'components/Credits'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome Page',
      component: Splash
    },
    {
      path: '/home',
      name: 'Home Template',
      component: Home
    },
    {
      path: '/syllabus',
      name: 'Syllabus Template',
      component: Syllabus
    },
    {
      path: '/weekly',
      name: 'Weekly Activity',
      component: Weekly
    },
    {
      path: '/program',
      name: 'Program Overview',
      component: Program
    },
    {
      path: '/weeklylist',
      name: 'Weekly Activities List',
      component: WeeklyList
    },
    {
      path: '/export',
      name: 'Export',
      component: Export
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/credits',
      name: 'Credits',
      component: Credits
    }
  ]
})
