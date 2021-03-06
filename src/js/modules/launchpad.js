var $   = require('jquery');
var api = require('../lib/tower_api');
var tpl = require('../lib/template');
var log = require('../lib/log');

function setupLaunchpad() {
  var hiddenTeams = api.hiddenTeams();

  $('.tp-launchpad').remove();

  var $launchpad = $(tpl.launchpad).prependTo('body');
  $launchpad.append(tpl.loading);

  api.teams(function(teams) {
    var $teams = $(tpl.teams).appendTo($launchpad);

    teams.each(function(team) {
      if (!api.isTeamHidden(team.id)) {
        $(tpl.team.assign(team)).appendTo($teams);
      }
    });

    $('.tp-teams').removeClass('tp-hide');
    $('.tp-launchpad .tp-loading').remove();
  });
}

function loadProjects($team) {
  api.projects($team.data('id'), function(projects) {
    var html = projects.map(function(project) {
      if (api.isProjectHidden(project.id)) {
        return '';
      } else {
        return tpl.project.assign(project);
      }
    }).join('');

    $team.find('.tp-projects').html(html);
  });
}

function initialize() {
  if (!api.moduleEnabled('launchpad')) return;
  setupLaunchpad();

  $(document).on('mouseenter', '.tp-team', function() {
    $('.tp-team.active').removeClass('active');
    $(this).addClass('active');
    loadProjects($(this));
  });

  $(document).on('mouseleave', '.tp-team', function(event) {
    $(this).removeClass('active');
  });

  $(document).on('click', '.tp-btn-refresh', function(event) {
    api.cache.clear('project');
    api.cache.clear('team');
    setupLaunchpad();
  });
}

module.exports = initialize;