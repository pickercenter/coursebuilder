<template lang="html">

  <div id="weeklylist">

  <hr>

  <div class="code-container">

    <div class="textbox-container">
      <el-card class="card center" style="width:325px;">
        How Many Weeks: <br>
        <el-input-number  style="margin: 10px;" v-model="info.execWeeks" @input="updateProp('execWeeks', $event)" :min="1" :max="4"></el-input-number>

        <br> Start Week <br>
        <el-date-picker
          v-on:change="updateDays"
          style="margin: 10px; margin-bottom:20px"
          :value="info.startDate"
          @input="updateProp('startDate', $event)"
          type="week"
          format="M / d / yyyy"
          placeholder="Pick start date">
        </el-date-picker>

        <br> Days of Week<br>
        <el-select v-model="info.weekDays"
          @input="updateProp('weekDays', $event)"
          multiple placeholder="Select"
          style="margin: 10px; width: 270px"
          v-on:visible-change="updateDays"
          v-on:remove-tag="updateDays">

          <el-option
            v-for="(day, index) in days"
            :key="index"
            :label="day"
            :value="index">
          </el-option>
        </el-select>

        <br>

        Offset Class Start: <br>
        <el-input-number  style="margin: 5px;" v-model="info.weekOffset" @input="updateProp('weekOffset', $event)" :min="0" :max="info.execWeekLength - 1"></el-input-number>

        <button type="button" class="add-weekly center uk-button uk-button-primary"
        name="button" @click="populateActivities(info.execWeeks * info.execWeekLength - info.weekOffset)">Edit # of Sessions</button>
        <br>
      </el-card>

      <el-card class="card">
      <div class="code-input center">
        Edit {{info.classType.dateType}}: <el-input-number  style="margin: px;" v-model="userInput.weekNumber" :min="1" :max="weeks.length"
          controls-position="right" size="small" :label="'Edit ' + info.classType.dateType"></el-input-number>
      </div>

      <select v-model="userInput.weekNumber" class="uk-select">
        <option v-for="n in weeks.length" :value="n">{{info.classType.dateType}} {{n}}</option>
      </select>

        <div class="code-input center uk-margin-small-top" v-if="weeks[userInput.weekNumber - 1]">
          <label for="text-area">Title</label> <br>
          <el-input type="textarea" autosize :value="weeks[userInput.weekNumber - 1].title" @input="updateWeek(userInput.weekNumber - 1, 'title', $event)"> </el-input>
        </div>

        <div v-if="info.multipleSessions && !info.autoSessionTitle" class="code-input center uk-margin-small-top">
          <label for="text-area">Second Session Title</label> <br>
          <el-input type="textarea" autosize v-model="weeks[userInput.weekNumber - 1].secondTitle" @input="updateWeek(userInput.weekNumber - 1, 'secondTitle', $event)"> </el-input>
        </div>

      <div class="center" v-if="weeks[userInput.weekNumber - 1]">
        <label >Date
        <el-date-picker
          style="margin: 10px; margin-bottom:20px"
          v-model="weeks[userInput.weekNumber - 1].date"
          @input="updateWeek(userInput.weekNumber - 1, 'date', $event)"
          type="date"
          placeholder="Pick start date">
        </el-date-picker>
        </label>
      </div>
      </el-card>

      <el-card class="card center" style="width:290px">

          Two-Sessions per Day
          <el-switch
            v-model="info.multipleSessions"
            @input="updateProp('multipleSessions', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <br>
          <div v-if="info.multipleSessions">
            <br>
            Auto Title Second Session
            <el-switch
              v-model="info.autoSessionTitle"
              @input="updateProp('autoSessionTitle', $event)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
          <br>
          Use Professor Name
          <el-switch
            v-model="info.useProfName"
            @input="updateProp('useProfName', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <br> <br>

          <label for="text-area">First Session Time</label> <br>
          <el-input type="textarea" autosize v-model="info.sessionOneTime" @input="updateProp('sessionOneTime', $event)"> </el-input>
          <br>
          <div v-if="info.multipleSessions">
            <label for="text-area">Second Session Time</label> <br>
            <el-input type="textarea" autosize v-model="info.sessionTwoTime" @input="updateProp('sessionTwoTime', $event)"> </el-input>
          </div>
      </el-card>

    </div>

    <!-- Where the canvas code is stored -->
    <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]">
        <p>{{info.title.toUpperCase()}}</p>
      </div>

      <div class="content-box">
        <div class="grid-row top-xs">
          <div class="col-xs-12">
            <div class="styleguide-section__grid-demo-element">
              <p style="text-align: left;"><span>The objective of this program is to offer experienced Brazilian public sector managers different tools to be used in solving problems and improving results, within an ethical model. Based on successful examples from around the world of public projects in urban areas, health, and education, the sessions will help executives explore new ways of working together across traditional boundaries to solve complex urban problems.</span></p>
            </div>
          </div>
        </div>
      </div>
      <div v-for="week in info.execWeeks">
        <div class="content-box">
          <div :class="'STV1_CC_Banner0' + (week + 2)">
            <p class="STV1_CC_BannerTitle">SCHEDULE // WEEK {{week}}</p>
          </div>
        </div>

        <div class="content-box">
          <div class="grid-row top-xs">
            <div class="col-xs-12">
              <div class="styleguide-section__grid-demo-element">
                <table class="ic-Table ic-Table--hover-row" style="height: 58px;" width="431">
                  <thead>
                    <tr>
                      <th style="width: 88px;">&nbsp;</th>
                      <th style="width: 74px;" v-if="week == 1" v-for="(day, index) in info.weekOffset">
                        {{incrementDate(info.startDate, week - 1, info.weekDays[index])}}
                      </th>
                      <th style="width: 74px;" v-if="week == 1"
                      v-for="(day, index) in (info.execWeekLength - info.weekOffset)">
                        {{parseDate((day - 1) + (week - 1) * info.execWeekLength)}}
                      </th>
                      <th v-if="week > 1"
                      style="width: 74px;" v-for="(day, index) in (info.execWeekLength)">
                        {{parseDate((day - 1) + (week - 1) * info.execWeekLength - info.weekOffset)}}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="width: 88px;">{{info.sessionOneTime}}</td>
                      <td style="width: 74x;" v-if="week == 1" v-for="idx in info.weekOffset">
                      <p v-if="idx == 1"><em>(Overview of Program)</em></p>
                      <p><strong>NO CLASS</strong></p>
                      </td>
                      <td style="width: 74x;" v-if="week == 1" v-for="day in (info.execWeekLength - info.weekOffset)">
                        <p v-if="day == 1 && week == 1 && info.weekOffset == 0"><em>(Overview of Program)</em></p>
                        <div v-if="(day - 1) + (week - 1) * info.execWeekLength - info.weekOffset < weeks.length">
                          <p><strong>{{weeks[(day - 1) + (week - 1) * info.execWeekLength].title}}</strong></p>
                          <p v-if="info.useProfName">{{info.profs[0].name}}</p>
                        </div>
                      </td>
                      <td style="width: 74x;" v-if="week !== 1"  v-for="day in (info.execWeekLength)">
                        <div v-if="(day - 1) + (week - 1) * info.execWeekLength - info.weekOffset < weeks.length">
                          <p><strong>{{weeks[(day - 1) + (week - 1) * info.execWeekLength - info.weekOffset].title}}</strong></p>
                          <p v-if="info.useProfName">{{info.profs[0].name}}</p>
                        </div>
                      </td>
                    </tr>

                    <tr v-if="info.multipleSessions">
                      <td style="width: 88px;"><strong>Lunch Break</strong></td>
                      <td v-for="day in info.execWeekLength"></td>
                    </tr>
                    <tr v-if="info.multipleSessions">
                      <td style="width: 88px;">{{info.sessionTwoTime}}</td>
                      <td style="width: 74x;" v-if="week == 1" v-for="idx in info.weekOffset">
                      <p><strong>NO CLASS</strong></p>
                      </td>
                      <td style="width: 74x;" v-if="week == 1" v-for="day in (info.execWeekLength - info.weekOffset)">
                        <div v-if="(day - 1) + (week - 1) * info.execWeekLength - info.weekOffset < weeks.length">
                          <p v-if="info.autoSessionTitle"><strong>{{weeks[(day - 1) + (week - 1) * info.execWeekLength].title + " II"}}</strong></p>
                          <p v-else><strong>{{weeks[(day - 1) + (week - 1) * info.execWeekLength].secondTitle}}</strong></p>
                          <p v-if="info.useProfName">{{info.profs[0].name}}</p>
                        </div>
                      </td>
                      <td style="width: 74x;" v-if="week !== 1" v-for="day in (info.execWeekLength)">
                        <div v-if="(day - 1) + (week - 1) * info.execWeekLength - info.weekOffset < weeks.length">
                          <p v-if="info.autoSessionTitle"><strong>{{weeks[(day - 1) + (week - 1) * info.execWeekLength - info.weekOffset].title + " II"}}</strong></p>
                          <p v-else><strong>{{weeks[(day - 1) + (week - 1) * info.execWeekLength].secondTitle}}</strong></p>
                          <p v-if="info.useProfName">{{info.profs[0].name}}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { mapGetters, mapMutations } from "vuex";
import { EventBus } from "../bus";
import { quillEditor } from "vue-quill-editor";
import saveState from "vue-save-state";
import mutations from '../store/mutations'

var moment = require('moment');

var toolbarOptions = [
  ["bold", "italic", "underline"],
  [
    "blockquote",
    {
      list: "ordered"
    },
    {
      list: "bullet"
    }
  ],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ script: "sub" }, { script: "super" }],
  ["link", "clean"]
];

export default {
  name: "weekly",
  data() {
    return {
      userInput: {
        isFile: true,
        weekNumber: 1,
        uploadSwitchText: "Click to Upload Image from Url"
      },
      days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      pEditable: false,
      tEditable: false,
      iEditable: true,
      outputCode: "",
      selected: { index: 0, list: this.$store.getters.getInfo.profs },
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    };
  },
  components: {
    quillEditor
  },
  mixins: [saveState, mutations],
  computed: {
    ...mapGetters(["getInfo", "dWeek", 'getWeeks']),
  },
  watch: {
    'info.weekOffset': function(){
      this.updateDays()
    }
  },
  methods: {
    ...mapMutations([
      'addWeek', 'sliceWeek', 'updateWeeks', 'updateInfo'
    ]),
    formatDate(date){
      if (!date) date = moment()
      return moment(date).format("dddd Do")
    },
    parseDate(index){
      if (!this.weeks[index]) return "N/A"
      return this.formatDate(this.weeks[index].date)
    },
    incrementDate(date, weeks, days){
      return moment(date).add(weeks, 'w').add(days, 'd').format("dddd Do")
    },
    updateDays(){
      console.log("updating days...")
      this.info.execWeekLength = this.info.weekDays.length
      if (this.info.weekOffset >= this.info.execWeekLength) this.updateProp('weekOffset', this.info.execWeekLength - 1)
      this.updateProp('weekDays', this.info.weekDays.sort(function(a, b){return a - b}))

      for (let week = 0; week < this.info.execWeeks; week++){
        for (let day = 0; day < this.info.weekDays.length; day++){
          let totalDays = this.info.weekDays.length * week + day - this.info.weekOffset
          let newDate = moment(this.info.startDate).add(week, 'w').add(this.info.weekDays[day], 'd')
          if(this.weeks[totalDays] && this.formatDate(this.weeks[totalDays].date) != this.formatDate(newDate)) {
            this.updateWeek(totalDays, 'date', moment(this.info.startDate).add(week, 'w').add(this.info.weekDays[day], 'd'))
            // console.log(this.formatDate(this.weeks[totalDays].date))
          }
        }
      }
    },
    newLine(val) {
      if (!val) return "";
      return val.replace(/\r?\n/g, "<br />");
    },
    updateSwitch() {
      this.userInput.isFile = !this.userInput.isFile;
      this.userInput.uploadSwitchText = this.userInput.isFile
        ? "Click to Upload Image from URL"
        : "Click to Upload Image from Computer";
    },
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
    
      this.addWeek(tempWeek)
    },
    // Adds a user inputted number of activities
    populateActivities(num){
      let diff = num - this.weeks.length

      if (diff > 0 ){
        for (let i = 0; i < diff; i++ ) this.AddActivity();
      }

      if (diff < 0) {
        this.userInput.weekNumber = 1;
        this.sliceWeek(num);
      }

      this.updateDays()

    },
    onFormSubmit(
      type,
      obj,
      id = type == "url" ? "#image-url" : "#image-file",
      ev
    ) {
      var formData = new FormData();

      if (type == "url") {
        console.log("uploading url...");
        var imageurl = document.querySelector(id); // Gets form data in html
        if (imageurl.value == "") return;
        formData.append("imageUrl", imageurl.value); // Adds api header to tell server that it is a url
      } else {
        console.log("uploading file...");
        var imagefile = document.querySelector(id);
        if (imagefile.files.length == 0) return;
        formData.append("image", imagefile.files[0]); // Adds api header to tell server that it is a file
      }

      // More api headers to tell the server the dimensions to crop
      formData.append("imageWidth", 200);
      formData.append("imageHeight", 200);

      // Send post request to Amazon server using vue-resource with form data
      this.$http
        .post(
          "http://ec2-34-229-16-148.compute-1.amazonaws.com:3000/image",
          formData
        )
        .then(
          response => {
            console.log("success");
            let imageData = JSON.parse(response.bodyText);
            obj.imgSrc = imageData.imageUrls[0]; // Change requisite weekly activity image src to the hosted file
          },
          response => {
            console.log(response);
          }
        );
    },
    updateDates(){
      this.weeks.forEach((week, index)=>{
        let interval = this.info.classType.dateType == "Week" ? 'w' : 'd'
        week.date = moment(this.info.startDate).add(index, interval)
      })
    },
    updateImages(){
      this.weeks.forEach((week, index)=>{
        if (index > 14 && this.info.classType.dateType == "Week") index = 14;
        week.imgSrc = this.$store.state.imageServer + this.info.classType.dateType.toLowerCase() + (index + 1) + '.png'
      })
    },
    setToDefault() {
      console.log('resetting data...')
      let dInfo = _.cloneDeep(this.$store.getters.dInfo)
      let props = ['execWeeks', 'weekDays', 'startDate', 'weekOffset', 'multipleSessions',
      'autoSessionTitle','useProfName','sessionOneTime','sessionTwoTime']

      props.forEach( (prop) => {
        this.updateProp(prop, dInfo[prop])
      })
    },
    getSaveStateConfig() {
      return {
        cacheKey: "Syllabus"
      };
    }
  },
  mounted() {
    this.updateCode();
    this.updateDays()
    //updateDates()
  },
  beforeCreate() {
    EventBus.$on("set-default", response => {
      this.setToDefault();
      console.log(response);
    });

    EventBus.$on("import-data", data => {
      this.userInput = { ...data.weekly.userInput };
      this.videos = data.weekly.videos;
      this.assignments = data.weekly.assignments;
      this.discussions = data.weekly.discussions;
      console.log("importing data to weekly...");
    });

    EventBus.$on("export-data", () => {
      // let weeklyList = {
      //   weeklyActivites: this.weeklyActivites
      // }
      // EventBus.$emit('list-data', weeklyList)

      let syllabus = this.$data;
      console.log("sending syllabus");
      EventBus.$emit("syllabus-data", syllabus);
    });

  },
  beforeUpdate() {
  }
};
</script>



<style scoped>
h1,
h2 {
  font-weight: normal;
}

textarea {
  width: auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.big-text {
  font-size: 1.2rem;
}

.box-card {
  width: 380px;
}

.card {
  margin: 10px;
}

.e-input {
  margin: 5px;
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

.edit-button {
  margin-right: 10px;
  margin-left: auto;
  float: right;
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 500px;
  margin: auto;
  align-self: flex-start;
  margin-top: 20px;
}

.teacher {
  width: 350px;
}

.code-input {
  margin: 10px;
}

.quill {
  width: 80%;
  margin-bottom: 50px;
  margin-right: 50px;
  margin-left: 50px;
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
  transition: all 0.5s ease;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

#copy-text-area {
  width: 80%;
  height: 200px;
}

.GFbanner {
  height: 190px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
