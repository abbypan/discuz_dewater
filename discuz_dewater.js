function banner_path() {
    return 'div#pt';
}

function extract_floor_info(bot) {
    var info = bot.parent();
    //alert(info.text());
    var re = new Object;
    re["poster"] = info.find('div.authi').eq(0).text();
    re["time"] = info.find('div.authi em').text().replace('发表于','');
    re["id"] = info.find('div.pi em').text().replace(/\D.*$/,'');
    re["content"] = info.find('td.t_f').html().
        replace(/<[^>]+style="display:none"[^>]*>[^<]+<[^>]+>/g, '').
        replace(/<[^>]+class="jammer"[^>]*>[^<]+<[^>]+>/g, '').
        replace(/<\/?font[^>]*>/g, '');
    re["word_num"] = re["content"].replace('<[^>]+>','').length;
    return re;
}

function floor_path() {
    return 'div#postlist table.plhin';
    //return 'div#postlist>div>table';
}

function page_charset() {
    var h = $('head').html();
    var h_m = h.match(/.*charset=(.*?)".*/);
    if(!h_m) return 'gb2312';
    return h_m[1];
}

function get_topic_name() {
    return $('#thread_subject').text();
}

function get_page_num() {
    var pg = $('div#pgt');
    if(!pg) return;
    var num = pg.html().replace(/<[^>]*>/g,' ');
    var num_m = num.match(/[\D\s]*(\d+)\s*(页|下一页)/);
    if(!num_m) return;
    return num_m[1];
}

function format_thread_url_1st(url) {
    url = url.replace(/\/thread-(\d+)-\d+-1.html$/, '/forum.php?mod=viewthread&tid=$1&page=1');
    url = url.replace(/#.*$/, '').replace(/&extra=[^&]*/,'').replace(/&page=\d+/, '&page=1');

    if(! url.match(/&page=\d+/)){
        url = url.concat('&page=1');
    }

    return url;
}

function format_thread_url_ith(url,i)  {
    var j = i.toString();
    var n_url = url.replace(/&page=\d+/, '&page='+ j);
    return n_url;
}
