<template lang="html">
  <div class="limiter show-content user_content clearfix enhanced ic-Layout-contentMain">
    <div :class="['pad-box-mega','STV1_Banner', info.wideBanner ? theme.wide : theme.banner]">
      <img :src="theme.logo"/>
      <p>{{info.title.toUpperCase()}}</p>
      <p class="STV1_CourseCode">{{info.semester}}</p>
    </div>
    <div class="content-box">
      <div class="grid-row">
        <div class="col-xs-6">
          <div class="styleguide-section__grid-demo-element">
            <div v-if="!info.isVideo" >
              <img :src="info.image" class="STV1_WeeklyIconIMG" alt=""> </img>
            </div>
            <div v-if="info.isVideo" class="embed-container">
              <iframe :src="this.videoLink" width="300" height="150" allowfullscreen="allowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe>
            </div>
          </div>
        </div>
        <div class="col-xs-6">
          <div class="styleguide-section__grid-demo-element">
            <div class="STV1_Welcome">WELCOME TO {{info.title.toUpperCase()}}</div>
            <p class="html" v-html="info.description"></p>
            <p>&nbsp;</p>
            <p>
              <a class="Button" v-if="info.sylButton" style="text-decoration: none;" :href="info.url + 'assignments/syllabus'" >Course Syllabus</a>
              <a class="Button" v-if="info.weekButton" style="text-decoration: none;" :href="weeklyUrl" >Weekly Activites</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="grid-row">
        <div class="col-xs-6">
          <div class="styleguide-section__grid-demo-element pad-box-mini border border-tbl">
            <p>Instructor:</p>
            <p v-for="prof in info.profs">Professor {{prof.name}} (<a :href="'mailto:' + prof.email">{{prof.email}}</a>) <br /> {{prof.office}}</p>
          </div>
        </div>
        <div class="col-xs-6" v-if="info.tas.length > 0">
          <div class="styleguide-section__grid-demo-element pad-box-mini border border-tbl">
            <p>TA:</p>
            <p v-for="ta in info.tas"> {{ta.name}} (<a :href="'mailto:' + ta.email">{{ta.email}}</a>) <br /> {{ta.office}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-box pad-box-mini border border-b">
      <p><strong>MEETING DATES / TIMES:</strong> {{info.meetings}}</p>
      <p><strong>SPECIAL DISCUSSION FORUMS:</strong> {{info.discussions}}</p>
    </div>
  </div>

</template>

<script>

import mutations from '../../store/mutations'

export default {
  data() {
    return {
      index: 1,
      editable: false
    }
  },
  computed: {
    currentItem(){
      return this.content[this.index - 1];
    }
  },
  methods: {
    clear(){
      this.$emit('clearArr');
      console.log('clearing...')
    },
    capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
    remove(){
      this.content.splice(this.index - 1, 1);
    },
    modify(item, input, event){
      // let week = _.cloneDeep(this.$store.getters.getWeeks()[this.selected])
      let prop = _.cloneDeep(this.$store.getters.getWeeks[this.idx][this.property])
      prop[this.index - 1][input] = event.target.value

      console.log(prop[this.index - 1][input])
      console.log(this.property)
      this.updateWeek(this.idx, this.property, prop)
    }
  },
  props: ['content', 'fn', 'inputs','property','idx'],
  mixins: [mutations]
}
</script>

<style lang="css">
.add-weekly {
  margin-top: 20px;
}

.drop-down {
  margin-bottom: 10px;
}

textarea{
  margin-bottom: 10px;
  width: auto;
}


.alert{
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
}

textarea {
  width: auto;
}

.quill{
  width: 700px;
  margin: auto;
}

el-tab-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: 'blue';
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.textbox{
  margin-left: 40px;
}

.limiter {
  width: 1000px;
  margin: auto;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  margin-right: 30px;
  width: 30%;
}

#copy-text-area {
  width: 100%;
}

.GFbanner {
  height: 190px;
}

.STV1_Banner {
  height: 190px;
}

.crop {
  width: 450px;
  height: 250px;
  object-fit: cover;
}

</style>
