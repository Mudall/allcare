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