/* =========================================================
   RATHI BRIDAL ARTIST - SCRIPT
   ========================================================= */

/* ---------- Settings ---------- */
const WA_NUMBER = "919360408262";
const BUSINESS = "Rathi Bridal Artist";
const THANK_YOU = "Thank You For Visit Rathi Bridal Artist";

/* Optional: a server endpoint that sends the WhatsApp Business API alert
   to the client and the studio. Leave "" to use the WhatsApp link only. */
const BOOKING_API_URL = "";

/* ---------- Helpers ---------- */
const $ = (selector) => document.querySelector(selector);

/* Every uploaded photo lives in /img. encodeURI handles the spaces in folder names. */
const pic = (path) => "img/" + encodeURI(path);

const waLink = (text = "Hi Rathi, I would like to book an appointment.") =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const showNote = (selector, message) => {
  $(selector).textContent = message;
};

const validPhone = (value) => /^\+?[\d\s]{10,}$/.test(value);

/* ---------- Loading screen ----------
   Shows the logo and name while the page loads. It stays for at least 1.4 seconds so the
   animation can be seen, then fades out. A hard limit means it can never get stuck on screen. */
const loader = $("#loader");
const LOADER_MIN_MS = 1400;
const LOADER_MAX_MS = 4000;
const loaderStart = performance.now();
let loaderDone = false;

const hideLoader = () => {
  if (loaderDone) return;
  loaderDone = true;

  const wait = Math.max(0, LOADER_MIN_MS - (performance.now() - loaderStart));
  setTimeout(() => {
    loader.classList.add("ld-hide");
    document.body.classList.remove("no-scroll");
    setTimeout(() => (loader.hidden = true), 700);
  }, wait);
};

document.body.classList.add("no-scroll");
if (document.readyState === "complete") hideLoader();
else addEventListener("load", hideLoader);
setTimeout(hideLoader, LOADER_MAX_MS);

/* ---------- Content ---------- */
const HERO = [
  "Home Backround/B1.jpeg",
  "Home Backround/B2.jpeg",
  "Home Backround/B3.jpeg",
  "Home Backround/B4.jpeg",
  "Home Backround/B5.jpeg",
].map(pic);

const BRIDAL = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => pic(`Bridal Model Works/Bride Model Work ${n}.jpeg`));

/* Home page category cards. `photo` is the uploaded card image for each category. */
const SERVICES = [
  { key: "haircuts", title: "Hair Cuts", desc: "Basic to advanced cuts that define you.", icon: "✂️", photo: pic("Our Services/Haircut.jpeg") },
  { key: "makeup", title: "Make-up", desc: "HD, airbrush & bridal looks.", icon: "💄", photo: pic("Our Services/Makeup.jpeg") },
  { key: "saree", title: "Saree Draping", desc: "Traditional to party-wear styles.", icon: "🥻", photo: pic("Our Services/Saree Draping.jpeg") },
  { key: "course", title: "Course", desc: "Beautician training, step by step.", icon: "🎓", photo: pic("Our Services/Course.jpeg") },
];

/* Optional seed reviews as { name, text, rating }. Leave empty so the page starts with none. */
const REVIEWS = [];

/* Each item has its own uploaded photo. Service pages and booking steps both read from here. */
const it = (name, path) => ({ name, img: pic(path) });

const PAGES = {
  haircuts: {
    title: "Hair Cuts",
    sub: "Basic to Advance Hair Cut",
    groups: [
      {
        icon: "💇‍♀️",
        title: "Basic Hair Cut",
        items: [
          it("Straight Cut", "Haircut/Basi Haircut/Straight Haircut.jpeg"),
          it("U Cut", "Haircut/Basi Haircut/U Haircut.jpeg"),
          it("V Cut", "Haircut/Basi Haircut/V Haircut.jpeg"),
          it("Bob Cut", "Haircut/Basi Haircut/Bob Haircut.jpeg"),
          it("Bangs Cut", "Haircut/Basi Haircut/Bangs Haircut.jpeg"),
        ],
      },
      {
        icon: "💇‍♀️",
        title: "Advance Cuts",
        items: [
          it("Layered Cut", "Haircut/Advance Haircut/Layered Haircut.jpeg"),
          it("Long Layers Cut", "Haircut/Advance Haircut/Long Layer Haircut.jpeg"),
          it("Step Cut", "Haircut/Advance Haircut/Step Haircut.jpeg"),
          it("Feather Cut", "Haircut/Advance Haircut/Feather Haircut.jpeg"),
          it("Butterfly Cut", "Haircut/Advance Haircut/Butterfly Haircut.jpeg"),
          it("Curtain Bangs with Layers Cut", "Haircut/Advance Haircut/Curtain Bangs With Layer Haircut.jpeg"),
          it("Shag Cut", "Haircut/Advance Haircut/Shags Haircut.jpeg"),
        ],
      },
    ],
  },
  makeup: {
    title: "Make-up",
    sub: "Bridal & Party Make-up",
    groups: [
      {
        icon: "💄",
        title: "Make-up Styles",
        items: [
          it("HD Makeup", "Makeup/HD Makeup.jpeg"),
          it("Glass Makeup", "Makeup/Glass Makeup.jpeg"),
          it("Glossy Makeup", "Makeup/Glossy Makeup.jpeg"),
          it("Sweatproof Makeup", "Makeup/Sweatproof Makeup.jpeg"),
          it("Waterproof Makeup", "Makeup/Waterproof Makeup.jpeg"),
          it("Airbrush Makeup", "Makeup/Airbrush Makeup.jpeg"),
          it("Bride Maid Makeup", "Makeup/Bride Maid Makeup.jpeg"),
          it("Groom Makeup", "Makeup/Groom Makeup.jpeg"),
        ],
      },
    ],
  },
  saree: {
    title: "Saree Draping",
    sub: "Perfect pleats, perfect pallu",
    groups: [
      {
        icon: "🥻",
        title: "Draping Styles",
        items: [
          it("Traditional saree draping", "Saree Drapping/Traditional Saree Draping.jpeg"),
          it("Bridal saree draping", "Saree Drapping/Bride Saree Draping.jpeg"),
          it("Reception saree draping", "Saree Drapping/Reception Saree Draping.jpeg"),
          it("Party-wear saree draping", "Saree Drapping/Partywear Saree Draping.jpeg"),
          it("Pre-pleated saree styling", "Saree Drapping/Preplated Saree Draping.jpeg"),
        ],
      },
    ],
  },
  course: {
    title: "Course",
    sub: "Beautician Course",
    intro:
      '<p class="lead">A beautician course trains you in skincare, hair care, makeup artistry, and salon hygiene, with options ranging from short workshops and local academy classes to 3 Month government-recognized diplomas in Tamil Nadu.</p>' +
      '<div class="chips"><span>Skincare</span><span>Hair care</span><span>Makeup artistry</span><span>Salon hygiene</span></div>',
    groups: [
      {
        icon: "🎓",
        title: "Course Options",
        items: [
          it("Short Workshops", "Courses/Short Workshop Course.jpeg"),
          it("Local Academy Classes", "Courses/Local Academy Course.jpeg"),
          it("3 Month Diploma (Govt-recognized)", "Courses/3 Month Diplomo Course.jpeg"),
        ],
      },
    ],
  },
};

/* Number every item per category, and remember its group title */
Object.values(PAGES).forEach((page) => {
  page.all = [];
  page.groups.forEach((group) =>
    group.items.forEach((item) => {
      item.id = page.all.length;
      item.group = group.title;
      page.all.push(item);
    })
  );
});

/* ---------- Build page sections ---------- */

/* Hero slideshow */
$("#sl").innerHTML = HERO.map(
  (src, i) => `<div class="ph${i === 0 ? " on" : ""}"><img src="${src}" alt="Bridal look"></div>`
).join("");

/* Service category cards */
$("#sg").innerHTML = SERVICES.map(
  (s, i) => `
    <div class="rv" style="--d:${i * 0.1}s">
      <a class="svc" href="#${s.key}">
        <span class="si ph"><img loading="lazy" src="${s.photo}" alt="${esc(s.title)}"></span>
        <span class="ico">${s.icon}</span>
        <div class="sbody">
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.desc)}</p>
          <span class="go">→</span>
        </div>
      </a>
    </div>`
).join("");

/* Bridal marquee: each column is doubled so the loop is seamless */
const marquee = (list) =>
  [...list, ...list]
    .map((src) => `<div class="ph"><img loading="lazy" src="${src}" alt="Bridal model work"></div>`)
    .join("");

$("#mqL").innerHTML = marquee(BRIDAL.slice(0, 4));
$("#mqR").innerHTML = marquee(BRIDAL.slice(4, 8));

/* ---------- Client reviews ----------
   Posted reviews are kept in memory for this page view only, so every reload starts empty. */
let reviews = REVIEWS.map((r) => ({ ...r }));

const starsHtml = (n) => "★".repeat(n) + `<i class="off">${"★".repeat(5 - n)}</i>`;

const reviewCard = (r, extra = "") => `
  <div class="rc${extra}">
    <div class="stars" role="img" aria-label="${r.rating} out of 5 stars">${starsHtml(r.rating)}</div>
    <p>${esc(r.text)}</p>
    <b>${esc(r.name)}</b>
  </div>`;

const updateScore = () => {
  if (reviews.length === 0) {
    $("#avg").textContent = "—";
    $("#avgs").innerHTML = starsHtml(0);
    return;
  }
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  $("#avg").textContent = avg.toFixed(1);
  $("#avgs").innerHTML = starsHtml(Math.round(avg));
};

const renderReviews = (animateNewest = false) => {
  const list = $("#rl");

  if (reviews.length === 0) {
    list.classList.add("is-empty");
    list.innerHTML = `<div class="rc empty-review"><p>No reviews yet. Be the first to share your experience!</p></div>`;
  } else {
    list.classList.remove("is-empty");

    /* Repeat the cards until one half is tall enough to fill the window,
       then play the two identical halves in a loop so the scroll never shows a gap */
    let half = [];
    while (half.length < 4) half = half.concat(reviews);

    const cards = half
      .map((r, i) => reviewCard(r, animateNewest && i === 0 ? " fresh" : ""))
      .join("");

    /* About 6 seconds per card keeps the scroll speed steady as reviews are added */
    list.innerHTML = `<div class="rl-track" style="--dur:${half.length * 6}s">${cards}${cards}</div>`;
  }

  updateScore();
};

renderReviews();

/* WhatsApp links for social / footer */
document.querySelectorAll("[data-wa]").forEach((a) => (a.href = waLink()));

/* ---------- Thank-you bands and wave text ---------- */
const thankPhrase = `${THANK_YOU} <i class="th-star">✦</i> `;
const thankSegment = `<div class="th-seg">${thankPhrase.repeat(2)}</div>`;
document.querySelectorAll(".th-track").forEach((track) => (track.innerHTML = thankSegment + thankSegment));

/* Letter-by-letter wave on the highlighted words */
document.querySelectorAll("[data-wave]").forEach((el) => {
  let n = 0;
  el.innerHTML = el.textContent
    .split(" ")
    .map(
      (word) =>
        `<span class="w">${[...word].map((ch) => `<i style="--i:${n++}">${esc(ch)}</i>`).join("")}</span>`
    )
    .join(" ");
});

/* ---------- Booking flow ----------
   1. Pick a category   2. Pick a service (Basic / Advance, Make-up, Saree, Course)
   3. Name, phone, date and time   4. Send: WhatsApp opens with the booking alert */
const bookModal = $("#bookModal");
const bkForm = $("#bkForm");
const bkSteps = { cats: $("#bkCats"), items: $("#bkItems"), form: $("#bkForm"), done: $("#bkDone") };
const bk = { cat: null, item: null };

const SUBTITLE = {
  cats: "Choose a category to continue",
  items: "Pick the look you want",
  form: "Tell us where to reach you",
  done: "",
};

const showStep = (step) => {
  Object.entries(bkSteps).forEach(([name, el]) => (el.hidden = name !== step));
  $("#bkHead").hidden = step === "done";
  $("#bkSub").textContent = SUBTITLE[step];
};

const serviceLabel = () => `${PAGES[bk.cat].title} > ${bk.item.group} > ${bk.item.name}`;

const fmtDate = (value) =>
  new Date(`${value}T00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const fmtTime = (value) => {
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
};

/* The date picker cannot go back before today (local time) */
const setMinDate = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  $("#bkDate").min = d.toISOString().slice(0, 10);
};

const renderCats = () => {
  bkSteps.cats.innerHTML = SERVICES.map(
    (s) => `
      <button class="bk-cat" type="button" data-cat="${s.key}">
        <span class="bk-thumb"><img loading="lazy" src="${s.photo}" alt=""></span>
        <span class="bk-txt"><b>${esc(s.title)}</b><small>${esc(s.desc)}</small></span>
        <span class="bk-arrow" aria-hidden="true">→</span>
      </button>`
  ).join("");
};

const renderItems = (cat) => {
  const page = PAGES[cat];
  bkSteps.items.innerHTML = `
    <button class="bk-back" type="button" data-back="1">← Back</button>
    ${page.groups
      .map(
        (g) => `
      <h4 class="bk-gt">${g.icon} ${esc(g.title)}</h4>
      <div class="bk-grid">
        ${g.items
          .map(
            (item) => `
          <button class="bk-item" type="button" data-item="${item.id}">
            <span class="bk-thumb"><img loading="lazy" src="${item.img}" alt=""></span>
            <span>${esc(item.name)}</span>
          </button>`
          )
          .join("")}
      </div>`
      )
      .join("")}`;
};

const renderSelected = () => {
  const { item } = bk;
  $("#bkSel").innerHTML = `
    <span class="bk-thumb"><img src="${item.img}" alt=""></span>
    <span><b>${esc(item.name)}</b><small>${esc(PAGES[bk.cat].title)} · ${esc(item.group)}</small></span>`;
};

const goCats = () => {
  bk.cat = null;
  bk.item = null;
  showStep("cats");
};

const goItems = (cat) => {
  bk.cat = cat;
  bk.item = null;
  renderItems(cat);
  showStep("items");
};

const goForm = (item) => {
  bk.item = item;
  renderSelected();
  $("#bkNote").textContent = "";
  showStep("form");
};

/* Opens the flow. A preset category or service skips the steps that are already answered. */
const openBook = ({ cat = null, idx = null } = {}) => {
  bkForm.reset();
  setMinDate();
  bookModal.hidden = false;
  document.body.style.overflow = "hidden";

  if (cat && idx !== null) {
    bk.cat = cat;
    goForm(PAGES[cat].all[idx]);
  } else if (cat) {
    goItems(cat);
  } else {
    goCats();
  }
};

const closeBook = () => {
  bookModal.hidden = true;
  document.body.style.overflow = "";
};

renderCats();

bkSteps.cats.onclick = (e) => {
  const btn = e.target.closest("[data-cat]");
  if (btn) goItems(btn.dataset.cat);
};

bkSteps.items.onclick = (e) => {
  if (e.target.closest("[data-back]")) return goCats();
  const btn = e.target.closest("[data-item]");
  if (btn) goForm(PAGES[bk.cat].all[Number(btn.dataset.item)]);
};

$("#bkFormBack").onclick = () => goItems(bk.cat);

bkForm.onsubmit = (e) => {
  e.preventDefault();

  const name = $("#bkName").value.trim();
  const phone = $("#bkPhone").value.trim();
  const date = $("#bkDate").value;
  const time = $("#bkTime").value;

  if (!name) return showNote("#bkNote", "Please enter your name.");
  if (!validPhone(phone)) return showNote("#bkNote", "Please enter a valid phone number.");
  if (!date || !time) return showNote("#bkNote", "Please choose a date and time.");
  if (new Date(`${date}T${time}`) < new Date()) return showNote("#bkNote", "Please choose a later date or time.");

  const service = serviceLabel();
  const dateText = fmtDate(date);
  const timeText = fmtTime(time);

  /* Message to the studio. WhatsApp opens with the booking filled in. */
  const studioText = [
    `*New booking - ${BUSINESS}*`,
    `Client: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Date: ${dateText}`,
    `Time: ${timeText}`,
  ].join("\n");

  const link = waLink(studioText);
  window.open(link, "_blank", "noopener");

  /* Optional WhatsApp Business API alert: a server sends it to the client and the studio */
  if (BOOKING_API_URL) {
    fetch(BOOKING_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business: BUSINESS,
        studioWhatsApp: WA_NUMBER,
        client: { name, phone },
        booking: { service, date, time },
        studioMessage: studioText,
        clientMessage: `${THANK_YOU}! Hi ${name}, we have received your booking for ${service} on ${dateText} at ${timeText}. We will confirm shortly.`,
      }),
      keepalive: true,
    }).catch(() => {});
  }

  $("#bkDoneText").textContent = `${service} · ${dateText} at ${timeText}`;
  $("#bkResend").href = link;
  showStep("done");
};

$("#bkDoneClose").onclick = closeBook;
$("#bookClose").onclick = closeBook;
bookModal.onclick = (e) => {
  if (e.target === bookModal) closeBook();
};

/* Every "Book Your Look" button opens the flow */
["bookBtn", "bookBtnHero", "bookBtnGallery", "bookBtnThanks"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.onclick = (e) => {
      e.preventDefault();
      openBook();
    };
  }
});

/* ---------- Certificate lightbox ---------- */
const lightbox = $("#lightbox");

const openCert = () => {
  $("#lbImg").src = $("#certImg").src;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
};

const closeCert = () => {
  lightbox.hidden = true;
  document.body.style.overflow = "";
};

$("#certOpen").onclick = openCert;
$("#certBtn").onclick = openCert;
$("#lbClose").onclick = closeCert;
lightbox.onclick = (e) => {
  if (e.target === lightbox) closeCert();
};

/* ---------- Hero slideshow timer ---------- */
const slides = document.querySelectorAll("#sl .ph");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("on");
  current = (current + 1) % slides.length;
  slides[current].classList.add("on");
}, 5000);

/* ---------- Header & mobile menu ---------- */
const header = $("header");
const nav = $("#nv");
const menuBtn = $("#mb");

const setMenuOpen = (open) => {
  nav.classList.toggle("open", open);
  menuBtn.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
};

addEventListener("scroll", () => header.classList.toggle("sc", scrollY > 40));
menuBtn.onclick = () => setMenuOpen(!nav.classList.contains("open"));
nav.onclick = (e) => {
  if (e.target.closest("a")) setMenuOpen(false);
};

/* Escape closes whichever overlay or mobile menu is open */
addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!lightbox.hidden) closeCert();
  else if (!bookModal.hidden) closeBook();
  else if (nav.classList.contains("open")) setMenuOpen(false);
});

/* ---------- Back to top ----------
   Appears after scrolling down. The ring fills as the page is read. */
const toTop = $("#toTop");
const ttBar = $("#ttBar");
const RING_LENGTH = 2 * Math.PI * 24; /* circumference of the ring (radius 24) */

ttBar.style.strokeDasharray = RING_LENGTH;

const updateToTop = () => {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  const progress = scrollable > 0 ? Math.min(scrollY / scrollable, 1) : 0;
  toTop.classList.toggle("show", scrollY > 400);
  ttBar.style.strokeDashoffset = RING_LENGTH * (1 - progress);
};

addEventListener("scroll", updateToTop, { passive: true });
toTop.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
updateToTop();

/* ---------- Feedback form: star rating ---------- */
const starButtons = document.querySelectorAll("#rate button");
let rating = 5;

const paintStars = () =>
  starButtons.forEach((b) => b.classList.toggle("on", Number(b.dataset.v) <= rating));

starButtons.forEach((b) => {
  b.onclick = () => {
    rating = Number(b.dataset.v);
    paintStars();
  };
});
paintStars();

/* ---------- Feedback form: post the review on the website ---------- */
$("#fb").onsubmit = (e) => {
  e.preventDefault();

  const name = $("#fn").value.trim() || "Anonymous";
  const text = $("#fm").value.trim();

  if (!text) {
    return showNote("#fnote", "Please write your experience before posting.");
  }

  reviews = [{ name, text, rating }, ...reviews];
  renderReviews(true);

  /* Clear the form and put the stars back to 5 */
  e.target.reset();
  rating = 5;
  paintStars();
  showNote("#fnote", "Thank You For Your Value Feedback");
};

/* ---------- Contact form: send via WhatsApp ---------- */
$("#cf").onsubmit = (e) => {
  e.preventDefault();

  const name = $("#cn").value.trim();
  const phone = $("#cp").value.trim();
  const message = $("#cm").value.trim();

  if (!name || !message || !validPhone(phone)) {
    return showNote("#cnote", "Please enter your name, a valid phone number and a message.");
  }

  showNote("#cnote", "Thanks For Contact Rathi Bridal Artist");
  window.open(waLink(`Hi Rathi, I'm ${name}. Phone: ${phone}. ${message}`), "_blank", "noopener");
};

/* ---------- Service pages (hash routing) ---------- */
function renderPage(key) {
  const page = PAGES[key];

  /* Each card shows its own uploaded photo. Tapping a card opens the booking step for that service. */
  const groups = page.groups
    .map(
      (g) => `
        <h3 class="gt">${g.icon} ${esc(g.title)}</h3>
        <div class="igrid">
          ${g.items
            .map(
              (item, i) => `
            <button class="ic ph rv" type="button" data-book="${key}:${item.id}" style="--d:${(i % 4) * 0.08}s">
              <img loading="lazy" src="${item.img}" alt="${esc(item.name)}">
              <b>${esc(item.name)}</b>
            </button>`
            )
            .join("")}
        </div>`
    )
    .join("");

  $("#pg").innerHTML = `
    <div class="wrap">
      <div class="back"><a href="#services" class="btn lt">← Back</a></div>
      <span class="tag">${page.sub}</span>
      <h2>${page.title}</h2>
      ${page.intro || ""}
      ${groups}
      <button class="btn" type="button" data-book-cat="${key}">Book Your Look →</button>
    </div>`;
}

$("#pg").onclick = (e) => {
  const card = e.target.closest("[data-book]");
  if (card) {
    const [cat, idx] = card.dataset.book.split(":");
    return openBook({ cat, idx: Number(idx) });
  }
  const btn = e.target.closest("[data-book-cat]");
  if (btn) openBook({ cat: btn.dataset.bookCat });
};

/* Hide any image that fails to load */
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") e.target.style.display = "none";
  },
  true
);

/* ---------- Scroll reveal ---------- */
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 }
);

const reveal = () => document.querySelectorAll(".rv:not(.in)").forEach((el) => observer.observe(el));

function route() {
  const hash = location.hash.slice(1);
  const page = Object.hasOwn(PAGES, hash) ? PAGES[hash] : null;
  const target = hash && document.getElementById(hash);

  setMenuOpen(false);
  $("#main").hidden = Boolean(page);
  $("#pg").hidden = !page;

  if (page) {
    renderPage(hash);
    scrollTo(0, 0);
  } else if (target) {
    setTimeout(() => target.scrollIntoView(), 40);
  } else {
    scrollTo(0, 0);
  }

  setTimeout(reveal, 60);
}

addEventListener("hashchange", route);
route();