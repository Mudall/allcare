// 신청 및 처리현황 on/off 토글
$(document).ready(function() {
    var $toggleBtn = $('.apply_summary_toggle');
    var $detailArea = $('#applySummaryDetail');
    var $labelSpan = $toggleBtn.find('span');

    $toggleBtn.on('click', function() {
        var isExpanded = $toggleBtn.attr('aria-expanded') === 'true';
        $toggleBtn.attr('aria-expanded', String(!isExpanded));

        if (!isExpanded) {
            // 열림 상태
            $detailArea.removeAttr('hidden');
            $labelSpan.text('접기').removeClass('open_bt');
        } else {
            // 닫힘 상태
            $detailArea.attr('hidden', '');
            $labelSpan.text('열기').addClass('open_bt');
        }
    });
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
