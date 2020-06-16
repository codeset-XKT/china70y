//数字滚动
(function($, window, document) {
    "use strict";
    var defaults = {
        deVal: 0, //传入值
        className: 'dataNums', //样式名称
        digit: '' //默认显示几位数字
    };

    function rollNumDaq(obj, options) {
        this.obj = obj;
        this.options = $.extend(defaults, options);
        this.init = function() {
            this.initHtml(obj, defaults);
        }
    }
    rollNumDaq.prototype = { //为rollNumDaq的原生对象prototype设置各项函数
        initHtml: function(obj, options) {
            var strHtml = '<ul class="' + options.className + ' inrow">';
            var valLen = options.digit || (options.deVal + '').length;
            if (obj.find('.' + options.className).length <= 0) {
                for (var i = 0; i < valLen; i++) {
                    strHtml += `<li class="dataOne "><div class="dataBoc"><div class="tt" t="38">
                        <span class="num0">0</span>
                        <span class="num1">1</span> 
                        <span class="num2">2</span> 
                        <span class="num3">3</span> 
                        <span class="num4">4</span>
                        <span class="num5">5</span> 
                        <span class="num6">6</span> 
                        <span class="num7">7</span> 
                        <span class="num8">8</span> 
                        <span class="num9">9</span>
                        <span class="num0">0</span> 
                        <span class="num1">1</span> 
                        <span class="num2">2</span> 
                        <span class="num3">3</span> 
                        <span class="num4">4</span>
                        <span class="num5">5</span> 
                        <span class="num6">6</span> 
                        <span class="num7">7</span> 
                        <span class="num8">8</span> 
                        <span class="num9">9</span>
                       </div>  
                    </div>
                    </li>`;
                }
                strHtml += '</ul>';
                obj.html(strHtml);
            }
            this.scroNum(options);
        },
        scroNum: function(options) {
            var number = options.deVal; //获取传入的数字
            var $num_item = $('.' + options.className).find('.tt');
            if ($('body').height() == 360) {
                var h = $('.dataBoc').width();
            } else {
                var h = $('.dataBoc')[0].getBoundingClientRect().width;
            }
            $num_item.css('transition', 'all 2s ease-in-out'); //滚动动画
            var numberStr = number.toString();
            if (numberStr.length <= $num_item.length - 1) { //获取滚动数值
                var tempStr = '';
                for (var a = 0; a < $num_item.length - numberStr.length; a++) {
                    tempStr += '0';
                }
                numberStr = tempStr + numberStr;
            }

            var numberArr = numberStr.split('');
            $num_item.each(function(i, item) { //实现滚动特效
                setTimeout(function() {
                    $num_item.eq(i).css('top', -parseInt(numberArr[i]) * h - h * 10 + 'px');
                }, i * 100)
            });
        }
    }
    $.fn.rollNumDaq = function(options) {
        var $that = this;
        var rollNumObj = new rollNumDaq($that, options);
        rollNumObj.init();
    };
})(jQuery, window, document); //封装函数，方便调用