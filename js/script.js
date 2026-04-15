const navToggle = document.querySelector(".nav-toggle");
const navGroups = document.querySelectorAll(".nav-group");
const navAnchors = document.querySelectorAll(".nav-group a");
const revealItems = document.querySelectorAll("[data-reveal]");
const yearTargets = document.querySelectorAll("[data-year]");
const contactForm = document.querySelector("#contact-form");
const contactSuccess = document.querySelector("#contact-success");
const hiddenFrame = document.querySelector("#hidden_iframe");

const setActiveLink = () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navAnchors.forEach((link) => {
        const targetPage = link.getAttribute("href");
        link.classList.toggle("active", targetPage === currentPage);
    });
};

const openMenu = () => {
    if (!navToggle) {
        return;
    }

    navToggle.setAttribute("aria-expanded", "true");
    navGroups.forEach((group) => group.classList.add("is-open"));
    document.body.classList.add("menu-open");
};

const closeMenu = () => {
    if (!navToggle) {
        return;
    }

    navToggle.setAttribute("aria-expanded", "false");
    navGroups.forEach((group) => group.classList.remove("is-open"));
    document.body.classList.remove("menu-open");
};

const toggleMenu = () => {
    const isExpanded = navToggle?.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
        closeMenu();
    } else {
        openMenu();
    }
};

const setupRevealAnimations = () => {
    if (!revealItems.length) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -40px 0px"
    });

    revealItems.forEach((item) => {
        observer.observe(item);
    });
};

const setupContactForm = () => {
    if (!contactForm || !contactSuccess || !hiddenFrame) {
        return;
    }

    let isSubmitting = false;

    contactForm.addEventListener("submit", () => {
        isSubmitting = true;
    });

    hiddenFrame.addEventListener("load", () => {
        if (!isSubmitting) {
            return;
        }

        isSubmitting = false;
        contactForm.reset();
        contactForm.hidden = true;
        contactSuccess.hidden = false;
        contactSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    });
};

yearTargets.forEach((item) => {
    item.textContent = new Date().getFullYear();
});

setActiveLink();
setupRevealAnimations();
setupContactForm();

if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
}

navAnchors.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});
