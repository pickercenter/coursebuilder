// Utility to help with undo/redo but never implemented


import _ from 'lodash'
function deepEquals(o1, o2) { return JSON.stringify(o1) === JSON.stringify(o2) }

export default {
	data() {
    return {
      info: _.cloneDeep(this.$store.getters.getInfo),
    }
  },
  computed: {
    getInfo() {
      return this.$store.getters.getInfo;
    }
  },
  watch: {
    getInfo: {
    	deep: true,
    	handler(newInfo) {
        if (!_.isEqual(newInfo, this.info)) { // condition to prevent infinite loops
    			this.info = _.cloneDeep(newInfo);
          console.log('...handling state change')
        }
    	}
    },
  	info: {
    	deep: true,
    	handler(newInfo) {
        console.log('handling new info')
    		this.$store.commit('updateInfo', _.cloneDeep(newInfo))
    	}
    }
	}
}
