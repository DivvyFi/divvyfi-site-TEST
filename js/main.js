// ----------- PROPERTIES CAROUSEL -----------
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

properties.forEach((prop) => {
  const card = document.createElement('div');
  card.className = "min-w-[250px] sm:min-w-[300px] bg-gray-800 rounded-lg shadow hover:shadow-lg cursor-pointer snap-start flex-shrink-0";
  card.innerHTML = `
    <img src="${prop.image}" alt="${prop.title}" class="rounded-t-lg w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="font-bold text-lg">${prop.title}</h3>
      <p class="text-gray-400">${prop.price} | Yield: ${prop.yield}</p>
    </div>
  `;
  card.addEventListener('click', () => openModal(prop));
  carousel.appendChild(card);
});

// Scroll by card width when clicking arrows
function scrollCarousel(direction) {
  const cardWidth = carousel.querySelector('div').offsetWidth + 16; // 16px gap
  carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

prevBtn.addEventListener('click', () => scrollCarousel(-1));
nextBtn.addEventListener('click', () => scrollCarousel(1));

// ----------- MOBILE SWIPE SUPPORT -----------
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  carousel.classList.add('cursor-grabbing');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener('mouseleave', () => {
  isDown = false;
  carousel.classList.remove('cursor-grabbing');
});
carousel.addEventListener('mouseup', () => {
  isDown = false;
  carousel.classList.remove('cursor-grabbing');
});
carousel.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1; // scroll-fast multiplier
  carousel.scrollLeft = scrollLeft - walk;
});

// Touch support
carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1;
  carousel.scrollLeft = scrollLeft - walk;
});
