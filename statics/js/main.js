(function () {
  const config = window.WEDDING_CONFIG;

  if (!config) {
    throw new Error("Missing WEDDING_CONFIG. Check statics/js/config.js.");
  }

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  document.addEventListener("DOMContentLoaded", () => {
    renderConfig();
    setupNavigation();
    setupCountdown();
    setupMusic();
    setupReveal();
  });

  function renderConfig() {
    const { couple, wedding, page, events, story } = config;
    const names = `${couple.groom.displayName} & ${couple.bride.displayName}`;
    const fullNames = `${couple.groom.fullName} & ${couple.bride.fullName}`;

    document.title = page.title;
    setMeta("description", page.description);
    setText("[data-couple-short]", names);
    setText("[data-couple-full]", fullNames);
    setText("[data-groom-display]", couple.groom.displayName);
    setText("[data-bride-display]", couple.bride.displayName);
    setText("[data-groom-full]", couple.groom.fullName);
    setText("[data-bride-full]", couple.bride.fullName);
    setText("[data-invite-line]", page.inviteLine);
    setText("[data-formal-line]", page.formalLine);
    setText("[data-closing-line]", page.closingLine);
    setText("[data-from-year]", story.fromYear);
    setText("[data-to-year]", story.toYear);
    setText("[data-side-left]", story.sideTextLeft);
    setText("[data-side-right]", story.sideTextRight);
    setText("[data-date-display]", formatDate(wedding.date));
    setText("[data-day-label]", wedding.dayLabel);
    setText("[data-lunar-main]", wedding.lunarDate);
    setText("[data-main-time]", `${wedding.mainTime} - ${wedding.dayLabel.toUpperCase()}`);

    renderParents("#groomParents", couple.groom.parents);
    renderParents("#brideParents", couple.bride.parents);
    renderEvents(events);
    renderSchedule(config.schedule);
    renderMap(events);
  }

  function setMeta(name, value) {
    const meta = document.querySelector(`meta[name="${name}"]`);
    if (meta) meta.setAttribute("content", value);
  }

  function setText(selector, value) {
    $$(selector).forEach((node) => {
      node.textContent = value || "";
    });
  }

  function renderParents(selector, parents) {
    const root = $(selector);
    if (!root) return;

    const rows = [
      parents.father && `Ông ${parents.father}`,
      parents.mother && `Bà ${parents.mother}`
    ].filter(Boolean);

    root.innerHTML = rows.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
  }

  function renderEvents(events) {
    const root = $("#eventCards");
    if (!root) return;

    root.innerHTML = events.map((event) => `
      <article class="event-card">
        <p class="event-card__eyebrow">${escapeHtml(event.hostLabel)}</p>
        <h3>${escapeHtml(event.title)}</h3>
        <p class="event-card__time">${escapeHtml(event.time)} - ${escapeHtml(formatWeekday(event.date))}</p>
        <p class="event-card__date">${escapeHtml(formatDate(event.date))}</p>
        <p class="event-card__lunar">${escapeHtml(event.lunarDate || "")}</p>
        <div class="event-card__place">
          <strong>${escapeHtml(event.place)}</strong>
          <span>${escapeHtml(event.address)}</span>
        </div>
        ${event.mapUrl ? `<a class="button button--ghost" target="_blank" rel="noopener" href="${escapeAttr(event.mapUrl)}">Mở bản đồ</a>` : ""}
      </article>
    `).join("");
  }

  function renderSchedule(items) {
    const root = $("#scheduleList");
    if (!root) return;

    root.innerHTML = items.map((item) => `
      <article class="timeline__item">
        <div class="timeline__time">
          <strong>${escapeHtml(item.time)}</strong>
          <span>${escapeHtml(item.date)}</span>
        </div>
        <div class="timeline__dot" aria-hidden="true"></div>
        <div class="timeline__content">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.note)}</p>
        </div>
      </article>
    `).join("");
  }

  function renderMap(events) {
    const root = $("#mapGrid");
    if (!root) return;

    const mapEvents = events.filter((event) => event.mapEmbedUrl || event.mapUrl);
    root.innerHTML = mapEvents.map((event) => `
      <article class="map-card">
        <div class="map-box">
          ${event.mapEmbedUrl
            ? `<iframe src="${escapeAttr(event.mapEmbedUrl)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen title="Bản đồ ${escapeAttr(event.place)}"></iframe>`
            : `<p>Google Maps embed chưa được cấu hình cho địa điểm này.</p>`}
        </div>
        <div class="map-card__body">
          <p class="event-card__eyebrow">${escapeHtml(event.hostLabel)}</p>
          <h3>${escapeHtml(event.place)}</h3>
          <p>${escapeHtml(event.address)}</p>
          ${event.mapUrl ? `<a class="button" target="_blank" rel="noopener" href="${escapeAttr(event.mapUrl)}">Mở Google Maps</a>` : ""}
        </div>
      </article>
    `).join("");
  }

  function setupNavigation() {
    const toggle = $("#navToggle");
    const nav = $("#siteNav");
    const links = $("#navLinks");
    if (!toggle || !nav || !links) return;

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setupCountdown() {
    const root = $("#countdown");
    if (!root) return;

    const target = parseLocalDateTime(config.wedding.date, config.wedding.countdownTime);
    const fields = {
      days: root.querySelector("[data-countdown-days]"),
      hours: root.querySelector("[data-countdown-hours]"),
      minutes: root.querySelector("[data-countdown-minutes]"),
      seconds: root.querySelector("[data-countdown-seconds]")
    };

    function tick() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        root.classList.add("is-today");
        root.innerHTML = "<p>Hôm nay là ngày hạnh phúc của chúng tôi.</p>";
        clearInterval(timer);
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      fields.days.textContent = String(Math.floor(totalSeconds / 86400)).padStart(2, "0");
      fields.hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
      fields.minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      fields.seconds.textContent = String(totalSeconds % 60).padStart(2, "0");
    }

    const timer = setInterval(tick, 1000);
    tick();
  }

  function setupMusic() {
    const audio = $("#bgMusic");
    const toggle = $("#musicToggle");
    if (!audio || !toggle) return;

    audio.src = config.music.src;
    audio.volume = config.music.volume;

    const sync = () => {
      const playing = !audio.paused;
      toggle.classList.toggle("is-playing", playing);
      toggle.setAttribute("aria-pressed", playing ? "true" : "false");
      toggle.querySelector("[data-music-label]").textContent = playing ? "Tắt nhạc" : "Bật nhạc";
    };

    const play = () => audio.play().then(sync).catch(sync);

    toggle.addEventListener("click", () => {
      if (audio.paused) play();
      else {
        audio.pause();
        sync();
      }
    });

    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);

    if (config.music.enabledByDefault) {
      play();
      const wakeEvents = ["pointerdown", "click", "keydown", "touchstart", "scroll"];
      const startOnInteraction = () => {
        if (!audio.paused) return;
        play().then(() => {
          if (!audio.paused) {
            wakeEvents.forEach((eventName) => window.removeEventListener(eventName, startOnInteraction));
          }
        });
      };
      wakeEvents.forEach((eventName) => window.addEventListener(eventName, startOnInteraction, { passive: true }));
    }

    sync();
  }

  function setupReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
  }

  function parseLocalDateTime(date, time) {
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = (time || "00:00").split(":").map(Number);
    return new Date(year, month - 1, day, hour || 0, minute || 0, 0);
  }

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  }

  function formatWeekday(dateString) {
    const names = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const [year, month, day] = dateString.split("-").map(Number);
    return names[new Date(year, month - 1, day).getDay()];
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }
})();
