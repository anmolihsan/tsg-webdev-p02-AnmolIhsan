
const nav = document.getElementById('mainNav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section, header#home')];
const toggler = document.querySelector('.navbar-toggler');
const navMenu = document.getElementById('navMenu');


window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}, { passive: true });


if (toggler) {
  toggler.addEventListener('click', () => {
    const open = navMenu.classList.toggle('show');
    toggler.setAttribute('aria-expanded', open);
  });
}
navLinks.forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('show');
  toggler?.setAttribute('aria-expanded', 'false');
}));

const testimonials = [
  { quote: 'I walked in nervous and left with a plan. Six months later, training is the best part of my week.', name: 'Ayesha Khan', role: 'Forge member', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
  { quote: 'The coaches actually listen. I finally understand what I am doing instead of just copying exercises.', name: 'Hamza Ali', role: 'Elite member', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
  { quote: 'The community keeps me accountable without making training feel competitive or intimidating.', name: 'Sara Ahmed', role: 'Forge member', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80' }
];
let slide = 0;
const track = document.getElementById('testimonialTrack');
const dots = document.getElementById('sliderDots');
function renderSlider() {
  const item = testimonials[slide];
  track.innerHTML = `<article class="testimonial"><div class="quote">“${item.quote}”</div><div class="person"><img class="avatar" src="${item.img}" alt="${item.name}" loading="lazy"><div><strong>${item.name}</strong><small>${item.role}</small></div></div></article>`;
  dots.innerHTML = testimonials.map((_, i) => `<button class="dot ${i === slide ? 'active' : ''}" aria-label="Show testimonial ${i + 1}"></button>`).join('');
  dots.querySelectorAll('.dot').forEach((dot, i) => dot.addEventListener('click', () => { slide = i; renderSlider(); }));
}
document.querySelector('.prev').addEventListener('click', () => { slide = (slide - 1 + testimonials.length) % testimonials.length; renderSlider(); });
document.querySelector('.next').addEventListener('click', () => { slide = (slide + 1) % testimonials.length; renderSlider(); });
renderSlider();

// FAQ accordion
const questions = document.querySelectorAll('.faq-question');
questions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isOpen = question.getAttribute('aria-expanded') === 'true';
    questions.forEach(q => {
      q.setAttribute('aria-expanded', 'false');
      q.nextElementSibling.style.maxHeight = null;
    });
    if (!isOpen) {
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const message = document.getElementById('formMessage');
  message.textContent = 'Thanks! Your message has been received. We will contact you soon.';
  message.style.color = '#587400';
  event.target.reset();
});