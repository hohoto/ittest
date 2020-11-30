let getData = () => {
    let data = {
        pandianDetailCode: $('#pandianDetailCode').val(),
        resourceId: $('#resourceId').val(),
        locationCode: $('#locationCode').val()
    }
    return JSON.stringify(data)
}




let bindevent = () => {
    $('#createpandian').on('click', () => { 
        let data = getData()
        $.ajax({
            url: "http://47.103.65.135:8982/pandian/addpandiandetail",
            contentType: "application/json;charset=UTF-8",
            data: data,
            type: "post",
            dataType: "json",
            success: function (text) {
                if(text = "true") window.confirm("新增成功")
            },
            error: function () {
                console.log('创建盘点单失败')
            }
        })
    })
}

setTimeout(() => {bindevent()},0)
