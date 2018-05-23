<template lang="html">
  <div id="weeklylist">

  <hr>
  <div class="code-container">

    <!-- The user inputs are located in this div -->
    <div class="textbox-container">
      <el-input-number  style="margin: 10px;" v-model="userInput.toChange" :min="1" :max="20"></el-input-number>

      <button type="button" class="add-weekly center uk-button uk-button-primary"
      name="button" @click="populateActivities(userInput.toChange)">Edit # of Activities</button>

      <div v-if="info.classType.dateType == 'Week'" class="center">
        <strong>Start Date:</strong>
        <el-date-picker
          style="margin: 10px; margin-bottom:20px"
          v-model="info.startDate"
          @input="updateProp('startDate', $event)"
          type="date"
          placeholder="Pick start date">
        </el-date-picker>
      </div>

      <hr>

      <div>
        <el-card>
        <div class="code-input center">
          Edit {{info.classType.dateType}}: <el-input-number  style="margin: px;" v-model="userInput.weekNumber" :min="1" :max="weeks.length"
            controls-position="right" size="small" :label="'Edit ' + info.classType.dateType"></el-input-number>
        </div>

        <select v-model="userInput.weekNumber" class="uk-select" >
          <option v-for="n in weeks.length" :value="n">{{info.classType.dateType}} {{n}}</option>
        </select>

        <div v-if="weeks.length > 0">
          <div class="code-input center uk-margin-small-top">
            <label for="text-area">Title</label> <br>
            <el-input type="textarea" autosize v-model="weeks[userInput.weekNumber - 1].title"
            @input="updateWeek(userInput.weekNumber - 1,'title', $event)"> </el-input>
          </div>

          <div class="code-input center uk-margin-small-top">
            <label for="text-area">Description</label>
            <el-input type="textarea" autosize v-model="weeks[userInput.weekNumber - 1].description"
            @input="updateWeek(userInput.weekNumber - 1,'description', $event)"> </el-input>
          </div>
          <div class="center">
            <label >Date
            <el-date-picker
              style="margin: 10px; margin-bottom:20px"
              v-model="weeks[userInput.weekNumber - 1].date"
              @input="updateWeek(userInput.weekNumber - 1,'date', $event)"
              type="date"
              placeholder="Pick start date">
            </el-date-picker>
            </label>
          </div>

          <div class="code-input center ">
            <button type="button" name="button" class="uk-button-small uk-button-primary" @click="updateSwitch">{{userInput.uploadSwitchText}}</button> <br> <br>

            <!-- These forms upload the file or url to Amazon S3. More detail in the onFormSubmit method. -->
            <form name="file-form" v-show="this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('image')">
              <input name="image" id="image-file" type="file"> <br>
              <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
            </form>
            <form v-show="!this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('url')">
              <input name="imageUrl" id="image-url" type="text" class="uk-input"> <br> <br>
              <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
            </form>
            <button class="uk-button uk-button-danger uk-margin-small-top" @click="setDefaultImage(userInput.weekNumber - 1)">Reset Image</button>

          </div>
        </div>
        </el-card>
        <div class="center add-weekly">
          Links
          <el-switch
            v-model="info.useLinks"
            @input="updateProp('useLinks', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>

          Dates
          <el-switch
            v-model="info.useDates"
            @input="updateProp('useDates', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="center add-weekly">
          Images
          <el-switch
            v-model="info.useWeeklyImages"
            @input="updateProp('useWeeklyImages', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>

      </div>
    </div>

    <!-- This div contains the canvas code to be displayed -->
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
                  <i class="icon-clock"></i> {{activitiesTitle.toUpperCase()}} ACTIVITIES</h3>
              </div>
              <div class="pad-box-mini border border-b border-t">
                <p>Welcome to the {{activitiesTitle}} Activities page! Below you'll find an overview of all {{numWeeks}} lectures, each covering a distinct topic in the field of {{info.title}}. Clicking on a {{info.classType.dateType.toLowerCase()}} will take you to a page where you can watch the entire lecture and complete the activities related to that lecture.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Generates a weekly list html element for each activity in the weeklyActivities array in the vue data.
      See the WeeklyListItem.vue file in components for the html and styling. -->

      <weekly-list-item v-if="weeks.length > 0"
        v-for="(activity, index) in weeks"
        :data="activity"
        :linked="info.useLinks"
        :index="index+1">
      </weekly-list-item>

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


</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import mutations from '../store/mutations'
import { EventBus } from '../bus'
import { quillEditor } from 'vue-quill-editor';
import saveState from 'vue-save-state';
import WeeklyListItem from './weekly/WeeklyListItem'
import Home from './Home'
import _ from 'lodash'

var moment = require('moment');

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote',{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] },'clean'],
  ['link', 'image']
];

export default {
  name:"Weekly List",
  data () {
    return {
      userInput: {
        startDate: null,
        weekNumber: 1,
        toChange: 12,
        isFile: true,
        isLinked: true,
        uploadSwitchText: "Click to Upload Image from Url",
      },
      needsInit: true,
      outputCode: '',
      editorOption:{
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor,
    WeeklyListItem
  },
  mixins: [saveState, mutations],
  watch: {
    "info.startDate": function(){
        this.updateDates();
    },
    "info.classType": function(){
        this.updateDates();
        this.updateImages()
    },
  },
  computed: {
    ...mapGetters([
      'getInfo', 'dWeek', 'getWeeks'
    ]),
    day() {
      return moment(this.info.startDate).format("dddd, MMMM Do")
    },
    week() {
      return moment(this.info.startDate).add(1, 'w').format("dddd, MMMM Do")
    },
    activitiesTitle() {
      if (this.info.classType.dateType == "Session") return "Session"
      return this.info.classType.dateType == "Week" ? "Weekly" : "Daily"
    },
    // Changes the description wording so that it matches the current number of weeks on the page
    numWeeks(){
      let num = this.weeks.length

      var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
      var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

      if ((num = num.toString()).length > 9) return 'overflow';
      let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return; var str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
      return str;
    }
  },
  methods: {
    ...mapMutations([
      'addWeek', 'sliceWeek', 'updateWeeks', 'updateInfo'
    ]),
    updateSwitch(){
      this.userInput.isFile = !this.userInput.isFile;
      this.userInput.uploadSwitchText = this.userInput.isFile ? "Click to Upload Image from URL" : "Click to Upload Image from Computer"
    },
    updateDates(){
      // right now do not update if in exec training mode
      if (true){ //this.info.classType.dateType == "Week"
        this.weeks.forEach((week, index)=>{
          let interval = this.info.classType.dateType == "Week" ? 'w' : 'd'
          let date = moment(this.info.startDate).add(index, interval)
          this.updateWeek(index,'date', date)
        })
    }
    },
    updateImages(){
      this.weeks.forEach((week, index)=>{
        if (index > 14 && this.info.classType.dateType == "Week") index = 14;
        let imgSrc = this.$store.state.imageServer + this.info.classType.dateType.toLowerCase() + (index + 1) + '.png'
        if (week.imgSrc.includes(this.$store.state.imageServer)) this.updateWeek(index,'imgSrc', imgSrc)
      })
    },
    setDefaultImage(index){
      let imgSrc = this.$store.state.imageServer + this.info.classType.dateType.toLowerCase() + (index + 1) + '.png'
      this.updateWeek(index,'imgSrc', imgSrc)
    },
    // Adds a new weekly activity based on the temp info given below. The src refers to the default week thumbnail hosted on S3.
    AddActivity(){
      let index = this.weeks.length + 1

      if (index > 15 && this.info.classType.dateType == "Week") index = 15;

      let tempWeek = _.cloneDeep(this.dWeek)
      tempWeek.imgSrc = this.$store.state.imageServer + this.info.classType.dateType.toLowerCase() + index + '.png'
      tempWeek.date = moment()
      tempWeek.title = "Lecture " + index
      tempWeek.secondTitle = "Lecture " + index + " II"

      // let tempWeek = this.dWeek
      // tempWeek.imgSrc = this.$store.state.imageServer + 'week' + index + '.png'
      //
      this.addWeek(tempWeek)
    },
    // Adds a user inputted number of activities
    populateActivities(num){
      let diff = num - this.weeks.length

      console.log(diff)

      if (diff > 0 ){
        for (let i = 0; i < diff; i++ ) this.AddActivity();
      }

      if (diff < 0) {
        this.userInput.weekNumber = 1;
        this.sliceWeek(num);
      }

      this.updateDates()

    },
    setToDefault(){
      this.$store.commit('updateWeeks', [])
      this.populateActivities(12);
    },
    // Handles uploading the file or url to Amazon EC2 via POST request, which subsequently uploads the image to S3
    // and sends back the new url as a JSON in the Api response

    onFormSubmit (type, ev){
      var formData = new FormData();

      if (type == 'url'){
        console.log('uploading url...')
        var imageurl = document.querySelector('#image-url'); // Gets form data in html
        if (imageurl.value == "") return;
        formData.append("imageUrl", imageurl.value);  // Adds api header to tell server that it is a url
      }
      else {
        console.log('uploading file...')
        var imagefile = document.querySelector('#image-file');
        if (imagefile.files.length == 0) return;
        formData.append("image", imagefile.files[0]); // Adds api header to tell server that it is a file
      }

      // More api headers to tell the server the dimensions to crop
      formData.append('imageWidth', 360)
      formData.append('imageHeight', 150)

      // Send post request to Amazon server using vue-resource with form data
      this.$http.post('http://ec2-34-229-16-148.compute-1.amazonaws.com:3000/image',formData).then( response => {
        console.log('success')
        let imageData = JSON.parse(response.bodyText);
        this.updateWeek(this.userInput.weekNumber - 1,'imgSrc', imageData.imageUrls[0]) // Change requisite weekly activity image src to the hosted file
        // this.weeks[this.userInput.weekNumber - 1].imgSrc = imageData.imageUrls[0]
      }, response => {
        console.log(response)
      });

    },
    getSaveStateConfig() {
      return {
          'cacheKey': 'Weeklylist',
      };
    }
  },
  mounted(){
    if (this.needsInit) {
      console.log('populating...')
      // this.populateActivities(12)
      this.needsInit = false;
    }
    this.updateCode();
  },
  beforeCreate(){
    EventBus.$on('import-data', data => {
      this.weeks = data.weeklyList.weeks
      console.log('importing data to weekly list...')
    })

    EventBus.$on('export-data', () => {
      let weeklyList = this.$data
      EventBus.$emit('list-data', weeklyList)
      console.log('sending list')
    })
  },
  beforeUpdate(){
  }

}
</script>



<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

textarea {
  width: auto;
}

.add-weekly {
  margin: 10px
}

.week-card {
  width: 400px;
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 350px;
  margin-left: 3%;
  margin-right: 30px;
  align-self: flex-start;
  margin-top: 20px
}

.code-input {
  margin: 10px;
}

.quill {
  width: 75%;

}

#canvas-code {
  width: 1015px;
  margin: auto;
  align-self: flex-start;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
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

</style>
