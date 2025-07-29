async function loadSection(id, file) {
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(file + ' 로드 실패');
        const html = await res.text();

        const elById = document.getElementById(id);
        if (elById) elById.innerHTML = html;

        const elByClass = document.querySelector(`.${id}`);
        if (elByClass) elByClass.innerHTML = html;

    } catch (e) {
        console.error(e);
    }
}

// 파일 불러오기
loadSection('header', '../mobile/include/header.html');
loadSection('bottom_bar', '../mobile/include/bottom_bar.html');