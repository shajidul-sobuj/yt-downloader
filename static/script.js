const urlInput = document.getElementById('url-input');
const fetchBtn = document.getElementById('fetch-btn');
const infoSection = document.getElementById('info-section');
const qualitySection = document.getElementById('quality-section');
const progressSection = document.getElementById('progress-section');
const errorSection = document.getElementById('error-section');
const successSection = document.getElementById('success-section');

let currentUrl = '';
let currentInfo = null;
let selectedFormat = null;

// Event listeners
fetchBtn.addEventListener('click', fetchVideoInfo);
document.getElementById('download-btn').addEventListener('click', startDownload);
document.getElementById('close-error-btn').addEventListener('click', hideError);
document.getElementById('close-success-btn').addEventListener('click', resetForm);

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchVideoInfo();
    }
});

async function fetchVideoInfo() {
    const url = urlInput.value.trim();
    
    if (!url) {
        showError('Please enter a YouTube URL');
        return;
    }

    currentUrl = url;
    hideAllSections();
    showLoading('Fetching video information...');

    try {
        const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch video info');
        }

        currentInfo = data;
        displayInfo(data);
        
        if (data.type === 'video') {
            displayQualityOptions(data.formats);
        } else {
            showQualitySection(false);
        }

    } catch (error) {
        showError(error.message);
    }
}

function displayInfo(info) {
    const infoContent = document.getElementById('info-content');
    let html = '';

    if (info.type === 'video') {
        html = `
            <div class="info-content-item">
                <label>Video Title</label>
                <p>${escapeHtml(info.title)}</p>
            </div>
            ${info.thumbnail ? `<img src="${info.thumbnail}" alt="Thumbnail" class="thumbnail-img">` : ''}
            <div class="info-content-item">
                <label>Duration</label>
                <p>${formatDuration(info.duration)}</p>
            </div>
            <div class="info-content-item">
                <label>Uploader</label>
                <p>${escapeHtml(info.uploader || 'Unknown')}</p>
            </div>
        `;
    } else if (info.type === 'playlist') {
        html = `
            <div class="info-content-item">
                <label>Playlist Title</label>
                <p>${escapeHtml(info.title)}</p>
            </div>
            <div class="info-content-item">
                <label>Total Videos</label>
                <p>${info.video_count}</p>
            </div>
            <div class="info-content-item">
                <label>First Videos:</label>
                ${info.videos.map(v => `
                    <div class="video-item">
                        ${escapeHtml(v.title)} (${formatDuration(v.duration)})
                    </div>
                `).join('')}
            </div>
        `;
    }

    infoContent.innerHTML = html;
    infoSection.classList.remove('hidden');
}

function displayQualityOptions(formats) {
    const qualityOptions = document.getElementById('quality-options');
    
    const qualityMap = {
        '1080': '1080p',
        '720': '720p',
        '480': '480p',
        '360': '360p',
        '240': '240p',
        'best': 'Best'
    };

    const uniqueQualities = [...new Set(formats.map(f => f.resolution || 'unknown'))].sort((a, b) => b - a);
    
    html = '<div class="quality-option selected" data-format="best">' +
           '<span class="quality-option-label">🎯 Best</span>' +
           '<span class="quality-option-info">Auto select best</span>' +
           '</div>';

    formats.forEach(format => {
        const quality = format.resolution ? `${format.resolution}p` : 'Mixed';
        const filesize = format.filesize ? `(${formatFilesize(format.filesize)})` : '';
        
        html += `
            <div class="quality-option" data-format="${format.format_id}">
                <span class="quality-option-label">${quality}</span>
                <span class="quality-option-info">${filesize}</span>
            </div>
        `;
    });

    qualityOptions.innerHTML = html;

    // Add click handlers
    document.querySelectorAll('.quality-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.quality-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedFormat = option.dataset.format;
        });
    });

    selectedFormat = 'best';
    showQualitySection(true);
}

async function startDownload() {
    if (!selectedFormat) {
        showError('Please select a quality');
        return;
    }

    hideAllSections();
    showProgressSection();

    try {
        const isPlaylist = currentInfo.type === 'playlist';
        const response = await fetch(
            `/api/download?url=${encodeURIComponent(currentUrl)}&format_id=${selectedFormat}&is_playlist=${isPlaylist}`,
            { method: 'POST' }
        );

        if (!response.ok) {
            throw new Error('Download failed');
        }

        // Start monitoring progress
        monitorProgress();

    } catch (error) {
        showError(error.message);
    }
}

async function monitorProgress() {
    const maxAttempts = 300; // 5 minutes max wait
    let attempts = 0;
    let isComplete = false;

    const checkInterval = setInterval(async () => {
        try {
            attempts++;

            // Check progress
            const progressResponse = await fetch('/api/progress');
            const progressData = await progressResponse.json();

            if (progressData.status === 'downloading') {
                updateProgress(progressData);
            }

            // Check result
            const resultResponse = await fetch('/api/result');
            const resultData = await resultResponse.json();

            if (resultData.message && !resultData.message.includes('No download')) {
                isComplete = true;
                clearInterval(checkInterval);
                showSuccess(resultData);
                return;
            }

            if (attempts > maxAttempts) {
                clearInterval(checkInterval);
                showError('Download timeout');
                return;
            }

        } catch (error) {
            console.error('Progress check error:', error);
        }
    }, 1000);
}

function updateProgress(data) {
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    const progressSpeed = document.getElementById('progress-speed');
    const progressEta = document.getElementById('progress-eta');

    const percentValue = parseInt(data.percent) || 0;
    progressFill.style.width = percentValue + '%';
    progressFill.textContent = percentValue + '%';

    progressPercent.textContent = data.percent || '0%';
    progressSpeed.textContent = 'Speed: ' + (data.speed || '-');
    progressEta.textContent = 'ETA: ' + (data.eta || '-');
}

function showSuccess(result) {
    hideAllSections();
    successSection.classList.remove('hidden');
    document.getElementById('success-message').textContent = result.message || 'Download completed!';
}

function showError(message) {
    hideAllSections();
    errorSection.classList.remove('hidden');
    document.getElementById('error-message').textContent = message;
}

function hideError() {
    errorSection.classList.add('hidden');
}

function hideAllSections() {
    infoSection.classList.add('hidden');
    qualitySection.classList.add('hidden');
    progressSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    successSection.classList.add('hidden');
}

function showQualitySection(show) {
    if (show) {
        qualitySection.classList.remove('hidden');
    } else {
        qualitySection.classList.add('hidden');
    }
}

function showProgressSection() {
    progressSection.classList.remove('hidden');
}

function showLoading(message) {
    hideAllSections();
    progressSection.classList.remove('hidden');
    document.getElementById('progress-message').textContent = message;
}

function resetForm() {
    hideAllSections();
    urlInput.value = '';
    currentUrl = '';
    currentInfo = null;
    selectedFormat = null;
}

function formatDuration(seconds) {
    if (!seconds) return 'Unknown';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
}

function formatFilesize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return size.toFixed(2) + ' ' + units[unitIndex];
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initial message
console.log('YouTube Downloader loaded successfully!');
