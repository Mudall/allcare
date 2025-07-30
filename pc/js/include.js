async function loadSection(id, file) {
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`${file} 로드 실패`);
        const html = await res.text();

        const elById = document.getElementById(id);
        if (elById) elById.innerHTML = html;

        document.querySelectorAll(`.${id}`).forEach(el => {
            el.innerHTML = html;
        });
    } catch (e) {
        console.error(e);
    }
}

// 불러오기
[
    ['header', '../pc/include/header.html'],
    ['footer', '../pc/include/footer.html'],
    ['location', '../pc/include/location.html'],
    ['lnb', '../pc/include/lnb.html'],
    ['quick_menu', '../pc/include/quick_menu.html'],
    ['section_bottom', '../pc/include/section_bottom.html']
].forEach(([id, file]) => loadSection(id, file));