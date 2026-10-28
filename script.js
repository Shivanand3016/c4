document.addEventListener("DOMContentLoaded", function () {

```
// CURRENT YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();


// NAVIGATION SHADOW ON SCROLL
const navbar = document.getElementById("navbar");

function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();


// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";

});

navLinks.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";

    });

});


// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries, currentObserver) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    currentObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {

        observer.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


// MINIMUM APPOINTMENT DATE: TODAY
const dateInput = document.getElementById("appointmentDate");

function formatLocalDate(date) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;

}

const today = new Date();

dateInput.min = formatLocalDate(today);


// SHOW A SMALL NOTIFICATION
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}


// DOCTOR PROFILE -> APPOINTMENT FORM
const doctorButtons = document.querySelectorAll(".doctor-book");
const doctorSelect = document.getElementById("doctor");

doctorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const doctorName = button.dataset.doctor;

        doctorSelect.value = doctorName;

        document.getElementById("appointment").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        showToast(doctorName + " selected for your demo request.");

    });

});


// APPOINTMENT FORM
const appointmentForm = document.getElementById("appointmentForm");
const successMessage = document.getElementById("successMessage");
const resetForm = document.getElementById("resetForm");

appointmentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!appointmentForm.reportValidity()) {
        return;
    }

    // This is a front-end demo only.
    // No patient data is stored or transmitted.

    appointmentForm.hidden = true;
    successMessage.hidden = false;

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// RESET THE DEMO FORM
resetForm.addEventListener("click", function () {

    appointmentForm.reset();

    dateInput.min = formatLocalDate(new Date());

    appointmentForm.hidden = false;
    successMessage.hidden = true;

    showToast("The demo form is ready for another request.");

});
```

});
