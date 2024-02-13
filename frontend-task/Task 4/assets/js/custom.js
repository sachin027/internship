document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector('.navbar-toggler');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
  
    toggleButton.addEventListener('click', function() {
      sidebarLinks.forEach(function(link) {
        link.classList.toggle('text-hide');
      });
    });
  });  