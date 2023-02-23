document.addEventListener('DOMContentLoaded', function() {
  const userInfo = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-btn');
  const url = 'http://127.0.0.1:5000/logout';
  userInfo.addEventListener('click', () => {
    // Toggle the visibility of the logout button
    if (logoutBtn.style.display === 'none') {
      console.log(logoutBtn.style.display)
      logoutBtn.style.display = 'block';
      console.log(logoutBtn.style.display)
    } else {
      logoutBtn.style.display = 'none';
    }
  });
  logoutBtn.addEventListener('click', () => {
    window.location.replace(url);
  }) 
  document.getElementById('logout-btn2').addEventListener('click', () => {
    window.location.replace(url);
  }) 
});