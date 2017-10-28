const HttpProtocolConfig = {
    "getListDate":{
        "method":"GET",
        "url":"listen/list"
    },
    "getDetailData":{
        "method":"GET",
        "url":"listen/detail"
    },
    "getTeacherById":{
        "method":"GET",
        "url":"app/getTeacherById"
    },
    "teacherFilterData":{
        "method":"GET",
        "url":"app/teacherFilterData"
    },
    "searchTeachers":{
        "method":"GET",
        "url":"app/searchTeachers"
    },
    "teacherlevellist":{
        "method":"GET",
        "url":"config/teacherlevellist"
    },
    "evaluationOnTeacher":{
        "method":"GET",
        "url":"app/getCommentByTeacherId"
    },
    //其他
    "getOssAppToken":{
        "method":"POST",
        "url":"file/getOssAppToken",
        "description":"获取osstoken接口"      //接口描述
    },
}

export default HttpProtocolConfig