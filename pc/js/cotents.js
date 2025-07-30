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

// .box_ipt 내의 .ico16_delete 네이밍의 삭제버튼 클릭시 .box_ipt 내의 input 초기화
document.querySelectorAll('.box_ipt .ico16_delete').forEach(button => {
    button.addEventListener('click', () => {
            const boxIpt = button.closest('.box_ipt');
            if (!boxIpt) return;

            const input = boxIpt.querySelector('input[type="text"], input[type="search"], input:not([type])');
            if (input) {
            input.value = '';
            input.focus(); 
        }
    });
});

// tr.chk_dual 내의 전체 선택 체크박스와 개별 시도 체크박스 간에 상호 배타적 동작 
document.addEventListener('DOMContentLoaded', () => {
    const dualRows = document.querySelectorAll('tr.chk_dual');

    dualRows.forEach(row => {
        const allCheckboxes = row.querySelectorAll('input[type="checkbox"][value="ALL"]');

        allCheckboxes.forEach(allChk => {
        const name = allChk.name;
        const groupCheckboxes = row.querySelectorAll(`input[type="checkbox"][name="${name}"]:not([value="ALL"])`);

        allChk.addEventListener('change', () => {
            if (allChk.checked) {
            groupCheckboxes.forEach(chk => {
                chk.checked = false;
            });
            }
        });

        groupCheckboxes.forEach(chk => {
            chk.addEventListener('change', () => {
            if (chk.checked) {
                allChk.checked = false;
            } else {
                const anyChecked = Array.from(groupCheckboxes).some(c => c.checked);
                if (!anyChecked) {
                allChk.checked = true;
                }
            }
            });
        });
        });
    });
});


// tr.new_date 내의 select#newDate 변경 시, input#schRcptStdte 및 input#schRcptEndte의 날짜 자동 설정
document.querySelectorAll('tr.new_date').forEach(tr => {
    const newDate = tr.querySelector('select#newDate');
    const startInput = tr.querySelector('input#schRcptStdte');
    const endInput = tr.querySelector('input#schRcptEndte');

    if (!newDate || !startInput || !endInput) return;

    newDate.addEventListener('change', function () {
        const today = new Date();
        let startDate = new Date(today);
        let endDate;

        switch (this.value) {
        case 'today':
            endDate = new Date(today);
            break;
        case '1w':
            endDate = new Date(today);
            endDate.setDate(endDate.getDate() + 6);
            break;
        case '1m':
            endDate = new Date(today);
            endDate.setDate(endDate.getDate() + 29);
            break;
        case '3m':
            endDate = new Date(today);
            endDate.setDate(endDate.getDate() + 89);
            break;
        case '6m':
            endDate = new Date(today);
            endDate.setDate(endDate.getDate() + 179);
            break;
        case '1y':
            endDate = new Date(today);
            endDate.setDate(endDate.getDate() + 364);
            break;
        default:
            endDate = null;
        }

        function formatDate(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const da = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${da}`;
        }

        if (endDate) {
        startInput.value = formatDate(startDate);
        endInput.value = formatDate(endDate);
        } else {
        startInput.value = '';
        endInput.value = '';
        }
    });
});




// tr.new_reset 내의 td들의 reset버튼 이원화
document.querySelectorAll('.new_reset .ico16_delete').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (input && input.tagName === 'INPUT') {
      input.value = '';
      input.focus(); // 포커스 이동으로 키보드 사용자 편의성 확보
    }
  });
});
