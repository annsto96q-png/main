window.addEventListener('pawns-growthbook-loaded', async event => {
    const qrCodeWrapper = document.getElementById(
        event.detail.isOn('mktg-web-qr-widget') ? 'floating-qr' : 'download-wrapper'
    );

    qrCodeWrapper.classList.remove('hidden');

    const qrCodeElement = qrCodeWrapper.querySelector('#qrcode');
    const isMobile = qrCodeWrapper.classList.contains('mobile');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition < 400 && isMobile) {
            hideQrCodeWrapper();
        } else {
            showQrCodeWrapper();
        }

        if ((windowHeight + scrollPosition) >= (documentHeight - 20)) {
            qrCodeWrapper.classList.add('margin-bottom');
        } else {
            qrCodeWrapper.classList.remove('margin-bottom');
        }
    });

    const showQrCodeWrapper = () => {
        if (qrCodeElement.innerHTML.trim() === '' && !isMobile) {
            return;
        }

        setTimeout(() => {
            qrCodeWrapper.classList.add('active');
        }, 100);
    }

    const hideQrCodeWrapper = () => {
        qrCodeWrapper.classList.remove('active');
    }

    if (qrCodeWrapper.classList.contains('mobile')) {
        showQrCodeWrapper();

        return;
    }

    let qrCodeCookie = getCookie('pawns_qr_code_url');

    if (!qrCodeCookie) {
        try {
            const response = await fetch('/wp-json/pawns/v1/get-qrcode-url', {method: 'GET'});
            qrCodeCookie = await response.json();
        } catch (error) {
            return;
        }
    }

    if (qrCodeCookie) {
        const qrCodeElement = qrCodeWrapper.querySelector('#qrcode');
        QrCreator.render({
            text: decodeURIComponent(qrCodeCookie),
            radius: 0.5,
            ecLevel: 'H',
            fill: '#000000',
            background: null,
            size: 100,
        }, qrCodeElement);

        if (window.scrollY > 400 || !isMobile) {
            showQrCodeWrapper();
        }
    }

    const qrCodeCloseButton = qrCodeWrapper.querySelector('button');

    if (qrCodeCloseButton) {
        qrCodeCloseButton.addEventListener('click', toggleQrCodeWrapper);
    }

    function toggleQrCodeWrapper() {
        qrCodeWrapper.classList.toggle('collapsed');

        if (qrCodeWrapper.classList.contains('collapsed')) {
            setCookie('qr-code-collapsed', 'true', 7);
        } else {
            setCookie('qr-code-collapsed', 'false', 7);
        }
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
});