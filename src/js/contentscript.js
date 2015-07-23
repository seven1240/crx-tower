var $   = require('jquery');

var launchpad    = require('./modules/launchpad');
var eventToggle  = require('./modules/event_toggle');
var hideTeams    = require('./modules/hide_teams');
var hideProjects = require('./modules/hide_projects');

$(document).ready(function() {
  launchpad();
  eventToggle();
  hideTeams();
  hideProjects();
});