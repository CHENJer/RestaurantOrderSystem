import Vue from 'vue'
import moment from 'moment'

Vue.filter('allTime', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
})

Vue.filter('shortTime', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD';
  return moment(value).format(formatString);
})
