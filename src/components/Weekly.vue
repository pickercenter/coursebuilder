<template lang="html">

  <div id="weeklylist">

  <hr>

  <div class="code-container">

    <div class="textbox-container">
      <el-select v-model="selected" placeholder="Select" style="margin-right: 100px; margin-left:100px; margin-bottom:10px; width: 150px;">
        <el-option
          v-for="(week, index) in weeks"
          :key=index
          :label="info.classType.dateType + ' ' + (index + 1)"
          :value="index">
        </el-option>
      </el-select>

      <el-input autosize class="code-input" style="width: 400px" placeholder="Please input week title" v-model="weeks[selected].title"
        @input="updateWeek(selected,'title', $event)"></el-input>
      <!-- <button type="button" name="button" class="uk-button uk-button-primary" @click="setToDefault">Reset to Default</button> -->
      <button type="button" name="button" class="show-editor center uk-button uk-button-primary" @click="showEditor = !showEditor" >{{showEditor ? "Hide Text Editor" : "Show Text Editor"}}</button>

      <!-- This transition is defined as a css animations in the style section -->
      <transition name="fade"></transition>
      <div v-show="showEditor">

        <!-- Alert to warn about how to edit the table -->
        <el-alert
          title="Edit Readings and Lecture Presentation table directly in Canvas" type="warning"
          show-icon style="width:80%; margin:auto; margin-bottom: 10px" justify="center">
        </el-alert>

        <div class="quill">
          <quill-editor ref="myTextEditor"
                        v-model="weeks[selected].body"
                        @input="updateWeek(selected,'body', $event)"
                        :config="editorOption">
          </quill-editor>
        </div>

        <!-- <div class="quill">
          <quill-editor ref="myTextEditor"
                        v-model="weeks[selected].required"
                        :config="editorOption">
          </quill-editor>
        </div> -->

      </div>
      </transition>


      <!-- This is a seperate component to handle adding new Acitivity Page elements abstractly. For more information check the WeeklyCodeModule.vue file. -->
      <weekly-code-module
        class="code-module"
        :content="weeks[selected].videos"
        property='videos'
        :idx="selected"
        :fn="addVideo"
        :inputs="['title','description', 'source']"
        @clearArr="updateWeek(selected,'videos', [])">
        Video
      </weekly-code-module>

      <weekly-code-module
        class="code-module"
        :content="weeks[selected].discussions"
        property='discussions'
        :idx="selected"
        :fn="addDiscussion"
        :inputs="['link','due', 'available']"
        @clearArr="updateWeek(selected,'discussions', [])">
        Discussion
      </weekly-code-module>

      <weekly-code-module
        class="code-module"
        :content="weeks[selected].assignments"
        property='assignments'
        :idx="selected"
        :fn="addAssignment"
        :inputs="['link','due', 'available']"
        @clearArr="updateWeek(selected,'assignments', [])">
        Assignment
      </weekly-code-module>


    </div>

    <!-- Where the canvas code is stored -->
    <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]">
        <p>{{info.title.toUpperCase()}}</p>
      </div>
      <div class="grid-row">
        <div class="col-xs-12 col-lg-12">
          <div class="ic-image-text-combo">
            <div class="ic-image-text-combo__text">
              <div class="pad-box-mini">
                <h3 style="margin-bottom: 5px;">
                  <i class="icon-clock"></i> {{info.classType.dateType}} {{selected + 1}}: {{weeks[selected].title}}</h3>
                </div>
                <div class="pad-box-mini border border-b border-t">
                  <p v-html="weeks[selected].body"></p>
                  <div class="pad-box-mini">
                    <span v-html="weeks[selected].required" >
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- The videos, discussions, and assignments are all built into their own smaller components to keep it more organized
      They are WeeklyDiscussion.vue, WeeklyAssignment.vue, and WeeklyVideo.vue respectively. -->
      <weekly-video  v-for="(video, index) in weeks[selected].videos" :data="video" :index="index+1" :key="video.source"> </weekly-video>

      <transition name="fade">
      <div class="item-group-container" style="padding-bottom: 0;" v-if="weeks[selected].assignments.length > 0 || weeks[selected].discussions.length > 0">
        <div class="item-group-condensed">
          <ul id="cond_group_1" class="ig-list">
          <weekly-discussion  v-for="(disc, index) in weeks[selected].discussions" :data="disc" :index="index+1" :key="disc.link"> </weekly-discussion>
          <weekly-assignment  v-for="(assign, index) in weeks[selected].assignments" :data="assign" :index="index+1" :key="assign.link"> </weekly-assignment>
          </ul>
        </div>
      </div>
    </transition>

    </div>

  </div>

  <div class="uk-float-right">
    <a class="uk-button uk-button-primary" href="#modal-overflow" uk-toggle>View the Code</a>
    <button class="uk-button uk-button-primary" @click="copyText('aux')">Copy the Code</button>
    <button class="uk-button uk-button-danger" @click="setToDefault">Reset to Default</button>
  </div>

  <div id="modal-overflow" uk-modal>
      <div class="uk-modal-dialog">

          <button class="uk-modal-close-default" type="button" uk-close></button>

          <div class="uk-modal-header">
              <h2 class="uk-modal-title">Canvas Code</h2>
          </div>

          <div class="uk-modal-body" uk-overflow-auto>
            <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea>
          </div>

          <div class="uk-modal-footer uk-text-right">
              <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
              <button class="uk-button uk-button-primary" type="button" @click="copyText">Copy Code</button>
          </div>

      </div>
  </div>

  <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left uk-margin-medium-top" uk-grid>
      <div class="uk-background-muted uk-padding">
      <p>Copyright © Columbia University. All rights reserved.</p>
      </div>
  </div>

  <!-- <p style="font-weight: bold" class="center">Code Output</p>

  <div class="footer">
    <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea> <br> <br>
  </div> -->

</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import mutations from '../store/mutations'
import { EventBus } from '../bus'
import { quillEditor } from 'vue-quill-editor';
import WeeklyCodeModule from './weekly/WeeklyCodeModule'
import WeeklyVideo from './weekly/WeeklyVideo'
import WeeklyDiscussion from './weekly/WeeklyDiscussion'
import WeeklyAssignment from './weekly/WeeklyAssignment'
import saveState from 'vue-save-state';
import Home from './Home'

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote', {
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  ['link', 'clean']
];

export default {
  name: "weekly",
  data() {
    return {
      userInput: {
        videoNumber: 1,
        weekTitle: 'WEEK 1: Sustainable Agriculture and Food Systems: Key Concepts and Historical Perspective',
        description: "We will begin with an overview of the course objectives and content, the methods of instruction, the assignments, and the grading system. We will then present and discuss “The Big Picture,” starting with the historical context of the current global food system, including the “Green Revolution.” Which institutions have shaped and will shape global food systems? We will briefly discuss the concept of Sustainable Intensification. We will also consider the recently agreed SDGs and how they could contribute to more sustainable and equitable global food systems. And we will discuss some of the forces shaping food systems around the world.",
        required:'<span ><p><strong>Lecture Slides:</strong></p><p><strong>Download PDF:&nbsp;</strong><a href="https://courseworks2.columbia.edu/courses/29191/files/1032282/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">GFS Week 6 Africa (February 21, 2017) Final.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></p><p><strong>Required Readings / Viewings:</strong></p><ul><li>Sanchez, P.A. (2002) Soil fertility and hunger in Africa.&nbsp;<em>Science&nbsp;</em><strong>295</strong>: 2019-2020.</li><li>Download PDF:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/929036/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">Soil_Fertility_and_Hunger_in_Africa_2002.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li><li><strong>Familiarize yourself with the work of the Alliance for an African Green Revolution (AGRA):&nbsp;</strong><a href="http://www.agra.org/" target="_blank" style="color: rgb(0, 142, 226);">http://www.agra.org/&nbsp;(Links to an external site.)</a></li></ul><p><strong>Supplementary Resources</strong></p><ul><li>Listen: --“African Land Fertile Ground for Crops and Investors.” NPR. June 15, 2012.&nbsp;<a href="http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors" target="_blank" style="color: rgb(0, 142, 226);">http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors&nbsp;(Links to an external site.)</a></li><li>Download mp3:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/1009373/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">20120615_atc_06.mp3<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li></ul></span>',
      },
      selected: 0,
      videoEditable: false,
      showEditor: false,
      videos: [],
      discussions: [],
      assignments: [],
      outputCode: '',
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor,
    WeeklyVideo,
    WeeklyCodeModule,
    WeeklyDiscussion,
    WeeklyAssignment
  },
  mixins: [ mutations],
  computed: {
    ...mapGetters([
      'getInfo', 'dWeek', 'getWeeks'
    ]),
  },
  methods: {
    addVideo() {
      let tempVideo = {
        title: "All that Glitters is not Gold (18 minutes)",
        description: "‘All that Glitters is not Gold’ features various communities’ representatives concern about the introduction of genetically engineered ‘Golden’ rice in the Philippines.",
        source: "https://www.youtube.com/watch?v=GxSGKD50ioE"
      }
      let arr = _.cloneDeep(this.weeks[this.selected].videos)
      arr.push(tempVideo);
      this.updateWeek(this.selected,'videos', arr)

    },
    addDiscussion() {
      let tempDisc = {
        due: "Feb 4, 2017",
        available: "Jan 1",
        link: this.info.url + 'discussion_topics/',
        points: 10
      }

      let arr = _.cloneDeep(this.weeks[this.selected].discussions)
      arr.push(tempDisc);
      this.updateWeek(this.selected,'discussions', arr)

    },
    addAssignment() {
      let tempAssign = {
        due: "Feb 4, 2017",
        available: "Jan 1",
        link: this.info.url + 'assignments/',
        points: 10
      }

      let arr = _.cloneDeep(this.weeks[this.selected].assignments)
      arr.push(tempAssign);
      this.updateWeek(this.selected,'assignments', arr)

    },
    setToDefault(){
      console.log('resetting data...')
      this.userInput = { ...this.$store.getters.dWeekly};
      this.weeks[this.selected].videos = this.weeks[this.selected].assignments = this.weeks[this.selected].discussions = [];
    },
    getSaveStateConfig() {
      return {
          'cacheKey': 'Weekly',
      };
    }
  },
  mounted() {
    this.updateCode();
  },
  beforeCreate(){
    EventBus.$on('set-default', response => {
      this.setToDefault()
      console.log(response)
    })

    EventBus.$on('import-data', data => {
      this.userInput = { ...data.weekly.userInput}
      this.weeks[selected].videos = data.weekly.videos
      this.weeks[selected].assignments = data.weekly.assignments
      this.weeks[selected].discussions = data.weekly.discussions
      console.log('importing data to weekly...')
    })

    EventBus.$on('export-data', () => {

      // let weeklyList = {
      //   weeklyActivites: this.weeklyActivites
      // }
      // EventBus.$emit('list-data', weeklyList)

      let weekly = this.$data
      console.log('sending weekly')
      EventBus.$emit('weekly-data', weekly)
    })
  },
  beforeUpdate() {
  }

}
</script>



<style scoped>
h1,
h2 {
  font-weight: normal;
}

textarea {
  width: auto;
}

.code-module {
  margin-left: 20%;
  margin-right: 20%;
}

.show-editor {
  height: 40px;
  margin-bottom: 10px;
  margin-left: 30%;
  margin-right: 30%;
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 40%;
  margin: auto;
  align-self: flex-start;
  margin-top: 20px
}

.code-input {
  margin: 10px;
}

.quill {
  width: 80%;
  margin-bottom: 25px;
  margin: auto;
}

#canvas-code {
  width: 1015px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

#copy-text-area {
  width: 80%;
  height: 200px
}

.GFbanner {
  height: 190px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}
</style>
