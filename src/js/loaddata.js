function getData(id) {
    var criptoAPI = [
            'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETH' + id,
            'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTC' + id,
            'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTC' + id
        ];
    var currencyMark = {
        'USD' : '$',
        'RUB' : '₽',
        'GBP' : '£' 
    };

    $('.cripto').each(function(index){
        var $this = $(this);
        $.getJSON(criptoAPI[index], function(data) {
            var price = priceFormat($this,data.ask);
            //var price = new String(data.ask);
           // price = price.replace(new RegExp("^(\\d{" + (price.length%3?price.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
            $this.find('#price').html(currencyMark[id] + price.slice(1));

            if($this.find('#trig'+index).prop('checked')) {
                $this.find('#hour').html(priceFormat($this.find('#hour'),data.changes.percent.hour) + '%');
                $this.find('#day').html(priceFormat($this.find('#day'),data.changes.percent.day) + '%');
                $this.find('#week').html(priceFormat($this.find('#week'),data.changes.percent.week) + '%');
                $this.find('#month').html(priceFormat($this.find('#month'),data.changes.percent.month) + '%');
            } else {
                $this.find('#hour').html(priceFormat($this.find('#hour'),data.changes.price.hour) + currencyMark[id]);
                $this.find('#day').html(priceFormat($this.find('#day'),data.changes.price.day) + currencyMark[id]);
                $this.find('#week').html(priceFormat($this.find('#week'),data.changes.price.week) + currencyMark[id]);
                $this.find('#month').html(priceFormat($this.find('#month'),data.changes.price.month) + currencyMark[id]);
            }
        });
    });
}

function priceFormat(b,n) {
    var i = parseFloat(n);
    if(isNaN(i)) { i = 0.00; }
    var neg = '';
    if(i < 0) { neg = '-'; b.css('color','#c80e24'); }
    else {neg = '+'; }
    i = Math.abs(i);
    var $int = parseInt(i);
    i = parseInt((i + 0.005) * 100);
    //var $float = i % 100;
    i = i / 100;
    s = new String(i);
    var dotPos = s.indexOf('.');
    if(dotPos != -1) {
        s1 = s.slice(0,dotPos);
        s2 = s.slice(dotPos);

        s1 = s1.replace(new RegExp("^(\\d{" + (s1.length%3?s1.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
        if(dotPos == (s.length - 2)) { s2 += '0'; }

        return neg + s1 + s2;
    } else {
        s = s.replace(new RegExp("^(\\d{" + (s.length%3?s.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
        
        return neg + s1 + '00';
    }
}

$(document).ready(function(){
    $('.cripto').each(function(index){
        var $this = $(this);
        $this.find('#trig'+index).change(function(){
            var id = $('.select-styled').text();
            var criptoAPI = [
                    'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETH' + id,
                    'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTC' + id,
                    'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTC' + id
                ];
            var currencyMark = {
                'USD' : '$',
                'RUB' : '₽',
                'GBP' : '£' 
            };
            var $trig = $(this);
            $.getJSON(criptoAPI[index], function(data) {
                if($trig.is(':checked')) {
                    $this.find('#hour').html(priceFormat($this.find('#hour'),data.changes.percent.hour) + '%');
                    $this.find('#day').html(priceFormat($this.find('#day'),data.changes.percent.day) + '%');
                    $this.find('#week').html(priceFormat($this.find('#week'),data.changes.percent.week) + '%');
                    $this.find('#month').html(priceFormat($this.find('#month'),data.changes.percent.month) + '%');
                } else {
                    $this.find('#hour').html(priceFormat($this.find('#hour'),data.changes.price.hour) + currencyMark[id]);
                    $this.find('#day').html(priceFormat($this.find('#day'),data.changes.price.day) + currencyMark[id]);
                    $this.find('#week').html(priceFormat($this.find('#week'),data.changes.price.week) + currencyMark[id]);
                    $this.find('#month').html(priceFormat($this.find('#month'),data.changes.price.month) + currencyMark[id]);
                }
            });
        });
    });
});