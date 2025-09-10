document.addEventListener('DOMContentLoaded', () => {
    // 1. .reset_area 내의 textarea 및 checkbox 초기화 버튼 .btnClean 클릭 이벤트
    const btnClean = document.getElementById('btnClean');
    if (btnClean) {
        btnClean.addEventListener('click', () => {
            const resetArea = document.querySelector('.reset_area');
            if (!resetArea) return;

            resetArea.querySelectorAll('input[type="text"], textarea').forEach(input => {
                input.value = '';
            });

            resetArea.querySelectorAll('input[type="checkbox"]').forEach(chk => {
                chk.checked = false;
            });
        });
    }
});

// 2. tr.chk_dual 내의 전체 선택 체크박스와 개별 시도 체크박스 간 상호 배타적 동작
document.addEventListener('DOMContentLoaded', () => {
    const dualRows = document.querySelectorAll('tr.chk_dual');
    if (dualRows.length) {
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
    }
});


// 3. tr.new_date 내 select#newDate 변경 시 input#schRcptStdte, input#schRcptEndte 날짜 자동 설정
document.addEventListener('DOMContentLoaded', () => {
    const newDateRows = document.querySelectorAll('tr.new_date');
    if (newDateRows.length) {
        newDateRows.forEach(tr => {
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
    }
});


// 4. .new_ipt 내 삭제 버튼 .newbtn_del 클릭 시 input 초기화
document.addEventListener('DOMContentLoaded', () => {
    const delButtons = document.querySelectorAll('.new_ipt .newbtn_del');
    if (delButtons.length) {
        delButtons.forEach(button => {
            button.addEventListener('click', () => {
                const wrapper = button.closest('.new_ipt');
                if (!wrapper) return;

                const input = wrapper.querySelector('input:not([type="hidden"]):not([disabled])');
                if (input) {
                    input.value = '';
                    input.focus();
                }
            });
        });
    }
});


// 5. .new_reset 내 reset 버튼 클릭 시 해당 td 내 input 초기화
document.addEventListener('DOMContentLoaded', () => {
    const resetButtons = document.querySelectorAll('.new_reset .newbtn_reset');
    if (resetButtons.length) {
        resetButtons.forEach(button => {
            button.addEventListener('click', () => {
                const td = button.closest('td');
                if (!td) return;

                const input = td.querySelector('input:not([type="hidden"]):not([disabled])');
                if (input) {
                    input.value = '';
                    input.focus();
                }
            });
        });
    }
});



// .allcare .text_form_box내의 textarea 의 byte 계산
$(document).ready(function() {
    function getByteLength(str) {
        let byteLength = 0;
        for (let i = 0; i < str.length; i++) {
            const ch = str.charCodeAt(i);
            byteLength += (ch > 127) ? 2 : 1;
        }
        return byteLength;
    }

    $('.text_form_box textarea').each(function() {
        const $textarea = $(this);
        const $countInfo = $textarea.closest('.text_form_box').find('.count_info');
        const $resultByte = $countInfo.find('.result_byte');
        const $maxByteEl = $countInfo.find('.max_byte');

        const maxByte = parseInt($maxByteEl.text().replace(/,/g, ''), 10) || 0;

        function updateByteCount() {
            let text = $textarea.val();
            let byteLength = getByteLength(text);

            if (byteLength > maxByte) {
                let cutText = '';
                let tempByte = 0;
                for (let i = 0; i < text.length; i++) {
                    const ch = text.charCodeAt(i);
                    tempByte += (ch > 127) ? 2 : 1;
                    if (tempByte > maxByte) break;
                    cutText += text[i];
                }
                $textarea.val(cutText);
                byteLength = getByteLength(cutText);
            }

            $resultByte.text(byteLength);
        }

        // input 이벤트
        $textarea.on('input', updateByteCount);

        // 페이지 로드 시 초기 값 처리
        updateByteCount();
    });
});


// unselect 일때 radio 비활성화
$(function(){
    $('.box_radio_group.type_unselect input[type="radio"]').on('click', function(e){
        e.preventDefault();          
        $(this).prop('checked', false); 
    });
});

// 신청 및 처리현황 on/off 토글
$(document).ready(function() {
    var $toggleBtn = $('.apply_summary_action .apply_summary_toggle');
    var $detailArea = $('#applySummaryDetail');

    $toggleBtn.on('click', function() {
        var isExpanded = $toggleBtn.attr('aria-expanded') === 'true';
        $toggleBtn.attr('aria-expanded', String(!isExpanded));
        $toggleBtn.toggleClass('on', !isExpanded);
        $toggleBtn.toggleClass('off', isExpanded);

        if (!isExpanded) {
            $detailArea.removeAttr('hidden');
        } else {
            $detailArea.attr('hidden', '');
        }
    });
});