
//   nav-collapse
// document.getElementById("customMenuToggle").addEventListener("click", function () {
//     document.getElementById("customNavbarLinks").classList.toggle("active");
// });

document.addEventListener("DOMContentLoaded", function () {

    const navbarLinks = document.querySelector("#customNavbarLinks");
    const menuToggle = document.querySelector("#customMenuToggle");
    const animatedElements = document.querySelectorAll(".fading-in");


    function closeNavbarOnScroll() {
        if (navbarLinks.classList.contains("active")) {
            navbarLinks.classList.remove("active");
        }
    }

    menuToggle.addEventListener("click", function () {
        navbarLinks.classList.toggle("active");
    });


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", closeNavbarOnScroll);
});

function showTable(event, tableId) {
    event.preventDefault();
    document.querySelectorAll('.table-container').forEach(table => table.classList.remove('active'));
    document.getElementById(tableId).classList.add('active');
    document.querySelectorAll('.tab-menu button').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
}

// carousel indicators change 
document.addEventListener("DOMContentLoaded", function () {


    let carouselCnt = document.querySelectorAll(".carousel");

    carouselCnt.forEach((carousel) => {
        carousel.setAttribute('data-bs-ride', 'carousel');
    })


    let carPrevbutton = document.querySelectorAll('.carousel-control-prev-icon');
    let carNextbutton = document.querySelectorAll('  .carousel-control-next-icon');

    for (let i = 0; i < carNextbutton.length; i++) {
        carNextbutton[i].style.width = '3rem';
        carPrevbutton[i].style.width = '3rem';
        carNextbutton[i].style.height = '3rem';
        carPrevbutton[i].style.height = '3rem';
    }


    let carouselIndicatorButtons = document.querySelectorAll(".carousel-indicators button");
    let carouselIndicator = document.querySelectorAll('.carousel-indicators');

    carouselIndicator.forEach((indicator) => {

        indicator.style.backgroundColor = '#ffff';
        indicator.style.width = 'fit-content';
        indicator.classList.add('mx-auto');
        indicator.style.borderRadius = '1vw';


    })
    carouselIndicatorButtons.forEach((btn) => {

        btn.style.borderTop = '5px solid transparent';
        btn.style.borderBottom = '5px solid transparent';

        btn.classList.add("rounded-circle");
        btn.classList.add("firstIndicator");
        btn.style.backgroundColor = "#5e3b9d";
        btn.style.width = "1vw";
        btn.style.height = "1vw";



    });


});


// Layout carousel functionality

let layoutIndex = 0;
let layoutCards = '';
let isLayoutTransitioning = false;
let layoutPlanTowerA = document.getElementById('towerA-plan-cnt');
let layoutPlanTowerB = document.getElementById('towerB-plan-cnt');
let defaultElment = layoutPlanTowerA;



function showLayoutSlide(element, index, smooth = true) {

    let currentPlanSlider = element.querySelector('.carousel-wrapper .carousel');

    let totalPlans = element.querySelectorAll(`#${element.id} .carousel .img-plan-cnt`).length;

    totalPlans = totalPlans / 3;


    if (isLayoutTransitioning) return;
    const visibleCards = getVisibleCards();
    // console.log(visibleCards);

    // Calculate the translation considering the cloned cards
    let translateX = -(index + totalPlans) * (100 / visibleCards);


    if (!smooth) {
        currentPlanSlider.style.transition = 'none';
    } else {
        currentPlanSlider.style.transition = 'transform 0.5s ease';
    }

    currentPlanSlider.style.transform = `translateX(${translateX}%)`;

    layoutIndex = index;

    if (smooth) {
        isLayoutTransitioning = true;
        setTimeout(() => {
            isLayoutTransitioning = false;

            if (index >= totalPlans) {
                showLayoutSlide(element, 0, false);
            } else if (index < 0) {
                showLayoutSlide(element, totalPlans - 1, false);
            }
        }, 500);
    }
}

function prevLayoutSlide(element) {
    const currentTabId = element.id.includes('c1') ? 'towerA-plan-cnt' : 'towerB-plan-cnt';
    const currentPlanElement = document.querySelector(`#${currentTabId}`);

    if (!isLayoutTransitioning) {
        showLayoutSlide(currentPlanElement, layoutIndex - 1);
    }
}

function nextLayoutSlide(element) {

    const currentTabId = element.id.includes('c1') ? 'towerA-plan-cnt' : 'towerB-plan-cnt';
    const currentPlanElement = document.querySelector(`#${currentTabId}`);
    // console.log(element , currentTabId , currentPlanElement);
    if (!isLayoutTransitioning) {
        showLayoutSlide(currentPlanElement, layoutIndex + 1);
    }
}

function cloneLayoutSlide(ele) {
    let updatedCarousel = '';
    if (ele.id == "towerA-plan-cnt") {
        layoutCards = ele.querySelectorAll('#carousel1 .img-plan-cnt');

    } else if (ele.id == "towerB-plan-cnt") {
        layoutCards = ele.querySelectorAll('#carousel2 .img-plan-cnt')
    }
    updatedCarousel = ele.querySelector('.carousel');
    layoutCards.forEach(card => {
        const clone = card.cloneNode(true);
        updatedCarousel.appendChild(clone);
    });
    layoutCards.forEach(card => {
        const clone = card.cloneNode(true);
        updatedCarousel.insertBefore(clone, updatedCarousel.firstChild);
    });
}
cloneLayoutSlide(layoutPlanTowerA);
cloneLayoutSlide(layoutPlanTowerB);

function switchTab(element) {
    document.querySelectorAll('.tab-links button').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    const planCont = document.querySelectorAll('div .layout-plan');

    if (element.id === "towerA-btn") {
        planCont[0].style.display = "flex";
        planCont[1].style.display = "none";
        planCont[2].style.display = "none";
        showLayoutSlide(planCont[0], 0, false);
        defaultElment = planCont[0];

    } else if (element.id === "towerB-btn") {
        planCont[0].style.display = "none";
        planCont[1].style.display = "flex";
        planCont[2].style.display = "none";
        showLayoutSlide(planCont[1], 0, false);
        defaultElment = planCont[1];
    } else if (element.id === "mas-plan-btn") {
        planCont[0].style.display = "none";
        planCont[1].style.display = "none";
        planCont[2].style.display = "flex";
    }
}




function autoTriggerButtonClick() {
    let buttonToTrigger = defaultElment.querySelectorAll('.carousel-btn');
    console.log(buttonToTrigger[1].id);
    nextLayoutSlide(buttonToTrigger[1]);


}
window.setInterval(autoTriggerButtonClick(), 1000);
// setInterval(autoTriggerButtonClick(), 100);

document.addEventListener('DOMContentLoaded', () => {
    // initializeLayoutCarousels();
    const ele = document.getElementById("towerA-btn");
    switchTab(ele);


});

// Partners carousel functionality
let partnersIndex = 0;
const partnersCarousel = document.querySelector('.partners-carousel');
const partnerCards = document.querySelectorAll('.partner-card');
const totalPartners = partnerCards.length;
let isTransitioning = false;

function getVisibleCards() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function cloneCards() {
    // Clone first and last cards for smooth infinite scroll
    partnerCards.forEach(card => {
        const clone = card.cloneNode(true);
        partnersCarousel.appendChild(clone);
    });
    partnerCards.forEach(card => {
        const clone = card.cloneNode(true);
        partnersCarousel.insertBefore(clone, partnersCarousel.firstChild);
    });
}

function showPartners(index, smooth = true) {
    if (isTransitioning) return;
    const visibleCards = getVisibleCards();

    // Calculate the translation considering the cloned cards
    let translateX = -(index + totalPartners) * (100 / visibleCards);

    if (!smooth) {
        partnersCarousel.style.transition = 'none';
    } else {
        partnersCarousel.style.transition = 'transform 0.5s ease';
    }

    partnersCarousel.style.transform = `translateX(${translateX}%)`;

    partnersIndex = index;

    if (smooth) {
        isTransitioning = true;
        setTimeout(() => {
            isTransitioning = false;

            if (index >= totalPartners) {
                showPartners(0, false);
            } else if (index < 0) {
                showPartners(totalPartners - 1, false);
            }
        }, 500);
    }
}

function prevPartners() {
    if (!isTransitioning) {
        showPartners(partnersIndex - 1);
    }
}

function nextPartners() {
    if (!isTransitioning) {
        showPartners(partnersIndex + 1);
    }
}

// Initialize partners carousel
cloneCards();
showPartners(0, false);

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        showPartners(partnersIndex, false);
        showLayoutSlide(defaultElment, layoutIndex, false);
    }, 250);
});

// Add transition end listener
partnersCarousel.addEventListener('transitionend', () => {
    isTransitioning = false;
});

