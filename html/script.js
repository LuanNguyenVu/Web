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

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const main = document.getElementById("mains-content");

  // Lưu lại nội dung mặc định ban đầu
  const homeContent = main.innerHTML;

  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      const page = link.getAttribute("data-page");

      // Nếu là Trang Chủ → load lại toàn bộ trang
      if (page === "index.html" || !page) {
        return; // KHÔNG preventDefault → để load lại toàn trang
      }

      // Các trang khác → prevent reload và tải động
      e.preventDefault();

      try {
        const res = await fetch(page);
        if (!res.ok) throw new Error("Không thể tải trang.");
        const html = await res.text();
        main.innerHTML = html;
        window.history.pushState({}, "", `#${page}`);
      } catch (err) {
        main.innerHTML = "<p>Không thể tải nội dung. Vui lòng thử lại.</p>";
      }
    });
  });

  // Quản lý khi bấm nút back/forward
  window.addEventListener("popstate", () => {
    const hashPage = window.location.hash.replace("#", "");
    if (!hashPage || hashPage === "index.html") {
      location.reload(); // Reload lại trang nếu quay về Trang Chủ
    } else {
      fetch(hashPage)
        .then(res => res.text())
        .then(html => main.innerHTML = html)
        .catch(() => {
          main.innerHTML = "<p>Không thể tải nội dung. Vui lòng thử lại.</p>";
        });
    }
  });
});




