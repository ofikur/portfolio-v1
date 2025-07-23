document.addEventListener("DOMContentLoaded", function () {
  // --- INISIALISASI EMAILJS ---
  (function () {
    emailjs.init({
      publicKey: "MASUKKAN_PUBLIC_KEY_DISINI", // <-- Ganti ini dengan public key yang kamu dapatkan di EmailJS
    });
  })();

  // --- DEKLARASI VARIABEL GLOBAL UNTUK THREE.JS ---
  let scene, camera, renderer, gridHelper;

  // --- DAFTAR SKILL DENGAN LOGO ---
  const skillsList = [
    { name: "HTML5", icon: "devicon-html5-plain" },
    { name: "CSS3", icon: "devicon-css3-plain" },
    { name: "JavaScript", icon: "devicon-javascript-plain" },
    { name: "React.js", icon: "devicon-react-original" },
    { name: "Vue.js", icon: "devicon-vuejs-plain" },
    { name: "TypeScript", icon: "devicon-typescript-plain" },
    { name: "Node.js", icon: "devicon-nodejs-plain" },
    { name: "Sass/SCSS", icon: "devicon-sass-original" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
    { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
    { name: "Webpack", icon: "devicon-webpack-plain" },
    { name: "Git", icon: "devicon-git-plain" },
    { name: "Responsive Design", icon: "fas fa-mobile-alt" },
    { name: "REST API", icon: "fas fa-cogs" },
  ];

  // --- SISTEM BAHASA ---
  let currentLang = "id";

  window.setLanguage = function (lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.getAttribute("data-key");
      if (languageData[key] && languageData[key][lang]) {
        el.innerHTML = languageData[key][lang];
      }
    });
    document.querySelectorAll("[data-key-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-key-placeholder");
      if (languageData[key] && languageData[key][lang]) {
        el.placeholder = languageData[key][lang];
      }
    });

    const titleText = languageData.heroTitle[lang];
    typeWriterEffect(titleText);

    const langSwitcherBtn = document.getElementById("langSwitcherBtn");
    langSwitcherBtn.querySelector("span").textContent =
      lang === "id" ? "EN" : "ID";
  };

  window.switchLanguage = function (newLang) {
    const langToSet = newLang ? newLang : currentLang === "id" ? "en" : "id";
    setLanguage(langToSet);
  };

  let _0x2a1b = {
    c: atob("V2Vic2l0ZSBkZXNpZ24gYnkgPGEgaHJlZj0iaHR0cHM6Ly9naXRodWIuY29tL29maWt1ciIgdGFyZ2V0PSJfYmxhbmsiIHN0eWxlPSJjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yKTsiPk9maWt1ciBSLjwvYT4u"),
    m: atob("PGgxIHN0eWxlPSJmb250LXNpemU6IDJyZW07IG1hcmdpbi1ib3R0b206IDFyZW07Ij5bIElOVEVHUklUWV9DSEVDS19GQUlMRUQgXTwvaDE+PHAgc3R5bGU9ImZvbnQtc2l6ZTogMXJlbTsiPkVycm9yOiBJbnRlZ3JpdGFzIEhhbGFtYW4gRGlsYW5nZ2FyLjxicj5IYXJhcCBrZW1iYWxpa2FuIGtyZWRpdCBmb290ZXIgYXNsaSB1bnR1ayBtZWxhbmp1dGthbi48L3A+PHAgc3R5bGU9ImZvbnQtc2l6ZTogMC44cmVtOyBtYXJnaW4tdG9wOiAycmVtOyBvcGFjaXR5OiAwLjU7Ij5PcmlnaW5hbCBjcmVkaXQgbXVzdCBiZSByZXN0b3JlZCB0byByZXNvbHZlIHRoaXMgZXJyb3IuPC9wPg=="),
    i: null,
  };

  // --- Logika Background 3D Grid dengan Three.js ---
  function initThreeJSBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const canvas = document.getElementById("bgCanvas");
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    const size = 100;
    const divisions = 40;
    gridHelper = new THREE.GridHelper(size, divisions);
    updateGridColor();
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    gridHelper.rotation.x = Math.PI / 2.5;
    scene.add(gridHelper);
    camera.position.set(0, 1, 15);
    camera.lookAt(scene.position);
    window.addEventListener("scroll", updateGridOnScroll);
    animate();
    window.addEventListener("resize", onWindowResize);
  }

  function updateGridColor() {
    if (!gridHelper) return;
    const isLightTheme = document.body.getAttribute("data-theme") === "light";
    const newColor = isLightTheme
      ? new THREE.Color(0xcccccc)
      : new THREE.Color(0x004d00);
    gridHelper.material.color.set(newColor);
  }

  function updateGridOnScroll() {
    const scrollY = window.pageYOffset;
    gridHelper.position.z = scrollY * 0.02;
    gridHelper.rotation.y = scrollY * 0.00005;
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // --- FUNGSI-FUNGSI LAINNYA ---
  window.toggleTheme = function (theme) {
    const body = document.body;
    let newTheme;
    if (theme) {
      newTheme = theme;
    } else {
      newTheme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
    }
    body.setAttribute("data-theme", newTheme);
    const icon = document.querySelector(".theme-toggle i");
    icon.className = newTheme === "light" ? "fas fa-moon" : "fas fa-sun";
    updateGridColor();
  };

  const mobileNav = document.getElementById("mobileNav");
  window.toggleMobileNav = function () {
    mobileNav.classList.toggle("active");
  };
  window.closeMobileNav = function () {
    mobileNav.classList.remove("active");
  };

  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    let current = "home";
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - 100) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function _0x5f3a(t) {
    const o = document.createElement("div");
    Object.assign(o.style, {
      position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.95)", color: "#ff4d4d", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", fontFamily: "Consolas, monospace", textAlign: "center", zIndex: "999999",
    }),
      (o.innerHTML = _0x2a1b.m),
      document.body.appendChild(o),
      clearInterval(t);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToSection(this.getAttribute("href"));
      closeMobileNav();
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // --- FUNGSI KIRIM PESAN DENGAN VALIDASI EMAIL ---
  window.handleSubmit = function (event) {
    event.preventDefault();
    const emailInput = event.target.querySelector("#email");
    const emailValue = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      alert(
        "Format email tidak valid. Harap masukkan alamat email yang benar ya!"
      );
      emailInput.focus();
      return;
    }
    const submitBtn = event.target.querySelector(".submit-btn");
    const serviceID = "MASUKKAN_SERVICE_ID_DISINI"; // <-- Ganti ini dengan service id yang kamu dapatkan di EmailJS
    const templateID = "MASUKKAN_TEMPLATE_ID_DISINI"; // <-- Ganti ini dengan template id yang kamu dapatkan di EmailJS
    submitBtn.innerHTML = languageData.formSendingBtn[currentLang];
    submitBtn.disabled = true;
    emailjs.sendForm(serviceID, templateID, event.target).then(
      () => {
        const successMessage = document.getElementById("successMessage");
        successMessage.classList.add("show");
        event.target.reset();
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> <span data-key="formSubmitBtn">${languageData.formSubmitBtn[currentLang]}</span>`;
        submitBtn.disabled = false;
        setTimeout(() => successMessage.classList.remove("show"), 3000);
      },
      (err) => {
        alert(
          "Oops! Terjadi kesalahan. Coba lagi nanti ya. Error: " +
            JSON.stringify(err)
        );
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> <span data-key="formSubmitBtn">${languageData.formSubmitBtn[currentLang]}</span>`;
        submitBtn.disabled = false;
      }
    );
  };

  function typeWriterEffect(text) {
    const titleElement = document.getElementById("hero-title");
    if (!titleElement) return;
    let i = 0;
    titleElement.innerHTML = `<span class="cursor"></span>`;
    function type() {
      if (i < text.length) {
        titleElement.innerHTML =
          text.substring(0, i + 1) + `<span class="cursor"></span>`;
        i++;
        setTimeout(type, 100);
      } else {
        if (titleElement.querySelector(".cursor")) {
          titleElement.querySelector(".cursor").style.animation =
            "blink 1s infinite";
        }
      }
    }
    type();
  }

  // --- SKILLS CAROUSEL LOGIC ---
  function initSkillsCarousel() {
    const skillsCarousel = document.querySelector(".skills-carousel");
    if (!skillsCarousel) return;
    const skillsTrack = document.getElementById("skillsTrack");
    let skillsPosition = 0,
      lastScrollY = window.pageYOffset,
      autoScrollInterval,
      scrollTimeout,
      skillsTrackWidth = 0,
      isDragging = false,
      startX,
      startScrollLeft;

    function populateSkills() {
      skillsTrack.innerHTML = "";
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < 2; i++) {
        skillsList.forEach((skill) => {
          const skillDiv = document.createElement("div");
          skillDiv.className = "skill-item";
          skillDiv.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
          fragment.appendChild(skillDiv);
        });
      }
      skillsTrack.appendChild(fragment);
      updateSkillsTrackWidth();
    }

    function updateSkillsTrackWidth() {
      skillsTrackWidth = skillsTrack.scrollWidth / 2;
    }

    function applyTransform() {
      if (skillsTrackWidth > 0) {
        while (skillsPosition > 0) {
          skillsPosition -= skillsTrackWidth;
        }
        while (skillsPosition <= -skillsTrackWidth) {
          skillsPosition += skillsTrackWidth;
        }
      }
      skillsTrack.style.transform = `translateX(${skillsPosition}px)`;
    }

    function startAutoScroll() {
      stopAutoScroll();
      if (isDragging) return;
      autoScrollInterval = setInterval(() => {
        skillsPosition -= 0.5;
        applyTransform();
      }, 30);
    }

    function stopAutoScroll() {
      clearInterval(autoScrollInterval);
    }

    function updateSkillsCarouselOnScroll() {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY === lastScrollY) return;
      const scrollDifference = currentScrollY - lastScrollY;
      const scrollSpeed = 0.5;
      skillsPosition -= scrollDifference * scrollSpeed;
      lastScrollY = currentScrollY;
      applyTransform();
    }

    function handleDrag(currentX) {
      if (!isDragging) return;
      const walk = (currentX - startX) * 1.5;
      skillsPosition = startScrollLeft + walk;
      applyTransform();
    }

    function startDrag(e) {
      isDragging = true;
      startX = (e.pageX || e.touches[0].pageX) - skillsCarousel.offsetLeft;
      startScrollLeft = skillsPosition;
      stopAutoScroll();
      skillsCarousel.style.cursor = "grabbing";
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      skillsCarousel.style.cursor = "grab";
      scrollTimeout = setTimeout(startAutoScroll, 1000);
    }

    skillsCarousel.addEventListener("mousedown", startDrag);
    skillsCarousel.addEventListener("mouseup", endDrag);
    skillsCarousel.addEventListener("mouseleave", endDrag);
    skillsCarousel.addEventListener("mousemove", (e) => handleDrag(e.pageX));
    skillsCarousel.addEventListener("touchstart", (e) =>
      startDrag(e.touches[0])
    );
    skillsCarousel.addEventListener("touchend", endDrag);
    skillsCarousel.addEventListener("touchcancel", endDrag);
    skillsCarousel.addEventListener("touchmove", (e) =>
      handleDrag(e.touches[0].pageX)
    );
    skillsCarousel.style.cursor = "grab";

    window.addEventListener("scroll", () => {
      if (!isDragging && skillsCarousel) {
        stopAutoScroll();
        updateSkillsCarouselOnScroll();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(startAutoScroll, 1000);
      }
    });

    populateSkills();
    startAutoScroll();
  }

  // --- TERMINAL LOGIC ---
  function initTerminal() {
    if (window.innerWidth <= 768) return; 

    const terminalContent = document.getElementById("terminal-content");
    const textInput = document.getElementById("terminal-input-text");
    const hiddenInput = document.getElementById("hidden-input");
    let commandHistory = [];
    let historyIndex = -1;

    const commands = {
      help: {
        description: "Menampilkan daftar perintah yang tersedia.",
        execute: () => {
          let helpText = "Perintah yang tersedia:<br>";
          for (const cmd in commands) {
            helpText += `<span class="help-command">${cmd.padEnd(
              15
            )}</span> <span class="help-desc">${
              commands[cmd].description
            }</span><br>`;
          }
          printOutput(helpText);
        },
      },
      about: {
        description: "Scroll ke bagian 'Tentang Saya'.",
        execute: () => scrollToSection("#about"),
      },
      skills: {
        description: "Scroll ke bagian 'Skills'.",
        execute: () => scrollToSection("#skills"),
      },
      projects: {
        description: "Scroll ke bagian 'Proyek'.",
        execute: () => scrollToSection("#projects"),
      },
      contact: {
        description: "Scroll ke bagian 'Kontak'.",
        execute: () => scrollToSection("#contact"),
      },
      cv: {
        description: "Mengunduh CV saya.",
        execute: () => document.getElementById("cv-download-link").click(),
      },
      theme: {
        description: "Ganti tema. Penggunaan: theme [light|dark]",
        execute: (args) => {
          if (args[0] === "light" || args[0] === "dark") {
            toggleTheme(args[0]);
            printOutput(`Tema diubah menjadi ${args[0]}.`);
          } else {
            printError("Penggunaan: theme [light|dark]");
          }
        },
      },
      lang: {
        description: "Ganti bahasa. Penggunaan: lang [id|en]",
        execute: (args) => {
          if (args[0] === "id" || args[0] === "en") {
            switchLanguage(args[0]);
            printOutput(
              `Bahasa diubah menjadi ${
                args[0] === "id" ? "Indonesia" : "English"
              }.`
            );
          } else {
            printError("Penggunaan: lang [id|en]");
          }
        },
      },
      social: {
        description: "Tampilkan link sosial media.",
        execute: () => {
          printOutput(
            'GitHub:   <a href="https://github.com/ofikur" target="_blank">https://github.com/ofikur</a><br>' +
              'LinkedIn: <a href="https://linkedin.com/in/ofikur" target="_blank">https://linkedin.com/in/ofikur</a><br>' +
              'Instagram: <a href="https://instagram.com/ofikurr" target="_blank">https://instagram.com/ofikurr</a>'
          );
        },
      },
      clear: {
        description: "Membersihkan layar terminal.",
        execute: () => (terminalContent.innerHTML = ""),
      },
      sudo: {
        description: "Hee-hee, mau coba apa nih?",
        execute: () =>
          printOutput("Hee-hee, akses ditolak ya! Kamu bukan root! 😉"),
      },
    };

    function printOutput(html) {
      terminalContent.innerHTML += `<div class="command-output">${html}</div>`;
      terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    function printError(text) {
      terminalContent.innerHTML += `<div class="error">${text}</div>`;
      terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    function processCommand(fullCommand) {
      const [command, ...args] = fullCommand
        .trim()
        .split(" ")
        .filter((i) => i);
      if (!command) return;

      printOutput(`<span class="prompt">$</span> ${fullCommand}`);
      commandHistory.unshift(fullCommand);
      historyIndex = -1;

      if (commands[command]) {
        commands[command].execute(args);
      } else {
        printError(
          `bash: command not found: ${command}. Ketik 'help' untuk bantuan.`
        );
      }
    }

    hiddenInput.addEventListener("input", (e) => {
      textInput.textContent = e.target.value;
    });

    hiddenInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        processCommand(hiddenInput.value);
        hiddenInput.value = "";
        textInput.textContent = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          hiddenInput.value = commandHistory[historyIndex];
          textInput.textContent = hiddenInput.value;
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          hiddenInput.value = commandHistory[historyIndex];
          textInput.textContent = hiddenInput.value;
        } else {
          historyIndex = -1;
          hiddenInput.value = "";
          textInput.textContent = "";
        }
      }
    });

    window.focusInput = function () {
      hiddenInput.focus();
    };

    printOutput(
      "Selamat datang di portfolio.exe!<br>Ketik 'help' untuk melihat daftar perintah yang bisa kamu gunakan.<br>"
    );
    focusInput();
  }

  // --- PROTEKSI ---
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.onkeydown = function (e) {
    if (e.target.id === "hidden-input") return;
    if (
      e.keyCode == 123 ||
      (e.ctrlKey &&
        e.shiftKey &&
        (e.keyCode == "I".charCodeAt(0) || e.keyCode == "J".charCodeAt(0))) ||
      (e.ctrlKey && e.keyCode == "U".charCodeAt(0))
    ) {
      return false;
    }
  };

  // --- EVENT LISTENERS & INISIALISASI ---
  window.addEventListener("scroll", updateActiveNav);

  initThreeJSBackground();
  initSkillsCarousel();
  initTerminal();
  updateActiveNav();
  setLanguage(currentLang);

  _0x2a1b.i = setInterval(function () {
    const t = document.getElementById("footer-credit");
    (t && t.innerHTML.trim() === _0x2a1b.c) || _0x5f3a(_0x2a1b.i);
  }, 2100);
});
