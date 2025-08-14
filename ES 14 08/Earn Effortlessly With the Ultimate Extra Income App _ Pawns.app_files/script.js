const initRecentPayoutsSwiper = () => {
    const recentPayoutsContainer = document.querySelector(".recent-payouts__list");

    if (!recentPayoutsContainer) {
        return;
    }

    const recentPayoutsSwiper = new Swiper(recentPayoutsContainer, {
        direction: "vertical",
        slidesPerView: 5,
        spaceBetween: 12,
        a11y: false,
        allowTouchMove: true,
        mousewheel: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
    });

    recentPayoutsSwiper.autoplay.stop();

    new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            observer.disconnect();
            recentPayoutsSwiper.autoplay.start();
        } else {
            recentPayoutsSwiper.autoplay.stop();
        }
    }).observe(recentPayoutsContainer);
}

const initRecentPayoutsHorizontalSwiper = () => {
    const recentPayoutsContainer = document.querySelector(".section__recent-payouts-horizontal");

    if (!recentPayoutsContainer) {
        return;
    }

    const recentPayoutsSwiper = new Swiper(recentPayoutsContainer, {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 12,
        a11y: false,
        allowTouchMove: true,
        mousewheel: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
            1280: {
                slidesPerView: 5,
            }
        }
    });
}


let sdkMonetizeSwiper = null;

const initSdkMonetizeSwiper = () => {
    const sdkMonetizeContainer = document.querySelector(".sdk-monetize-swiper");

    if (!sdkMonetizeContainer) return;

    const destroySwiperIfExists = () => {
        if (sdkMonetizeSwiper) {
            sdkMonetizeSwiper.destroy(true, true);
            sdkMonetizeSwiper = null;
        }
    };

    const handleSwiperInit = () => {
        const viewport = window.innerWidth;

        if (viewport >= 1110) {
            destroySwiperIfExists();
            return;
        }

        if (!sdkMonetizeSwiper) {
            sdkMonetizeSwiper = new Swiper(sdkMonetizeContainer, {
                loop: false,
                slidesPerView: 1.3,
                spaceBetween: 12,
                a11y: false,
                allowTouchMove: true,
                mousewheel: true,
                breakpoints: {
                    600: {
                        slidesPerView: 2.3,
                    }
                }
            });
        }
    };

    handleSwiperInit();

    window.addEventListener("resize", () => {
        handleSwiperInit();
    });
};

let sdkMonetizeTwoSwiper = null;

const initSdkMonetizeTwoSwiper = () => {
    const sdkMonetizeTwoContainer = document.querySelector(".sdk-monetizetwo-swiper");

    if (!sdkMonetizeTwoContainer) return;

    const destroySwiperIfExists = () => {
        if (sdkMonetizeTwoSwiper) {
            sdkMonetizeTwoSwiper.destroy(true, true);
            sdkMonetizeTwoSwiper = null;
        }
    };

    const handleSwiperInit = () => {
        const viewport = window.innerWidth;

        if (viewport >= 1110) {
            destroySwiperIfExists();
            return;
        }

        if (!sdkMonetizeTwoSwiper) {
            sdkMonetizeTwoSwiper = new Swiper(sdkMonetizeTwoContainer, {
                loop: false,
                slidesPerView: 1.3,
                spaceBetween: 12,
                a11y: false,
                allowTouchMove: true,
                mousewheel: true,
                breakpoints: {
                    600: {
                        slidesPerView: 2.3,
                    }
                }
            });
        }
    };

    handleSwiperInit();

    window.addEventListener("resize", () => {
        handleSwiperInit();
    });
};

const initPayoutsInSwiper = () => {
    const payoutsInContainer = document.querySelector(".section__payouts-in-shortcode");

    if (!payoutsInContainer) {
        return;
    }

    const PayoutsInSwiper = new Swiper(payoutsInContainer, {
        loop: true,
        speed: 3000,
        spaceBetween: 20,
        slidesPerView: "auto",
        allowTouchMove: true,
        mousewheel: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        freeMode: true,
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 5,
            },
            1280: {
                slidesPerView: 5,
            }
        }
    });
}

const initEarningsCalculator = () => {

    if (typeof window.calculatorData !== 'undefined') {
        const link = document.querySelector('.calculator-signup-link a');
        const singularLink = document.querySelector('.calculator-singular-link a');
        const isMobileOrTablet = window.innerWidth <= 1024;

        if (link) {
            link.setAttribute('href', window.calculatorData.universalLink);

            if (isMobileOrTablet) {
                link.textContent = window.calculatorData.installAppText;
            }
        }

        if(singularLink){
            if (isMobileOrTablet) {
                singularLink.textContent = window.calculatorData.installAppText;
            }
        }
        
    }


    const earningsCalculator = document.getElementById('earnings-calculator');
    const earningsResults = document.getElementById('earnings-results');

    if (!earningsCalculator || !earningsResults) return;

    const calculateEarnings = () => {
        let total = 0;

        // SDK Revenue page
        if (earningsCalculator.classList.contains('sdk-revenue')) {
            const sdkValue = parseInt(
                earningsCalculator.querySelector('#sdk-revenue-slider')?.getAttribute('data-step-value') || 0
            );
            total = sdkValue * 10 * 0.02;

        // Surveys/Games/Bandwidth calculator
        } else {
            const surveyStep = parseInt(
                earningsCalculator.querySelector('#surveys-amount-slider')?.getAttribute('data-step-value') || 0
            );
            const gameStep = parseInt(
                earningsCalculator.querySelector('#surveys-days-slider')?.getAttribute('data-step-value') || 0
            );

            const surveyResult = surveyStep * 1 * 500;
            const gameResult = gameStep * 3 * 500;

            let bandwidthBonus = 0;
            const bandwidthBtn = earningsCalculator.querySelector('.bandwidth-choice.active');
            if (bandwidthBtn && bandwidthBtn.getAttribute('data-value') === 'yes') {
                bandwidthBonus = 46.5;
            }

            total = surveyResult + gameResult + bandwidthBonus;
        }

        earningsResults.textContent = earningsCalculator.classList.contains('sdk-revenue')
            ? total.toFixed(0)
            : total.toFixed(2);
    };

    const sliders = document.querySelectorAll("input[type='range'][data-steps-source]");
    sliders.forEach(slider => {
        const source = slider.getAttribute("data-steps-source");
        const stepsContainer = document.getElementById(source);
        if (!stepsContainer) return;

        const steps = Array.from(stepsContainer.children);
        slider.steps = 1;
        slider.max = steps.length - 1;

        const onSliderValueChange = () => {
            const value = parseInt(slider.value);
            const step = steps[value];

            steps.forEach(s => s.toggleAttribute("data-selected", false));
            if (step) step.toggleAttribute("data-selected", true);

            slider.setAttribute("data-step-value", step?.textContent || "0");

            calculateEarnings();
        };

        slider.addEventListener("input", onSliderValueChange);
        slider.dispatchEvent(new Event("input"));
    });

    const bandwidthBtns = earningsCalculator.querySelectorAll('.bandwidth-choice');
    bandwidthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bandwidthBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            calculateEarnings();
        });
    });

    calculateEarnings();
};


/* TODO: Rename after SDK redesign */

const initNewSlidersProgressTrackStyling = () => {
    const sliders = document.querySelectorAll(".new-range-slider");

    const updateStyling = (slider) => {
        const value = slider.value;
        const max = slider.getAttribute("max") || 10;
        const percent = (value / max) * 100;

        slider.style.setProperty("--track-fill", `${percent}%`);
    };

    sliders.forEach((slider) => {
        slider.addEventListener("input", () => updateStyling(slider));

        setTimeout(() => updateStyling(slider), 100);
    });
};

let GiftCardsXboxSwiper = null;

const initGiftCardsXboxSwiper = () => {
    const GiftCardsXboxSwiperContainer = document.querySelector(".giftcards-xbox-swiper");

    if (!GiftCardsXboxSwiperContainer) return;

    const equalizeSlideHeights = () => {
        const slides = GiftCardsXboxSwiperContainer.querySelectorAll('.swiper-slide');
        let maxHeight = 0;

        slides.forEach(slide => {
            slide.style.height = 'auto';
            const height = slide.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });

        slides.forEach(slide => {
            slide.style.height = maxHeight + 'px';
        });
    };

    const handleSwiperInit = () => {
        const viewport = window.innerWidth;

        const swiperOptions = {
            loop: false,
            slidesPerView: 1.2,
            spaceBetween: 12,
            a11y: false,
            mousewheel: false,
            breakpoints: {
                600: {
                    slidesPerView: 1.8,
                }
            },
            allowTouchMove: viewport < 1110,
            simulateTouch: viewport < 1110,
            on: {
                init: equalizeSlideHeights,
                resize: equalizeSlideHeights,
            }
        };

        if (GiftCardsXboxSwiper) {
            GiftCardsXboxSwiper.allowTouchMove = viewport < 1110;
            GiftCardsXboxSwiper.simulateTouch = viewport < 1110;
            equalizeSlideHeights();
        } else {
            GiftCardsXboxSwiper = new Swiper(GiftCardsXboxSwiperContainer, swiperOptions);
        }
    };

    handleSwiperInit();

    window.addEventListener("resize", () => {
        handleSwiperInit();
    });
};

let GiftCardsHowWorkSwiper = null;

const initGiftCardsHowWork = () => {
    const GiftCardsHowWorkContainer = document.querySelector(".giftcards-how-work-swiper");

    if (!GiftCardsHowWorkContainer) return;

    const equalizeSlideHeights = () => {
        const slides = GiftCardsHowWorkContainer.querySelectorAll('.swiper-slide');
        let maxHeight = 0;

        slides.forEach(slide => {
            slide.style.height = 'auto';
            const height = slide.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });

        slides.forEach(slide => {
            slide.style.height = maxHeight + 'px';
        });
    };

    const handleSwiperInit = () => {
        const viewport = window.innerWidth;

        const swiperOptions = {
            loop: false,
            slidesPerView: 1.2,
            spaceBetween: 12,
            a11y: false,
            mousewheel: false,
            breakpoints: {
                600: {
                    slidesPerView: 1.8,
                }
            },
            on: {
                init: equalizeSlideHeights,
                resize: equalizeSlideHeights,
            }
        };

        if (GiftCardsHowWorkSwiper) {
            GiftCardsHowWorkSwiper.allowTouchMove = viewport < 1110;
            GiftCardsHowWorkSwiper.simulateTouch = viewport < 1110;
        } else {
            swiperOptions.allowTouchMove = viewport < 1110;
            swiperOptions.simulateTouch = viewport < 1110;
            GiftCardsHowWorkSwiper = new Swiper(GiftCardsHowWorkContainer, swiperOptions);
        }
    };

    handleSwiperInit();

    window.addEventListener("resize", () => {
        handleSwiperInit();
    });
};

let GiftCardsDoordashSwiper = null;

const initGiftCardsDoordashSwiper = () => {
    const GiftCardsDoordashContainer = document.querySelector(".giftcards-help-doordash-swiper");

    if (!GiftCardsDoordashContainer) return;

    const equalizeSlideHeights = () => {
        const slides = GiftCardsDoordashContainer.querySelectorAll('.swiper-slide');
        let maxHeight = 0;

        slides.forEach(slide => {
            slide.style.height = 'auto';
            const height = slide.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });

        slides.forEach(slide => {
            slide.style.height = maxHeight + 'px';
        });
    };

    const handleSwiperInit = () => {
        const viewport = window.innerWidth;

        const swiperOptions = {
            loop: false,
            slidesPerView: 1.3,
            spaceBetween: 12,
            a11y: false,
            mousewheel: false,
            breakpoints: {
                600: {
                    slidesPerView: 1.8,
                }
            },
            allowTouchMove: viewport < 1110,
            simulateTouch: viewport < 1110,
            on: {
                init: equalizeSlideHeights,
                resize: equalizeSlideHeights,
            }
        };

        if (GiftCardsDoordashSwiper) {
            GiftCardsDoordashSwiper.allowTouchMove = viewport < 1110;
            GiftCardsDoordashSwiper.simulateTouch = viewport < 1110;

            equalizeSlideHeights();
        } else {
            GiftCardsDoordashSwiper = new Swiper(GiftCardsDoordashContainer, swiperOptions);
        }
    };

    handleSwiperInit();

    window.addEventListener("resize", handleSwiperInit);
};


document.addEventListener('DOMContentLoaded', function () {
    initRecentPayoutsSwiper();
    initSdkMonetizeSwiper();
    initSdkMonetizeTwoSwiper();
    initRecentPayoutsHorizontalSwiper();
    initPayoutsInSwiper();
    initEarningsCalculator();
    initNewSlidersProgressTrackStyling();
    initGiftCardsXboxSwiper();
    initGiftCardsHowWork();
    initGiftCardsDoordashSwiper();
});
