document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a.add-utm-to-link');

    if (!links.length) return;

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = new URLSearchParams();

    for (const [key, value] of urlParams.entries()) {
        if (key.startsWith('utm_')) {
            utmParams.append(key, value);
        }
    }

    if (![...utmParams].length) return;

    links.forEach(link => {
        try {
            if (!link.href.startsWith('http')) return;

            const url = new URL(link.href);

            utmParams.forEach((value, key) => {
                if (!url.searchParams.has(key)) {
                    url.searchParams.append(key, value);
                }
            });

            link.href = url.toString();
        } catch (e) {
            console.warn('Wrong href:', link.href);
        }
    });
});