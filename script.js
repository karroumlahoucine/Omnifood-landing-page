"use script";

// Make mobile navigation work

const btnNavEL = document.querySelector(".btn-mobile");
const headerEl = document.querySelector(".header");

btnNavEL.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// ------------------------------------------------------------
function animateElements() {
  const elements = document.querySelectorAll(".step-text-box, .step-img-box");
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const isVisible = elementTop < window.innerHeight && elementBottom >= 0;

    if (isVisible) {
      element.classList.add("animate");
    } else {
      element.classList.remove("animate");
    }
  });
}

window.addEventListener("scroll", animateElements);

// -----------------------------------------------------------------------------
//SMOTH SCROLL ANIMATION #SAFARI
// -----------------------------------------------------------------------------
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    headerEl.classList.remove("nav-open");
    const href = link.getAttribute("href");
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const section = document.querySelector(href);
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// -----------------------------------------------------------------------------
//sticky navigation
// -----------------------------------------------------------------------------

const sectionHero = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

obs.observe(sectionHero);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
