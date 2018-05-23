<template>
  <div class="hello">
    <div class="uk-child-width-1-1@s uk-light" uk-grid>
        <div>
            <div class="uk-background-cover uk-height-large uk-panel uk-text-center" style="background-image: url(static/images/cover01.jpg);">
               <div class="uk-overlay uk-overlay-primary uk-height-large">
                  <h1 class="uk-heading uk-margin-medium-top">Guide</h1>
                  <hr style="width: 70%; margin-left: auto; margin-right: auto;">
                  <p class="uk-margin-auto-left uk-margin-auto-right">This website is designed to allow Professors and TA’s to quickly build beautiful and functional class websites on Columbia’s new Canvas/Courseworks platform.</p>
                  <p class="uk-margin-auto-left uk-margin-auto-right">This website provides a standard template for a 12 week course.</p>
                  <p class="uk-margin-auto-left uk-margin-auto-right">To build your course, watch the short training video, download the guide below, and click <strong> Get Started</strong></p>
                  <hr style="width: 70%; margin-left: auto; margin-right: auto;">
                  <div class="uk-margin-medium-bottom uk-margin-auto-left uk-margin-auto-right">
                    <a href="./static/files/CanvasCourseBuilderGuide.pdf" download><el-button type="primary" style="display: inline-block; margin-right: 20px;"><i class="fas fa-download"></i> Download the Guide</el-button></a>
                    <el-button type="primary" style="display: inline-block; margin-right: 20px;" uk-toggle="target: #modal-media-video"><i class="fas fa-video"></i> Watch the Demo Video</el-button>
                    <a href="./static/files/weekly-template.imscc" download><el-button type="success" style="display: inline-block; margin-right: 20px;"><i class="fas fa-download"></i> Weekly Course</el-button></a>
                    <a href="./static/files/executive-template.imscc" download><el-button type="success" style="display: inline-block;"><i class="fas fa-download"></i> Executive Training</el-button></a>
                  </div>
                  <div class="uk-margin-medium-bottom uk-margin-auto-left uk-margin-auto-right">
                    <el-button type="primary" size="large" style="display: inline-block; margin-right: 20px;" @click="dialogFormVisible = true">Get Started</el-button>
                  </div>
               </div>
            </div>
        </div>
    </div>

    <div id="modal-media-video" uk-modal>
    <div class="uk-modal-dialog uk-width-xlarge uk-margin-auto-vertical">
        <button class="uk-modal-close-outside" type="button" uk-close></button>
        <video controls uk-video>
            <source src="./static/files/SilentCourseBuilderDemo.mp4?test1" type="video/mp4">
        </video>
    </div>
  </div>

    <div class="clearfix"></div>

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left" uk-grid>
        <div class="uk-background-muted uk-padding uk-margin-xlarge-top">
    		<p>Copyright © Columbia University. All rights reserved.</p>
       	</div>
    </div>

    <el-dialog  title="Course Info" :visible.sync="dialogFormVisible" style="width: 80%; margin:auto;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="Course Title" prop="title">
          <el-input autosize style="width: 80%" placeholder="Please input your Course Title" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Course URL" prop="url">
          <el-input autosize style="width: 80%" placeholder="Please input your Course URL" v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="School" prop="theme">
          <select style="display: inline-block; width:150px" v-model="ruleForm.theme" name="Choose Banner" class="uk-select">
            <option v-for="theme in $store.getters.getThemeOptions" :value="theme">{{theme.option}}</option>
          </select>
        </el-form-item>
        <el-form-item label="Course Type" prop="classType">
          <select style="display: inline-block; width:150px" v-model="ruleForm.classType" name="Choose Banner" class="uk-select">
            <option v-for="type in info.classOptions" :value="type">{{type.option}}</option>
          </select>
        </el-form-item>
        <el-form-item label="Online Class" prop="isBlended">
          <el-switch
            v-model="ruleForm.isBlended"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmForm">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { EventBus } from '../bus'
import saveState from 'vue-save-state';
import mutations from '../store/mutations'

export default {
  name: 'Home',
  data () {
    return {
      dialogFormVisible: false,
      ruleForm: {
        title: this.$store.getters.getInfo.title,
        url: this.$store.getters.getInfo.urlArgs,
        classType: this.$store.getters.getInfo.classType,
        isBlended: this.$store.getters.getInfo.isBlended,
        theme: this.$store.getters.getTheme,
      },
      rules: {
        title: [
          { required: true, message: 'Course Title is required', trigger: 'blur' },
          { min: 0, max: 35, message: 'Length should be less than 35 characters', trigger: 'blur' }
        ],
        url: [
          { required: true, message: 'Course URL is required', trigger: 'blur' },
          { type: "url" , message: 'Must be a valid URL', trigger: 'blur' }
        ],

      }
    }
  },
  mixins: [saveState, mutations],
  computed: {
  },
  methods: {
    getStarted(){
      this.$router.push({path: '/home'});
    },
    getStartedModal(){
      this.dialogFormVisible = false
      this.$router.push({path: '/home'});
    },
    confirmForm(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.updateProp('title', this.ruleForm.title)
          this.updateProp('url', this.ruleForm.url)
          this.updateProp('classType', this.ruleForm.classType)
          this.updateProp('isBlended', this.ruleForm.isBlended)
          this.theme = this.ruleForm.theme
          this.dialogFormVisible = false

          this.$router.push({path: '/home'});
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    getSaveStateConfig() {
      return {
          'cacheKey': 'Guide',
      };
    }
  },
  mounted () {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
