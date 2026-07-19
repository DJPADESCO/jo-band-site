/* ==========================================
   GALERIE YOUTUBE — GRILLE + LECTURE INTEGREE
   Fichier séparé, indépendant de script.js
========================================== */

document.addEventListener('DOMContentLoaded', function () {
    initYouTubeGallery();
});

function initYouTubeGallery() {
    var channelId = 'UCxj3ygXxMVzbKmq4ctSCN5Q';
    var rssUrl    = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
    var apiUrl    = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl);

    var grid       = document.getElementById('yt-gallery-grid');
    var mainIframe = document.getElementById('yt-latest-iframe');
    var mainWrap   = document.getElementById('yt-video-container');
    if (!grid) return;

    function extractVideoId(link) {
        if (!link) return '';
        if (link.indexOf('/shorts/') !== -1) {
            return link.split('/shorts/')[1].split('?')[0];
        }
        if (link.indexOf('watch?v=') !== -1) {
            return link.split('watch?v=')[1].split('&')[0];
        }
        return '';
    }

    function playVideo(videoId, isShort) {
        if (!mainIframe || !mainWrap) return;
        mainIframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
        if (isShort) {
            mainWrap.classList.add('portrait-short');
        } else {
            mainWrap.classList.remove('portrait-short');
        }
        mainWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    try {
        fetch(apiUrl)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (!data.items || !data.items.length) {
                    grid.innerHTML = '<p class="testi-msg">Aucune vidéo disponible pour le moment.</p>';
                    return;
                }

                var items = data.items.slice(0, 4);

                grid.innerHTML = items.map(function (item) {
                    var videoId = extractVideoId(item.link);
                    var isShort = item.link.indexOf('/shorts/') !== -1;
                    if (!videoId) return '';

                    var thumb = (item.thumbnail || (item.enclosure && item.enclosure.link) || '');
                    var titleSafe = (item.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                    return '' +
                        '<div class="yt-gallery-item' + (isShort ? ' is-short' : '') + '" ' +
                             'data-video-id="' + videoId + '" data-is-short="' + (isShort ? '1' : '0') + '">' +
                            '<img src="' + thumb + '" alt="' + titleSafe + '" loading="lazy">' +
                            '<div class="yt-play-icon"><i class="fa-solid fa-play"></i></div>' +
                            '<div class="yt-title-overlay">' + titleSafe + '</div>' +
                        '</div>';
                }).join('');

                var cells = grid.querySelectorAll('.yt-gallery-item');
                cells.forEach(function (cell) {
                    cell.addEventListener('click', function () {
                        var videoId = cell.getAttribute('data-video-id');
                        var isShort = cell.getAttribute('data-is-short') === '1';
                        playVideo(videoId, isShort);
                    });
                });
            })
            .catch(function () {
                grid.innerHTML = '<p class="testi-msg">Impossible de charger les vidéos pour le moment.</p>';
            });
    } catch (e) {
        grid.innerHTML = '<p class="testi-msg">Impossible de charger les vidéos pour le moment.</p>';
    }
}
