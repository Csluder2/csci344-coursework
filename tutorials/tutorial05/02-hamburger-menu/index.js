// Your code here.
function toggleMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
}
