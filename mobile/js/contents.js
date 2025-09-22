// 토글 기능 공통 함수
function initToggle($btn, $detailArea, openText, closeText) {
    var $labelSpan = $btn.find('span');

    $btn.on('click', function() {
        var isExpanded = $btn.attr('aria-expanded') === 'true';
        $btn.attr('aria-expanded', String(!isExpanded));

        if (!isExpanded) {
            // 열림 상태
            $detailArea.removeAttr('hidden');
            $labelSpan.text(closeText).removeClass('open_bt');
        } else {
            // 닫힘 상태
            $detailArea.attr('hidden', '');
            $labelSpan.text(openText).addClass('open_bt');
        }
    });
}

$(document).ready(function() {
    // 신청 및 처리현황 토글
    initToggle($('.apply_summary_toggle'), $('#applySummaryDetail'), '열기', '접기');

    // 프로그램 신청 및 처리현황 토글
    initToggle($('.prog_summary_toggle'), $('#progSummaryDetail'), '프로그램 참여 이력 조회', '접기');
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
