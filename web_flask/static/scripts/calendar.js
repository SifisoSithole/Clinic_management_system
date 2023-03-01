const url = "http://127.0.0.1:5000"

function getRandomColor() {
  // Generate a random RGB color value
  const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  return color;
}

document.addEventListener('DOMContentLoaded', function() {
  let position = document.cookie.split('; ').find(row => row.startsWith('position=')).split('=')[1];
  let id = document.cookie.split('; ').find(row => row.startsWith('user_id=')).split('=')[1];
  const Calendar = tui.Calendar;
  const container = document.getElementById('calendar');
  const options = {
  defaultView: 'month',
  defaultDate: new Date(),
  isReadOnly: true,
  views: ['month', 'week', 'day'],
  useDetailPopup: true,
  week: {
    taskView: false,
  }, 
  month: {
    isAlways6Weeks: false,
  },
  timezone: {
    zones: [
      {
        timezoneName: 'Africa/Johannesburg',
        displayLabel: 'South Africa',
      }
    ],
  },
  calendars: [
    {
      id: '1',
      name: 'modern_systems',
      backgroundColor: '#03bd9e',
    }
  ],
  };
  const calendar = new Calendar(container, options);
  let months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };

  let current_date = calendar.getDate()
  let date = months[current_date.getMonth() + 1] + " " + current_date.getFullYear();

  document.getElementById('month-year').innerHTML = date;
  document.getElementById('prev-button').addEventListener('click', function() {
    let view = calendar.getViewName();
    if (view === 'month') {
      const current = calendar.getDate();
      const next = new Date(current.getFullYear(), current.getMonth() - 1, 1);
      calendar.setDate(next); 
    } else if (view === 'week'){
      const currentDate = calendar.getDate();
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7); 
      calendar.setDate(newDate); 
    } else if (view === 'day') {
      const current = calendar.getDate(); 
      const next = new Date(current.getTime() - 24 * 60 * 60 * 1000);
      calendar.setDate(next);
    }
    let date = calendar.getDate();
    date = months[date.getMonth() + 1] + " " + date.getFullYear();
    document.getElementById('month-year').innerHTML = date;
  });

  document.getElementById('next-button').addEventListener('click', function() {
    let view = calendar.getViewName();
    if (view === 'month') {
      const current = calendar.getDate();
      const next = new Date(current.getFullYear(), current.getMonth() + 1, 1);
      calendar.setDate(next); 
    } else if (view === 'week'){
      const currentDate = calendar.getDate(); // get the current date
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7); // set the new date to one week after the current date
      calendar.setDate(newDate); 
    } else if (view === 'day') {
      const current = calendar.getDate(); 
      const next = new Date(current.getTime() + 24 * 60 * 60 * 1000);
      calendar.setDate(next);
    }
    let date = calendar.getDate();
    date = months[date.getMonth() + 1] + " " + date.getFullYear();
    document.getElementById('month-year').innerHTML = date;
  });

  document.getElementById('month-button').addEventListener('click', function() {
    calendar.changeView('month');
    document.getElementById('day-button').classList.remove('active');
    document.getElementById('month-button').classList.add('active');
    document.getElementById('week-button').classList.remove('active');
  });

  document.getElementById('week-button').addEventListener('click', function() {
    calendar.changeView('week');
    document.getElementById('day-button').classList.remove('active');
    document.getElementById('month-button').classList.remove('active');
    document.getElementById('week-button').classList.add('active');
  });

  document.getElementById('day-button').addEventListener('click', function() {
    calendar.changeView('day');
    document.getElementById('day-button').classList.add('active');
    document.getElementById('month-button').classList.remove('active');
    document.getElementById('week-button').classList.remove('active');
  });

  let search;
  if (position === 'Admin' || position === 'Receptionist') {
    search = url + '/events';
  } else {
    search = url + '/search/Appointments/' + id;
  }
  $.get(search, (data, status) => {
    if (status !== 'success'){
      data = [{}];
    }
    let events = [];
    let event_id = 0;
    data.forEach((event) => {
      let start_date = event.date + ' ' + event.start_time + ':00';
      start_date = moment(start_date, 'DD-MM-YYYY HH:mm:ss').toDate();
      let end_date = event.date + ' ' + event.end_time + ':00';
      end_date = moment(end_date, 'DD-MM-YYYY HH:mm:ss').toDate();
      events.push({
        id: event.id,
        calendarId: '1',
        title: 'Consult',
        body: 'Appointment with ' + event.doctor + ' for ' + event.first_name + ' ' + event.last_name,
        start: start_date,
        end: end_date,
      });
      event_id++;   
    });
    calendar.createEvents(events);
  });
});
