/* ==========================================
   GALERIE TIKTOK — GRILLE + EMBED OFFICIEL
   Fichier séparé, indépendant de script.js
   Source : flux RSS.app (pont automatique, pas d'API TikTok)
========================================== */

document.addEventListener('DOMContentLoaded', function () {
    initTikTokGallery();
});

function initTikTokGallery() {
    var RSS_FEED_URL = 'https://rss.app/feeds/b6cIuCo623gIXhZH.xml';
    var apiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(RSS_FEED_URL);

    var mainEmbed = document.getElementById('tiktok-main-embed');
    var grid       = document.getElementById('tiktok-gallery-grid');
    if (!mainEmbed || !grid) return;

    function extractVideoId(link) {
        if (!link) return '';
        var match = link.match(/\/video\/(\d+)/);
        return match ? match[1] : '';
    }

    function reloadTikTokScript() {
        var old = document.getElementById('tiktok-embed-script');
        if (old) old.remove();
        var script = document.createElement('script');
        script.id = 'tiktok-embed-script';
        script.async = true;
        script.src = 'https://www.tiktok.com/embed.js';
        document.body.appendChild(script);
    }

    function renderMainVideo(videoUrl, videoId) {
        mainEmbed.innerHTML =
            '<blockquote class="tiktok-embed" cite="' + videoUrl + '" data-video-id="' + videoId + '" ' +
            'style="max-width:100%;min-width:280px;margin:0 auto;">' +
                '<section></section>' +
            '</blockquote>';
        reloadTikTokScript();
    }

    try {
        fetch(apiUrl)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (!data.items || !data.items.length) {
                    grid.innerHTML = '<p class="testi-msg">Aucune vidéo TikTok disponible pour le moment.</p>';
                    mainEmbed.innerHTML = '<p class="testi-msg">Retrouvez nos vidéos directement sur TikTok.</p>';
                    return;
                }

                var items = data.items.slice(0, 4);

                // Vidéo principale = la plus récente
                var firstId = extractVideoId(items[0].link);
                if (firstId) {
                    renderMainVideo(items[0].link, firstId);
                }

                grid.innerHTML = items.map(function (item) {
                    var videoId = extractVideoId(item.link);
                    if (!videoId) return '';

                    var thumb = (item.thumbnail || (item.enclosure && item.enclosure.link) || '');
                    var titleSafe = (item.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                    return '' +
                        '<div class="yt-gallery-item is-short" ' +
                             'data-video-url="' + item.link + '" data-video-id="' + videoId + '">' +
                            '<img src="' + thumb + '" alt="' + titleSafe + '" loading="lazy">' +
                            '<div class="yt-play-icon"><i class="fa-brands fa-tiktok"></i></div>' +
                            '<div class="yt-title-overlay">' + titleSafe + '</div>' +
                        '</div>';
                }).join('');

                var cells = grid.querySelectorAll('.yt-gallery-item');
                cells.forEach(function (cell) {
                    cell.addEventListener('click', function () {
                        var videoUrl = cell.getAttribute('data-video-url');
                        var videoId  = cell.getAttribute('data-video-id');
                        renderMainVideo(videoUrl, videoId);
                        mainEmbed.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    });
                });
            })
            .catch(function () {
                grid.innerHTML = '<p class="testi-msg">Impossible de charger les vidéos TikTok pour le moment.</p>';
                mainEmbed.innerHTML = '<p class="testi-msg">Retrouvez nos vidéos directement sur TikTok.</p>';
            });
    } catch (e) {
        grid.innerHTML = '<p class="testi-msg">Impossible de charger les vidéos TikTok pour le moment.</p>';
    }
}
