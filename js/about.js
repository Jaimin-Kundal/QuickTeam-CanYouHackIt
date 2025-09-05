// Sticky header shadow effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = '0 1px 22px 0 rgba(70,70,88,0.09)';
  }
});
