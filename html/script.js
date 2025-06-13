document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('a[data-page]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      loadPage(page);
    });
  });

  // Mặc định load trang chủ
  loadPage('home.html');
});

function loadPage(page) {
  fetch(page)
    .then(res => res.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
      window.scrollTo(0, 0);
    })
    .catch(err => {
      document.getElementById('content').innerHTML = "<p>Không thể tải trang.</p>";
      console.error("Lỗi tải trang: ", err);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const fadeEls = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .flip-up, .slide-down");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, {
    threshold: 0.1
  });

  fadeEls.forEach((el) => observer.observe(el));
});

