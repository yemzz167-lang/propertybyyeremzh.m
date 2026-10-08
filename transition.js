// ============================================
// PAGE TRANSITION — Animasi antar halaman
// ============================================

// Saat halaman dimuat, fade-in
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('fade-out');
});

// Saat klik link internal, fade-out dulu
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip link eksternal, anchor (#), atau javascript
        if (
            !href ||
            href.startsWith('http') ||
            href.startsWith('#') ||
            href.startsWith('javascript') ||
            href.startsWith('mailto') ||
            href.startsWith('tel') ||
            href.startsWith('https://wa.me')
        ) return;

        e.preventDefault();
        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});