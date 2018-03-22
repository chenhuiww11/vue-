$(function() {
    var ww = $(document).width(),
        wh = $(document).height(),
        winW = window.innerWidth;
    var fz = winW * 0.15 + 2;
    document.getElementById('ht').style.fontSize = fz + 'px';
    var runPage, num = 0;
    runPage = new FullPage({
        id: 'pageContain',
        slideTime: 1000,
        effect: {
            transform: {
                translate: 'Y',
                scale: [0, 1],
                rotate: [0, 0]
            },
            opacity: [0, 1]
        },
        mode: 'wheel,touch,nav:navBar',
        easing: 'ease',
        callback: function(index, thisPage) {


        }
    });
    function bindEvent() {
        $('.openDoor,.clickDoor').on('click', function() {
            $('.page1 .contain').addClass('bgAni');
            $('.openDoor,.clickDoor').hide();
            //textAni(1)

        });
        $('.submitBtn').on('click',function(){
            $('.infoBox').hide();
            $('.suc_box').show();
        })
    }

    bindEvent();
})