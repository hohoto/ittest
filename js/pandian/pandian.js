// const relation = {
//     pandianCode: 'pandianCode'
    
// }


let getData = () => {
    let data = {
        pandianCode: $('#pandianCode').val(),
        planBeginDate: $('#planBeginDate').val(),
        planEndDate: $('#planEndDate').val(),
        personDepartmentName: $('#personDepartmentName').val(),
        spuId: $('#spuId').val(),
        locationCode: $('#locationCode').val()
    }
    return JSON.stringify(data)
}




let bindevent = () => {
    $('#createpandian').on('click', () => { 
        let data = getData()
        $.ajax({
            url: "http://47.103.65.135/pandian/addpandian",
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





