<template lang="html">
  <div class="content-box">
    <div class="grid-row top-xs">
      <div v-if="info.useWeeklyImages" class="col-xs-4">
        <div class="styleguide-section__grid-demo-element">
          <a :title="dateType + ' ' + index" :href=' linked ? url + "pages/" + dateType.toLowerCase() + "-" + index : null'>
            <img class="crop STV1_WeeklyIconIMG" :src="data.imgSrc" alt=""  />
          </a>
        </div>
      </div>
      <div class="col-xs-8">
        <div class="styleguide-section__grid-demo-element">
          <a :title="dateType + ' ' + index" :href=' linked ? url + "pages/" + dateType.toLowerCase() + "-"  + index : null'>
            <div class="STV1_Welcome">{{dateType}} {{index}}: {{data.title}} </div>
          </a>
          <p>{{data.description}}</p>
          <p v-if="info.useDates">Class: {{formatWeek(data.date)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require('moment');

export default {
  data(){
    return{
    }
  },
  computed: {
    info: {
      get () {
        return this.$store.getters.getInfo
      },
      set (payload) {
        this.$store.commit('updateInfo', payload)
      }
    },
    dateType(){
      return this.info.classType.dateType
    },
    url(){
      return this.info.url.replace(/\/?(\?|#|$)/, '/$1')
    },
    server(){
      return this.$store.state.imageServer
    }

  },
  methods: {
    resizeUrl(url) {

      // If using, put :src="resizeUrl(data.imgSrc)" above

      let parts = url.split('/')
      return 'https://i.scaley.io/350x160/' + parts.slice(2).join('/');
      // let parts = url.split('/')
      // parts[2] += '.rsz.io'
      // parts[parts.length - 1] += '?width=350&height=150&mode=crop'
      // return parts.join('/')
    },
    formatWeek(date){
      return moment(date).format("dddd, MMMM Do")
    },
  },
  props: ['data', 'index', 'linked'],
  mounted(){
    setInterval( () => {
      // this.url = this.$store.state.info.url.replace(/\/?(\?|#|$)/, '/$1')
    }, 1000);
  }
}
</script>

<style lang="css">
  .crop {
    /*width: 350px;
    height: 150px;
    object-fit: cover;*/
  }
</style>
