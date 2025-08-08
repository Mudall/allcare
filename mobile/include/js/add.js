document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.notice_expand');
    const layer = document.getElementById('noticeLayer');
    const closeBtn = layer.querySelector('.layer_close');
    const dimmed = document.querySelector('.dimmed');
    const body = document.body;

    if (!toggleBtn || !layer || !closeBtn || !dimmed) return;

    toggleBtn.setAttribute('aria-expanded', 'false');

    function openLayer() {
        layer.style.display = 'block';
        body.classList.add('scroll_off');
        dimmed.style.display = 'block';
        toggleBtn.setAttribute('aria-expanded', 'true');
        layer.focus();
    }

    function closeLayer() {
        layer.style.display = 'none';
        body.classList.remove('scroll_off');
        dimmed.style.display = 'none';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', function () {
        const isOpen = layer.style.display === 'block';
        isOpen ? closeLayer() : openLayer();
    });

    closeBtn.addEventListener('click', closeLayer);
    dimmed.addEventListener('click', closeLayer); 
});




// 셀렉 필터
document.addEventListener('DOMContentLoaded', function () {
    const selectAreas = document.querySelectorAll('.select_area');

    selectAreas.forEach(area => {
        const toggleBtn = area.querySelector('.select_btn');
        const layer = area.querySelector('.select_layer');
        const closeBtn = layer.querySelector('.select_close');
        const dimmed = document.querySelector('.dimmed');
        const body = document.body;

        if (!toggleBtn || !layer || !closeBtn || !dimmed) return;

        toggleBtn.setAttribute('aria-haspopup', 'listbox');
        toggleBtn.setAttribute('aria-expanded', 'false');
        layer.setAttribute('role', 'listbox');
        layer.setAttribute('tabindex', '-1');

        function openLayer() {
            layer.classList.remove('dsp-none');
            body.classList.add('scroll_off');
            dimmed.style.display = 'block';
            toggleBtn.setAttribute('aria-expanded', 'true');
            layer.focus();
        }

        function closeLayer() {
            layer.classList.add('dsp-none');
            body.classList.remove('scroll_off');
            dimmed.style.display = 'none';
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.focus();
        }

        toggleBtn.addEventListener('click', function () {
            const isOpen = !layer.classList.contains('dsp-none');
            isOpen ? closeLayer() : openLayer();
        });

        closeBtn.addEventListener('click', closeLayer);
        dimmed.addEventListener('click', closeLayer);

        // ESC 키로 닫기
        layer.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeLayer();
            }
        });
    });
});