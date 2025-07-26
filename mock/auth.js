 


export default [
    // 登录
    {
        url: '/prod-api/login',
        method: 'post',
        response: ({ body }) => {
     
            if (body.username === 'admin' && body.password === 'admin123') {
                return {
                    code: 200,
                    msg: '登录成功',
                    token: 'mock-token-1da23456'
                }
            }
            return {
                code: 401,
                msg: '账号或密码错误'
            }
        }
    },
    // 注册
    {
        url: '/prod-api/register',
        method: 'post',
        response: () => ({
            code: 200,
            msg: '注册成功'
        })
    },
    // 获取用户详细信息
    {
        url: '/prod-api/getInfo',
        method: 'get',
        response: () => ({
            "msg": "操作成功",
            "code": 200,
            "permissions": [
                "*:*:*"
            ],
            "roles": [
                "admin"
            ],
            "isDefaultModifyPwd": false,
            "isPasswordExpired": false,
            "user": {
                "createBy": "admin",
                "createTime": "2025-05-26 10:07:46",
                "updateBy": null,
                "updateTime": null,
                "remark": "管理员",
                "userId": 1,
                "deptId": 103,
                "userName": "admin",
                "nickName": "gemmer",
                "email": "gemmerChu@gmail.com",
                "phonenumber": "15888888888",
                "sex": "1",
                "avatar": "",
                "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
                "status": "0",
                "delFlag": "0",
                "loginIp": "1.1.1.1",
                "loginDate": "2025-07-26T10:48:34.000+08:00",
                "pwdUpdateDate": "2025-05-26T10:07:46.000+08:00",
                "dept": {
                    "createBy": null,
                    "createTime": null,
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "deptId": 103,
                    "parentId": 101,
                    "ancestors": "0,100,101",
                    "deptName": "研发部门",
                    "orderNum": 1,
                    "leader": "领导",
                    "phone": null,
                    "email": null,
                    "status": "0",
                    "delFlag": null,
                    "parentName": null,
                    "children": []
                },
                "roles": [
                    {
                        "createBy": null,
                        "createTime": null,
                        "updateBy": null,
                        "updateTime": null,
                        "remark": null,
                        "roleId": 1,
                        "roleName": "超级管理员",
                        "roleKey": "admin",
                        "roleSort": 1,
                        "dataScope": "1",
                        "menuCheckStrictly": false,
                        "deptCheckStrictly": false,
                        "status": "0",
                        "delFlag": null,
                        "flag": false,
                        "menuIds": null,
                        "deptIds": null,
                        "permissions": null,
                        "admin": true
                    }
                ],
                "roleIds": null,
                "postIds": null,
                "roleId": null,
                "admin": true
            }
        })
    },
    // 退出
    {
        url: '/prod-api/logout',
        method: 'post',
        response: () => ({
            code: 200,
            msg: '退出成功'
        })
    },
    // 获取验证码
    {
        url: '/prod-api/captchaImage',
        method: 'get',
        response: () => {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let code = '';
            for (let i = 0; i < 4; i++) {
                code += chars[Math.floor(Math.random() * chars.length)];
            }
            return {
                code: 200,
                uuid: 'mock-uuid-123456',
                text: code,   // 仅供前端画图用
            }
        }
    },

    {
        url: '/prod-api/getRouters',
        method: 'get',
        response: () => ({
            "msg": "操作成功",
            "code": 200,
            "data": [
                {
                    "name": "System",
                    "path": "/system",
                    "hidden": false,
                    "redirect": "noRedirect",
                    "component": "Layout",
                    "alwaysShow": true,
                    "meta": {
                        "title": "系统管理",
                        "icon": "system",
                        "noCache": false,
                        "link": null
                    },
                    "children": [
                        {
                            "name": "User",
                            "path": "user",
                            "hidden": false,
                            "component": "system/user/index",
                            "meta": {
                                "title": "用户管理",
                                "icon": "user",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Role",
                            "path": "role",
                            "hidden": false,
                            "component": "system/role/index",
                            "meta": {
                                "title": "角色管理",
                                "icon": "peoples",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Menu",
                            "path": "menu",
                            "hidden": false,
                            "component": "system/menu/index",
                            "meta": {
                                "title": "菜单管理",
                                "icon": "tree-table",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Dept",
                            "path": "dept",
                            "hidden": false,
                            "component": "system/dept/index",
                            "meta": {
                                "title": "部门管理",
                                "icon": "tree",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Post",
                            "path": "post",
                            "hidden": false,
                            "component": "system/post/index",
                            "meta": {
                                "title": "岗位管理",
                                "icon": "post",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Dict",
                            "path": "dict",
                            "hidden": false,
                            "component": "system/dict/index",
                            "meta": {
                                "title": "字典管理",
                                "icon": "dict",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Config",
                            "path": "config",
                            "hidden": false,
                            "component": "system/config/index",
                            "meta": {
                                "title": "参数设置",
                                "icon": "edit",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Notice",
                            "path": "notice",
                            "hidden": false,
                            "component": "system/notice/index",
                            "meta": {
                                "title": "通知公告",
                                "icon": "message",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Log",
                            "path": "log",
                            "hidden": false,
                            "redirect": "noRedirect",
                            "component": "ParentView",
                            "alwaysShow": true,
                            "meta": {
                                "title": "日志管理",
                                "icon": "log",
                                "noCache": false,
                                "link": null
                            },
                            "children": [
                                {
                                    "name": "Operlog",
                                    "path": "operlog",
                                    "hidden": false,
                                    "component": "monitor/operlog/index",
                                    "meta": {
                                        "title": "操作日志",
                                        "icon": "form",
                                        "noCache": false,
                                        "link": null
                                    }
                                },
                                {
                                    "name": "Logininfor",
                                    "path": "logininfor",
                                    "hidden": false,
                                    "component": "monitor/logininfor/index",
                                    "meta": {
                                        "title": "登录日志",
                                        "icon": "logininfor",
                                        "noCache": false,
                                        "link": null
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Monitor",
                    "path": "/monitor",
                    "hidden": false,
                    "redirect": "noRedirect",
                    "component": "Layout",
                    "alwaysShow": true,
                    "meta": {
                        "title": "系统监控",
                        "icon": "monitor",
                        "noCache": false,
                        "link": null
                    },
                    "children": [
                        {
                            "name": "Online",
                            "path": "online",
                            "hidden": false,
                            "component": "monitor/online/index",
                            "meta": {
                                "title": "在线用户",
                                "icon": "online",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Job",
                            "path": "job",
                            "hidden": false,
                            "component": "monitor/job/index",
                            "meta": {
                                "title": "定时任务",
                                "icon": "job",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Druid",
                            "path": "druid",
                            "hidden": false,
                            "component": "monitor/druid/index",
                            "meta": {
                                "title": "数据监控",
                                "icon": "druid",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Server",
                            "path": "server",
                            "hidden": false,
                            "component": "monitor/server/index",
                            "meta": {
                                "title": "服务监控",
                                "icon": "server",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Cache",
                            "path": "cache",
                            "hidden": false,
                            "component": "monitor/cache/index",
                            "meta": {
                                "title": "缓存监控",
                                "icon": "redis",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "CacheList",
                            "path": "cacheList",
                            "hidden": false,
                            "component": "monitor/cache/list",
                            "meta": {
                                "title": "缓存列表",
                                "icon": "redis-list",
                                "noCache": false,
                                "link": null
                            }
                        }
                    ]
                },
                {
                    "name": "Tool",
                    "path": "/tool",
                    "hidden": false,
                    "redirect": "noRedirect",
                    "component": "Layout",
                    "alwaysShow": true,
                    "meta": {
                        "title": "系统工具",
                        "icon": "tool",
                        "noCache": false,
                        "link": null
                    },
                    "children": [
                        {
                            "name": "Build",
                            "path": "build",
                            "hidden": false,
                            "component": "tool/build/index",
                            "meta": {
                                "title": "表单构建",
                                "icon": "build",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Gen",
                            "path": "gen",
                            "hidden": false,
                            "component": "tool/gen/index",
                            "meta": {
                                "title": "代码生成",
                                "icon": "code",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Swagger",
                            "path": "swagger",
                            "hidden": false,
                            "component": "tool/swagger/index",
                            "meta": {
                                "title": "系统接口",
                                "icon": "swagger",
                                "noCache": false,
                                "link": null
                            }
                        }
                    ]
                }
            ]
        })
    },

]

