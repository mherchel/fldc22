/**
 * @file
 * Adds schedule interactivity - adds a "Jump to current time slot" button at
 * the top of the schedule page.
 */
((Drupal, once) => {
  /**
   * Is today the day of the active tab's schedule?
   *
   * @returns {boolean}
   */
  function todayIsTheDay() {
    // Get the date string from the active schedule tab's data attribute.
    const dateOfActiveScheduleTab = document.querySelector('.schedule-tabs__item--active-trail').dataset.date;

    // Doesn't work always unless we manually specify the timezone.
    const dateStringWithTimeZone = dateOfActiveScheduleTab + ' 00:00:00 EST';

    // Generate date objects to which we can compare.
    const campDate = new Date(dateStringWithTimeZone);
    const todaysDate = new Date();

    return campDate.getDate() === todaysDate.getDate() && campDate.getMonth() === todaysDate.getMonth();
  }

  /**
   * Parses string and creates a date object.
   *
   * @param {string} timeString - string to parse
   * @returns {object} Date object
   *
   * @see https://stackoverflow.com/a/2188651
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

  /**
   * Initialize everything.
   */
  function init() {
    const timeSlotsElements = document.querySelectorAll('.view-session-schedule__title');
    const timeSlots = Array.from(timeSlotsElements).map(el => {
      const timeTextStrings = el.textContent.split(' to ');
      const timeSlot = parseTime(timeTextStrings[1]); // We only care about the second time slot string.
      return { el, timeSlot };
    });

    // Filters out time slots that are in the past.
    const upcomingTimeSlots = timeSlots.filter(obj => obj.timeSlot > new Date());

    if (todayIsTheDay() && upcomingTimeSlots.length) {
      const jumpLink = document.createElement('div')
      const activeTimeSlotId = upcomingTimeSlots[0].el.getAttribute('id');

      jumpLink.classList.add('schedule-jump');
      jumpLink.innerHTML = `
          <a href="#${activeTimeSlotId}" class="schedule-jump__link">
            Jump to current time
          </a>
        `;
      document.querySelector('.region--content').prepend(jumpLink);
    }
  }

  Drupal.behaviors.schedule = {
    attach(context) {
      once('schedule', 'body', context).forEach(init);
    },
  };
}) (Drupal, once);
