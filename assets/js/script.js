// Preloader
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const letters = document.getElementsByClassName("cls-1");

    if (preloader) {
        setTimeout(() => {
            Array.from(letters).forEach((letter) => {
                letter.style.fill = 'rgba(48, 48, 48, 1)';
                letter.style.transition = '0.7s';
            });
        }, "1500");
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            preloader.style.transition = '0.5s';
        }, "3000");
    }
});

// Select2 Initialization
$(document).ready(function() {
    $(".sorting_select").select2({
        placeholder: "ترتيب حسب...",
        dir: "rtl",
        minimumResultsForSearch: Infinity
    });
})

// Owl Carousels
$('.categories_carousel').owlCarousel({
    rtl: true,
    loop: true,
    margin: 50,
    nav: true,
    dots: false,
    navText: [
        '<i class="material-icons">east</i>',
        '<i class="material-icons">west</i>'
    ],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})

$('.products_carousel').owlCarousel({
    rtl: true,
    loop: true,
    margin: 50,
    nav: true,
    dots: false,
    navText: [
        '<i class="material-icons">east</i>',
        '<i class="material-icons">west</i>'
    ],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})

// Price Slider Filter
const priceSlider = document.getElementById('price-slider');
const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');

if (priceSlider) {
    noUiSlider.create(priceSlider, {
        start: [100, 900],
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        },
        direction: 'rtl',
        step: 10,
        tooltips: false,
        format: {
            to: value => Math.round(value),
            from: value => Number(value)
        }
    });

    const slider = priceSlider.noUiSlider;
    slider.on('update', (values, handle) => {
        const value = Math.round(values[handle]);
        if (handle === 0) minInput.value = value;
        else maxInput.value = value;
    });

    minInput.addEventListener('change', () => {
        slider.set([minInput.value, null]);
    });
    maxInput.addEventListener('change', () => {
        slider.set([null, maxInput.value]);
    });
}

// Gallery
var bigImg = document.querySelector(".big_image img");
var thumbImg = document.querySelectorAll('.thumb_image img');

for (var i = 0; i < thumbImg.length; i++) {
    thumbImg[i].addEventListener("click", function() {
        let thumbImgAtt = this.getAttribute("src");
        bigImg.setAttribute('src', thumbImgAtt);
    });
}



// Product Quantity
const increaseBtn = document.querySelectorAll(".increase_btn")
const decreaseBtn = document.querySelectorAll(".decrease_btn")

for (var i = 0; i < increaseBtn.length; i++) {
    increaseBtn[i].addEventListener("click", function() {
        var quantity = this.closest('.product_quantity').querySelector(".product_quantity_value");
        quantity.value = parseInt(quantity.value) + 1;

        if (this.closest('tr')) { calcCart() }
    });
    decreaseBtn[i].addEventListener("click", function() {
        var quantity = this.closest('.product_quantity').querySelector(".product_quantity_value");

        if (quantity.value > 1) {
            quantity.value = parseInt(quantity.value) - 1;
        }

        if (this.closest('tr')) { calcCart() }
    });
}

// car Calculations
function calcCart() {
    var products = document.querySelectorAll('.product_row');
    var cartTotal = 0;
    var shipping = parseInt(document.getElementById('shipping').dataset.price);

    products.forEach(product => {
        const quantity = parseInt(product.querySelector('.product_quantity_value').value)
        const piecePrice = parseInt(product.querySelector('.piece_price').dataset.price);
        const totalPrice = quantity * piecePrice;

        product.querySelector('.total_pieces_price').innerHTML = totalPrice;
        cartTotal += totalPrice;
    })

    document.getElementById('cart_total').innerText = cartTotal;
    document.getElementById('sub_total').innerText = cartTotal + shipping;
};
window.addEventListener('load', calcCart)

// Checkout Form
let currentStep = 0;
const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const homeBtn = document.getElementById("homeBtn");
const progress = document.querySelector(".progress");
const summaryText = document.getElementById("summaryText");
const stepsTitles = document.querySelectorAll(".progress_title");

function showStep(index) {
    stepsTitles.forEach((steptitle, i) => steptitle.classList.toggle("active", i <= index));
    steps.forEach((step, i) => step.classList.toggle("active", i === index));
    prevBtn.style.display = index > 0 ? "block" : "none";
    nextBtn.textContent = index === steps.length - 2 ? "تاكيد الطلب" : "التالي";
    progress.style.width = `${((index) / (steps.length - 1)) * 100}%`;
    if (index === steps.length - 1) {
        homeBtn.style.display = "block"
        nextBtn.style.display = "none"
        prevBtn.style.display = "none"
    }
}

function saveProgress() {
    localStorage.setItem("formStep", currentStep);
}

function loadProgress() {
    const savedStep = localStorage.getItem("formStep");
    if (savedStep) {
        currentStep = parseInt(savedStep);
        showStep(currentStep);
    }
}

nextBtn.addEventListener("click", () => {
    if (!validateStep()) return;
    if (currentStep < steps.length - 2) {
        currentStep++;
        saveProgress();
        showStep(currentStep);
    } else {
        currentStep++;
        alert("Form submitted!");
        document.querySelector(".steps_wrapper span").style.color =

            showStep(currentStep);
        localStorage.removeItem("formStep");
    }
});

prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        saveProgress();
        showStep(currentStep);
    }
});

function validateStep() {
    let isValid = true;
    if (currentStep === 1) {
        document.querySelector(".steps_wrapper").querySelector("span").style.color = 'rgba(195, 166, 115, 1)';
    }
    return isValid;
}
window.onload = loadProgress;