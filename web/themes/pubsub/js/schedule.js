/**
 * @file
 * Adds schedule interactivity - adds a "Jump to current time slot" button at
 * the top of the schedule page.
 */
((Drupal) => {
  function init() {
    // const confDate = document.querySelector('.schedule-tabs__item--active-trail').dataset.unixtime;

    const currentTime = new Date();
    const timeSlotsElements = document.querySelectorAll('.view-session-schedule__title');
    const timeSlots = [];

+    timeSlotsElements.forEach(el => {
      // Split the time slot's text into two text strings. This
      // assumes a string such as "11:00 am to 11:45 am".
      const timeTextStrings = el.textContent.split(' to ');

      // Take the second (ending) time slot text string and send it to be parsed
      // to return an actual Date object.
      const timeSlot = parseTime(timeTextStrings[1]);
      timeSlots.push({el, timeSlot});
    });

    // Filter out time slots that are in the past.
    const upcomingTimeSlots = timeSlots.filter(obj => obj.timeSlot > currentTime);

    // If there are upcoming time slots, add a <button>
    if (upcomingTimeSlots.length) {
      const jumpButton = document.createElement('div')
      const activeTimeSlotId = upcomingTimeSlots[0].el.getAttribute('id');

      jumpButton.classList.add('schedule-jump');
      jumpButton.innerHTML = `
          <a href="#${activeTimeSlotId}" class="schedule-jump__link">Jump to current time slot</a>
        `;
      document.querySelector('.region--content').prepend(jumpButton);
    }
  }

  /**
   * Reads in a string and will parse and create a date object from any time values.
   * @see https://stackoverflow.com/a/2188651
   * @param {string} timeString - string to parse
   * @returns {object} Date object
   */
  function parseTime(timeString) {
    if (timeString == '') return null;

    var time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
    if (time == null) return null;

    var hours = parseInt(time[1], 10);
    if (hours == 12 && !time[4]) {
      hours = 0;
    }
    else {
      hours += (hours < 12 && time[4]) ? 12 : 0;
    }
    var d = new Date();
    d.setHours(hours);
    d.setMinutes(parseInt(time[3], 10) || 0);
    d.setSeconds(0, 0);
    return d;
  }

  Drupal.behaviors.schedule = {
    attach(context) {
      once('schedule', 'body', context).forEach(init);
    },
  };
}) (Drupal);
