<template lang="html">

  <div id="weeklylist">

  <hr>

  <div class="code-container">

    <div class="textbox-container">
      <el-card class="card">
          <el-button type="primary" @click="addProf">Add Professor</el-button>
          <el-button type="primary" @click="addTA">Add TA</el-button>
          <el-button type="danger" @click="clearProfs">Clear</el-button>
      </el-card>

      <el-card class="card box-card" v-if="selected.list">
        <div slot="header" class="clearfix">
          <span class="big-text">Edit Info</span>

          <el-select v-model="selected" placeholder="Select" value-key="key" style="width: 180px; margin-left: 10px">
            <el-option-group
              key="profs"
              label="Professors">
              <el-option
                v-for="(prof, index) in info.profs"
                :key="prof.name"
                :label="prof.name"
                :value="{index, list: 'profs', key: prof.name}">
              </el-option>
            </el-option-group>
            <el-option-group
              v-if="info.tas.length > 0"
              key="tas"
              label="TAs">
              <el-option
                v-for="(ta, index) in info.tas"
                :key="ta.name"
                :label="ta.name"
                :value="{index, list: 'tas', key: ta.name}">
              </el-option>
            </el-option-group>
          </el-select>

          <el-button style="float: right; padding: 3px 0" type="text"@click="iEditable = !iEditable"> {{ iEditable ? "Save" : "Edit" }}</el-button>

        </div>
        <el-button style="float: right; margin-bottom: 10px;" type="danger" size="medium" @click="removeProf">Remove</el-button>

        <div v-show="iEditable" v-if="selected.list.length > 0" class="center">
          <el-input style="width: 200px; float:left" class="e-input" v-model="info[selected.list][selected.index].name" @input="updateUser(info[selected.list][selected.index],'name', $event)"> </el-input>

          <el-input class="e-input" v-if="selected.list" v-model="info[selected.list][selected.index].email" @input="updateUser(info[selected.list][selected.index],'email', $event)"> </el-input>
          <el-input class="e-input" v-if="selected.list" type="textarea" autosize v-model="info[selected.list][selected.index].office" @input="updateUser(info[selected.list][selected.index],'office', $event)"> </el-input>
          <button type="button" name="button" class="uk-button-small uk-button-primary" @click="updateSwitch">{{userInput.uploadSwitchText}}</button> <br> <br>

          <!-- These forms upload the file or url to Amazon S3. More detail in the onFormSubmit method. -->
          <form name="file-form" v-show="this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('image', info[selected.list][selected.index])">
            <input name="image" id="image-file" type="file"> <br>
            <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
          </form>
          <form v-show="!this.userInput.isFile" v-if="selected.list" class="your-form-class" v-on:submit.prevent="onFormSubmit('url', info[selected.list][selected.index])">
            <input name="imageUrl" id="image-url" type="text" class="uk-input"> <br> <br>
            <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
          </form>
        </div>
      </el-card>

      <el-card class="card box-card">
        <div slot="header" class="clearfix">
          <span class="big-text">Edit Schedule Items</span>
        </div>
        <div class="code-input center">
          Edit {{info.classType.dateType}}: <el-input-number  style="margin: px;" v-model="userInput.weekNumber" :min="1" :max="weeks.length"
            controls-position="right" size="small" :label="'Edit ' + info.classType.dateType"></el-input-number>
        </div>

        <select v-model="userInput.weekNumber" class="uk-select">
          <option v-for="n in weeks.length" :value="n">{{info.classType.dateType}} {{n}}</option>
        </select>
        <div >
          <div class="code-input center uk-margin-small-top" v-if="weeks[userInput.weekNumber - 1]">
            <label for="text-area">Title</label> <br>
            <el-input type="textarea" autosize v-model="weeks[userInput.weekNumber - 1].title" @input="updateWeek(userInput.weekNumber - 1,'title', $event)"> </el-input>
          </div>
        </div>

        <div class="center" v-if="weeks[userInput.weekNumber - 1]">
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
      </el-card>

      <el-card class="card box-card" v-if="selected.list">
        <div slot="header" class="clearfix">
          <span class="big-text">Sections / Options</span>
        </div>

        <div class="center">
          <strong>Syllabus Components:</strong>
          <el-checkbox-group v-model="info.sectionBox1" @input="updateProp('sectionBox1', $event)">
            <el-checkbox v-for="section in sections" :label="section" :key="section" border>{{section}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="info.sectionBox2" @input="updateProp('sectionBox2', $event)">
            <el-checkbox v-for="section in sections2" :label="section" :key="section">{{section}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <br>
        <div class="">
          Dates
          <el-switch
            v-model="info.useDates"
            @input="updateProp('useDates', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>

      </el-card>



    </div>

    <!-- Where the canvas code is stored -->
    <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]">
        <p>{{info.title.toUpperCase()}}</p>
      </div>

      <!-- Professors & TAs -->
      <div class="content-box">
        <div class="grid-row">

          <!-- Professor Info Box -->
          <div class="col-xs-6 col-md-6" v-for="prof in info.profs">
            <div class="styleguide-section__grid-demo-element pad-box-mini border border-tl">

              <!-- must have weeklyIconImg class for responsiveness -->
              <!-- landscape images work best. 350x200 seems ideal -->
              <div class="STV1_BlueBG">
                <img :src="prof.imgSrc" class="STV1_SyllabusPhoto" />
              </div>

              <p>Instructor:</p>
              <p>{{prof.name}} (<a :href="'mailto:'+prof.email">{{prof.email}}</a>) <br /> Office Hours: <span v-html="newLine(prof.office)"></span></p>
            </div>
          </div>
          <!-- End Professor Info Box -->

          <!-- Professor Info Box -->
          <div class="col-xs-6 col-md-6" v-for="ta in info.tas">
            <div class="styleguide-section__grid-demo-element pad-box-mini border border-tl">

              <!-- must have weeklyIconImg class for responsiveness -->
              <!-- landscape images work best. 350x200 seems ideal -->
              <div class="STV1_BlueBG">
                <img :src="ta.imgSrc" class="STV1_SyllabusPhoto" />
              </div>

              <p>Teaching Assistant:</p>
              <p>{{ta.name}} (<a :href="'mailto:'+ta.email">{{ta.email}}</a>) <br /> Office Hours: <span v-html="newLine(ta.office)"></span></p>
            </div>
          </div>
          <!-- End Professor Info Box -->

        </div>
      </div>
      <!-- End Professors & TAs -->

      <!-- Meeting Dates & Times -->
      <div class="content-box pad-box-mini border border-t border-b">
        <p>Meeting Dates/Times: Tuesday 9:00-10:50 am (IAB Room 411)</p>
        <p>Special Discussion Forums: Thursday 9:00-10:50 am (IAB Room 411)</p>
      </div>
      <!-- End Meeting Dates & Times -->

      <!-- Course Description -->
      <div v-if="info.sectionBox1.includes('Description')" class="content-box pad-box-mini border border-b">
        <h2>Course Description</h2>
        <div v-html="info.description"></div>
      </div>
      <!-- End Course Description -->

      <!-- Course Objectives -->
      <div v-if="info.sectionBox1.includes('Objectives')" class="content-box pad-box-mini border border-b">
        <h2>Course Objectives</h2>
        <p>Use this space here for course objectives.</p>
      </div>
      <!-- End Course Objectives -->

      <!-- Instruction Method -->
      <!-- <div class="content-box pad-box-mini border border-b">
        <h2>Method of Instruction</h2>
        <p>The course will achieve its learning objectives by deploying a combination of lectures, cases, readings,
          videos, role plays, debates, and discussions with experienced field and policy practitioners.</p>
      </div> -->
      <!-- End Instruction Method -->

      <!-- Weekly Schedule table -->
      <span v-if="info.sectionBox1.includes('Schedule')">
        <div class="content-box pad-box-mini border border-b">
          <h2>Weekly Schedule</h2>
        </div>

        <table class="ic-Table ic-Table--hover-row">
          <thead>
            <tr>

              <!-- Column Labels -->
              <!-- If you add a label here for an additional column, that column must be added to all rows as well -->
              <th>Week</th>
              <th v-if="info.useDates">Date</th>
              <th>Topic</th>
            </tr>
          </thead>
          <tbody>

             <tr v-for="(week, index) in weeks">
              <td>{{index + 1}}</td>
              <td v-if="info.useDates" >{{formatDate(week.date)}}</td>
              <td>{{week.title}}</td>
            </tr>
          </tbody>

        </table>
      </span>


      <!-- Grading -->
      <div v-if="info.sectionBox2.includes('Grading')" class="content-box pad-box-mini border border-b">
        <h2>Grading</h2>
        <p>Students will be graded through a Mid-term Exam (20%), two research/policy papers, together comprising 60% of the grade, and Class Participation (20%):</p>
        <ul>
          <li>Quiz on Weeks 1 to 6 lectures and readings, worth 20% of grade (Thursday March 2)</li>
          <li>Assignment 1, worth 20% of grade (1,250 words, due at 11:59 pm Sunday March 12)</li>
          <li>Assignment 2, worth 40% of grade (2,500 words, due at 11:59 pm Sunday May 7)</li>
        </ul>
      </div>
      <!-- End Grading -->

      <!-- Additional Resources -->
      <div v-if="info.sectionBox2.includes('Resources')" class="content-box pad-box-mini border border-b">
        <h2>Additional Resources</h2>
        <p>Beyond the weekly required and supplementary readings and viewings, the following resources are recommended if you are seeking to gain a superior level of understanding of the subject matter of this course. If you come across other interesting and useful
          resources relevant to the course objectives, please share these with the class through your blog posts.</p>
      </div>
      <div v-if="info.sectionBox2.includes('Integrity')" class="content-box pad-box-mini border border-b">
        <h2>Academic Integrity Statement</h2>
        <p>The School of International &amp; Public Affairs does not tolerate cheating and/or plagiarism in any form. Those students who violate the Code of Academic &amp; Professional Conduct will be subject to the Dean&rsquo;s Disciplinary Procedures. Cut and
          paste the following link into your browser to view the Code of Academic &amp; Professional Conduct online. <a href="http://bulletin.columbia.edu/sipa/academic-policies">http://bulletin.columbia.edu/sipa/academic-policies</a></p>
        <p><strong>Please note that, per the SIPA Code of Conduct, &ldquo;plagiarism includes but is not limited to:</strong></p>
        <ul>
          <li><strong>Submitting written work of any kind (e.g., reports, essays, exercises, papers), or portions of such written work that is not my own, but rather the written work of another author;</strong></li>
          <li><strong>Failing to acknowledge, through proper footnotes and bibliographic entries, the source of ideas not my own;</strong></li>
          <li><strong>Failing to indicate through proper use of quotations and footnotes whenever my work includes paraphrases of ideas or verbatim expressions not my own;</strong></li>
          <li><strong>Submitting written work prepared for one course to meet the requirements of a second course without having received in writing prior permission from both instructors;</strong></li>
          <li><strong>Collaborating with other students or outside sources on an assignment or examination without specific permission from the faculty member to do so;</strong></li>
          <li><strong>Using another person&rsquo;s or institution&rsquo;s research or data without attribution.&rdquo;</strong></li>
        </ul>
        <p>Please familiarize yourself with the proper methods of citation and attribution. The School provides some useful resources online; we strongly encourage you to familiarize yourself with these various styles before conducting your research:</p>
        <p>Violations of the Code of Academic &amp; Professional Conduct should be reported to the Associate Dean for Student Affairs.</p>
      </div>
      <!-- End Additional Resources -->

      <div class="clear">&nbsp;</div>


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
  name: "Syllabus",
  data() {
    return {
      userInput: {
        isFile: true,
        uploadSwitchText: "Click to Upload Image from Url"
      },
      sections: ['Description', 'Objectives', 'Schedule'],
      sections2: ['Grading', 'Resources', 'Integrity'],
      pEditable: false,
      tEditable: false,
      iEditable: true,
      outputCode: "",
      selected: { index: 0, list: 'profs' },
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
  watch: {
    // Protects against selected.list becoming an object (need to track down why this happens)
    selected: function(){
      if (typeof this.selected.list !== 'string'){
        this.selected.list = 'profs'
      }
    }
  },
  computed: {
    ...mapGetters(["getInfo", "dProf", "dTA", 'getWeeks']),

  },
  methods: {
    formatDate(date){
      return moment(date).format("MMMM Do")
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
    addProf() {
      let tempProf = _.cloneDeep(this.dProf)
      this.info.profs.push(tempProf);
      this.selected = { index: this.info.profs.length - 1, list: 'profs' }

    },
    addTA() {
      let tempTA = _.cloneDeep(this.dTA)
      this.info.tas.push(tempTA);
      this.selected = { index: this.info.tas.length - 1, list: 'tas' }

    },
    removeProf() {
      let { list, index } = this.selected;
      console.log(list);
      let users = _.cloneDeep(this.info[list])
      users.splice(index, 1);
      if (index == 0){
        if (list == 'profs'){
          console.log('tried to delete prof')
          return
          console.log('after return')
        }
        console.log('deleting last ta')
        this.selected = { index: 0, list: 'profs' }
      }
      else {
        this.selected = { index: index - 1, list }
      }
      this.updateProp(list, users)
    },
    clearProfs() {
      this.info.profs = [this.dProf];
      this.info.tas = [this.dTA];
    },
    setToDefault() {
      console.log('resetting data...')
      let dInfo = _.cloneDeep(this.$store.getters.dInfo)
      let props = ['profs','tas','sectionBox1', 'sectionBox2']

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
