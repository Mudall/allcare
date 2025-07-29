// .reset_area 내의 textarea 및 checkbox 초기화 버튼 .btnClean 클릭 이벤트 
document.getElementById('btnClean').addEventListener('click', () => {
    const resetArea = document.querySelector('.reset_area');
    if (!resetArea) return;

    resetArea.querySelectorAll('input[type="text"], textarea').forEach(input => {
        input.value = '';
    });

    resetArea.querySelectorAll('input[type="checkbox"]').forEach(chk => {
        chk.checked = false;
    });
});

// chkRegion 으로 시작하는 요소의 전체 선택 체크박스와 개별 시도 체크박스 간에 상호 배타적 동작 
document.addEventListener('DOMContentLoaded', () => {
    const allCheckbox = document.getElementById('chkRegionAll');
    const regionCheckboxes = Array.from(document.querySelectorAll('input.chkRegion'))
        .filter(chk => chk !== allCheckbox);

    allCheckbox.addEventListener('change', () => {
        if (allCheckbox.checked) {
        regionCheckboxes.forEach(chk => chk.checked = false);
        }
    });

    regionCheckboxes.forEach(chk => {
        chk.addEventListener('change', () => {
        if (chk.checked) {
            allCheckbox.checked = false;
        } else {
            const anyChecked = regionCheckboxes.some(c => c.checked);
            if (!anyChecked) {
            allCheckbox.checked = true;
            }
        }
        });
    });
});




// .auto_count가 붙은 table내의 .no의 넘버링 자동화
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('table.auto-count .no').forEach((cell, index) => {
        cell.textContent = index + 1;
    });
});




// .popup-dim의 팝업 열기/닫기 및 스크롤 제어
