let pandianlist


let getPandianList = () => {
        console.log("开始获取盘点单")
        $.ajax({
            url: "http://47.103.65.135:8982/pandian/getpandian",
            type: "get",
            dataType: "json",
            success: function (text) {
                pandianlist = text
                
                pandianlist.length = pandianlist.length > 3 ? 3 : pandianlist.length
                if (pandianlist.length >= 1) {
                    $('#li1').text('盘点单:' + pandianlist[0].pandianCode)
                    $('#li1').on('click', () => {
                        window.location = "./pandiandetail.html"
                    })
                }
                if (pandianlist.length >= 2) {
                    $('#li2').text('盘点单:' + pandianlist[1].pandianCode)
                    $('#li2').on('click', () => {
                        window.location = "./pandiandetail.html" 
                    })
                }
                if (pandianlist.length >= 3) {
                    $('#li3').text('盘点单:' + pandianlist[2].pandianCode)
                    $('#li3').on('click', () => {
                        window.location = "./pandiandetail.html" 
                    })
                }
                if (pandianlist.length < 3) {
                    if (pandianlist.length <= 2) $('#li3').css('display','none') 
                    if (pandianlist.length <= 1) $('#li2').css('display','none') 
                    if (pandianlist.length <= 0) $('#li1').css('display','none')
                }
            },
            error: function () {
                console.log('获取盘点单失败')
            }
        })
}

setTimeout(() => {getPandianList()},0)