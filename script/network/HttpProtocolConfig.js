const HttpProtocolConfig = {
    "LOGIN":{
        "method":"POST",             //接口方位类型 get post
        "url":"user/login",   //接口url,结尾不需问号
    },
    "register":{
        "method":"POST",
        "url":"user/register"
    },
    "takeBackPwd":{
        "method":"POST",
        "url":"user/takeBackPwd"
    },
    "getListDate":{
        "method":"GET",
        "url":"listen/list"
    },
    "resetpwd":{
        "method":"POST",
        "url":"user/resetpwd"
    },
    "optTeachers":{
        "method":"GET",
        "url":"app/optTeachers"
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