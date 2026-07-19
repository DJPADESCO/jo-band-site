/* ==========================================
   GALERIE TIKTOK — VIGNETTES SEULEMENT
   Aucun lecteur intégré, aucun script TikTok lourd.
   Un clic ouvre directement TikTok (app ou navigateur).
========================================== */

document.addEventListener('DOMContentLoaded', function () {
    initTikTokGallery();
});

function initTikTokGallery() {
    var RSS_FEED_URL = 'https://rss.app/feeds/b6cIuCo623gIXhZH.xml';
    var apiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(RSS_FEED_URL);

    var grid = document.getElementById('tiktok-gallery-grid');
    if (!grid) return;

    try {
        fetch(apiUrl)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (!data.items || !data.items.length) {
                    grid.innerHTML = '<p class="testi-msg">Aucune vidéo TikTok disponible pour le moment.</p>';
                    return;
                }

                var items = data.items.slice(0, 4);

                grid.innerHTML = items.map(function (item) {
                    var thumb = (item.thumbnail || (item.enclosure && item.enclosure.link) || '');
                    var titleSafe = (item.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                    return '' +
                        '<a href="' + item.link + '" target="_blank" rel="noopener" class="yt-gallery-item is-short">' +
                            '<img src="' + thumb + '" alt="' + titleSafe + '" loading="lazy">' +
                            '<div class="yt-play-icon"><i class="fa-brands fa-tiktok"></i></div>' +
                            '<div class="yt-title-overlay">' + titleSafe + '</div>' +
                        '</a>';
                }).join('');
            })
            .catch(function () {
                grid.innerHTML = '<p class="testi-msg">Impossible de charger les vidéos TikTok pour le moment.</p>';
            });
    } catch (e) {
        grid.innerHTML = '<p class="testi-msg">Impossible de charger les vidéos TikTok pour le moment.</p>';
    }
}
