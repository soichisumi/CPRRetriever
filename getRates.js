function getHtmlForRate(rate , contest ){
    var thresholds
    var classes

    switch(contest){
        case 'codeforces':
            thresholds = [1200, 1400, 1600, 1900, 2200, 2400, 10000]
            classes = ['user-gray', 'user-green', 'user-cyan', 'user-blue',
                    'user-violet', 'user-orange', 'user-red']
            break
        
        case 'topcoder':
            thresholds = [900, 1200, 1500, 2200, 10000]
            classes = ['user-gray', 'user-green', 'user-blue', 'user-yerrow', 'user-red']
            break

        case 'atcoder':
        default:
                        //gray, brown, green, cyan, blue, yellow, orange, red 
            thresholds  = [400, 800, 1200, 1600, 2000, 2400, 2800, 10000]
            classes     = ['user-gray', 'user-brown', 'user-green', 'user-cyan',
                        'user-blue', 'user-yellow', 'user-orange', 'user-red' ]
            break
        
    }
    for (var i in thresholds){
        if(rate < thresholds[i])
            return '<div class="' + classes[i] + '">' + String(rate) + '</div>'   
    }
}

function setCodeforcesRate(userId) {
    $.ajax('http://codeforces.com/api/user.info',
        {
            type:   'GET',
            data:   {handles: userId},
            dataType: 'jsonp',
            jsonpCallback: 'parseResponse',
            success: function(data){
                $('#cdf').html(getHtmlForRate(data.result[0].rating))
            }
        }
    )
}

function setTopcoderRate(userId) {
    $.ajax('http://api.topcoder.com/v2/users/' + userId + '/statistics/data/srm',
        {
            type:   'GET',
            dataType: 'json'
        }
    ).done(function(data){
        $('#tpc').html(getHtmlForRate(data.rating))
    })
}

function setAtcoderRate(userId){
    $.ajax('https://atcoder.jp/user/' + userId,
        {
            type:   'GET',
            dataType: 'html'
        }
    ).done(function(data){
        $('#atc').html($('dd',data).eq(5).text()) //6でmaxRate
    })
}
setCodeforcesRate('yousei')
setAtcoderRate('yoyoyousei')
setTopcoderRate('camshift')