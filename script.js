// Select hamburger and nav links
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Toggle active class on click
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Select all sections
const sections = document.querySelectorAll("section");

// Intersection Observer for fade-in
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // stop observing once visible
      }
    });
  },
  { threshold: 0.1 } // 10% visible
);

// Observe each section
sections.forEach((section) => {
  observer.observe(section);
});

const skillBars = document.querySelectorAll(".skill-bar");

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.querySelector(".skill-percent");
        const skillValue = parseInt(bar.getAttribute("data-skill"));
        let count = 0;

        // Animate the bar width
        bar.style.width = bar.getAttribute("data-skill");

        // Animate the percentage number
        const interval = setInterval(() => {
          if (count >= skillValue) {
            clearInterval(interval);
            percent.textContent = skillValue + "%";
          } else {
            count++;
            percent.textContent = count + "%";
          }
        }, 15);

        observer.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active'); // close menu on click
  });
});
