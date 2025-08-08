var util = {};

// scroll stop
util.scrollStop = (thisPoint) => {
    $('html, body').addClass('scroll_off');
    // window.scrollTo(thisPoint, 0);
}

// scroll clear
util.scrollClear = (thisPoint) => {
    $('html, body').removeClass('scroll_off');
    // window.scrollTo(thisPoint, 0);
}

// li size sum
util.liSizeSum = (ul, type) => {
    let liSize = 0;
    ul.find('> li').each(function() {
        liSize = (liSize + $(this).outerWidth());
    });
    if(type) {
        const plus = Number(ul.find('> li').eq(1).css('margin-left').replace('px', ''));
        liSize = ((ul.find('> li').length - 1) * plus) + liSize;
    }
    return liSize;
}

// ul size call
util.ulSizeCall = (ul, boxSize, type) => {
    const ulSize = util.liSizeSum(ul, type);
    if (boxSize > ulSize) {
        ul.parent().addClass('mini');
        ul.css('width', '100%');
    } else {
        ul.css('width', (ulSize + 10) + 'px');
        ul.parent().removeClass('mini');
    }
}

