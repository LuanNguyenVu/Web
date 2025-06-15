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

  // Ghi lại nội dung ban đầu (trang chủ)
  const homeContent = main.innerHTML;

  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");

      // Nếu là trang chủ
      if (!page || page === "index.html") {
        main.innerHTML = homeContent;
        window.history.pushState({}, "", "");
        return;
      }

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

  // Xử lý nút back/forward trình duyệt
  window.addEventListener("popstate", () => {
    const hashPage = window.location.hash.replace("#", "");

    // Nếu là về trang chủ
    if (!hashPage == "index.html") {
      main.innerHTML = homeContent;
      return;
    }

    fetch(hashPage)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then(html => main.innerHTML = html)
      .catch(() => {
        main.innerHTML = "<p>Không thể tải nội dung. Vui lòng thử lại.</p>";
      });
  });
});



