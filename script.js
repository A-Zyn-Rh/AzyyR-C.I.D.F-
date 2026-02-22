// --- 1. Preloader Logic ---
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Memberikan sedikit waktu delay agar animasi logo terlihat
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500); // Waktu yang sama dengan transisi CSS
  }, 1000);
});

// --- 2. Sticky Navbar ---
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// --- 3. Testimonial Slider ---
const testimonials = [
  {
    text: `"AzyyR tidak hanya menulis kode, ia merancang masa depan. Visi teknisnya membawa produk kami ke level elit."`,
    author: "- Elon Doe, CEO of FutureTech",
  },
  {
    text: `"Desain UI/UX yang dibuatnya sangat out-of-the-box. Pengalaman pengguna di aplikasi kami meningkat drastis!"`,
    author: "- Sarah Connor, Product Manager",
  },
  {
    text: `"Kemampuannya menerjemahkan ide kompleks menjadi antarmuka yang elegan dan cepat benar-benar luar biasa."`,
    author: "- Michael Scott, Tech Founder",
  },
];

let currentTesti = 0;
const testiText = document.getElementById("testi-text");
const testiAuthor = document.getElementById("testi-author");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function updateTestimonial() {
  // Animasi fade sederhana dengan vanilla JS
  testiText.style.opacity = 0;
  testiAuthor.style.opacity = 0;

  setTimeout(() => {
    testiText.innerText = testimonials[currentTesti].text;
    testiAuthor.innerText = testimonials[currentTesti].author;
    testiText.style.opacity = 1;
    testiAuthor.style.opacity = 1;
  }, 300);
}

nextBtn.addEventListener("click", () => {
  currentTesti = (currentTesti + 1) % testimonials.length;
  updateTestimonial();
});

prevBtn.addEventListener("click", () => {
  currentTesti = (currentTesti - 1 + testimonials.length) % testimonials.length;
  updateTestimonial();
});

// --- 4. Back To Top Button ---
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// --- 5. Prevent Form Submit (For Demo) ---
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button");
  const originalText = btn.innerHTML;

  btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
  btn.style.background = "#00f2fe";

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = "";
    e.target.reset();
  }, 3000);
});

// --- 6. GSAP Animations (Scroll Reveal) ---
// Pastikan plugin diregister
gsap.registerPlugin(ScrollTrigger);

// Animasi khusus untuk hero section saat web baru diload
gsap.from(".fade-up", {
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  delay: 1.2, // Delay setelah preloader hilang
});

// Animasi general untuk elemen-elemen saat di-scroll
const revealElements = gsap.utils.toArray(".reveal");

revealElements.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 85%", // Mulai saat elemen 85% dari atas viewport
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});
const form = document.getElementById("form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "2fd9aed7-70fa-4b57-bf4b-6d91a4e560f9");

  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      form.reset();
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
