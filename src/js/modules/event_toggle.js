var $ = require('jquery');
var log = require('../lib/log');
var tpl = require('../lib/template');
var api = require('../lib/tower_api');

function headEvents() {
  return $('.comments.streams .event').filter(function() {
    return !$(this).prev().is('.event');
  });
}

function setupToggle() {
  $(this).before(tpl.eventToggle);
}

function toggleEvents() {
  var $toggle = $(this);
  var active = $toggle.is('.active');

  $toggle.toggleClass('active', !active);
  $toggle.find('i').toggleClass('twr-angle-up', !active)
                   .toggleClass('twr-angle-down', active);
  $toggle.find('span').text(active ? '显示' : '隐藏');

  var $nextEvent = $toggle.next();
  while ($nextEvent.is('.event')) {
    if (active) {
      $nextEvent.slideUp('fast');
    } else {
      $nextEvent.slideDown('fast');
    }

    $nextEvent = $nextEvent.next();
  }
}

function initialize() {
  if (!api.moduleEnabled('event_toggle')) return;

  $('.event').hide();

  var $headEvents = headEvents();
  $headEvents.each(setupToggle);

  $(document).off('click', '.tp-fold-event', toggleEvents);
  $(document).on('click', '.tp-fold-event', toggleEvents);
}

module.exports = initialize;