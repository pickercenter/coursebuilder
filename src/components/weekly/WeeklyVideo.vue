<template lang="html">
  <transition name="fade">
    <div class="content-box">

      <div v-if="!this.$store.getters.getInfo.isBlended" class="grid-row top-xs">
        <div class="col-xs-4">
          <div class="styleguide-section__grid-demo-element">
            <div class="embed-container">
              <iframe :src="this.videoLink" width="300" height="150" allowfullscreen="allowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe>
            </div>
          </div>
        </div>
        <div class="col-xs-8">
          <div class="styleguide-section__grid-demo-element">
            <div class="STV1_Welcome">VIDEO: {{data.title}}</div>
            <p>{{data.description}}</p>
          </div>
        </div>
      </div>

      <div v-if="this.$store.getters.getInfo.isBlended" class="grid-row top-xs">
        <div class="col-xs-6">
          <div class="styleguide-section__grid-demo-element">
            <div class="embed-container">
              <iframe :src="this.videoLink" width="500" height="281" allowfullscreen="allowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe>
            </div>
          </div>
        </div>

        <div class="col-xs-6">
          <blockquote style="height: auto; border-left: 4px solid #008ee2; font-weight: normal; font-size: 16px;">
          <div class="styleguide-section__grid-demo-element">
            <div class="STV1_WelcomeAlt">VIDEO: {{data.title}}</div>
            <p>{{data.description}}</p>
          </div>
          </blockquote>
        </div>

      </div>

    </div>
  </transition>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: ['data', 'index'],
  computed: {
    videoLink(){
      let output;
      let link = this.data.source;
      let parts = link.split('/');
      if (parts[2].includes('vimeo.com')){
        output = 'https://player.vimeo.com/video/' + parts[3]
      }
      else if (parts[2].includes('youtube')){
        let split = link.split('=')
        output = 'https://www.youtube.com/embed/' + split[1]
      }
      else {
        output = link;
      }
      return output;
    }
  }
}
</script>

<style lang="css">

</style>
