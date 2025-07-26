const express = require('express');
const cors = require('cors'); // 引入 cors
const app = express();
const port = 3000;

// 使用 CORS 中间件，允许所有来源的请求
app.use(cors());

// 解析请求体
app.use(express.json());

// 模拟登录接口
app.post('/prod-api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    return res.json({
      code: 200,
      msg: '登录成功',
      token: 'mock-token-1da23456'
    });
  }
  return res.status(401).json({
    code: 401,
    msg: '账号或密码错误'
  });
});

// 模拟注册接口
app.post('/prod-api/register', (req, res) => {
  return res.json({
    code: 200,
    msg: '注册成功'
  });
});

// 获取用户信息
app.get('/prod-api/getInfo', (req, res) => {
  return res.json({
    msg: "操作成功",
    code: 200,
    permissions: ["*:*:*"],
    roles: ["admin"],
    isDefaultModifyPwd: false,
    isPasswordExpired: false,
    user: {
      createBy: "admin",
      createTime: "2025-05-26 10:07:46",
      userId: 1,
      deptId: 103,
      userName: "admin",
      nickName: "gemmer",
      email: "gemmerChu@gmail.com",
      phonenumber: "15888888888",
      sex: "1",
      avatar: "",
      password: "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
      status: "0",
      loginIp: "1.1.1.1",
      loginDate: "2025-07-26T10:48:34.000+08:00",
      dept: {
        deptId: 103,
        deptName: "研发部门",
        leader: "领导"
      },
      roles: [
        {
          roleId: 1,
          roleName: "超级管理员"
        }
      ]
    }
  });
});

// 退出接口
app.post('/prod-api/logout', (req, res) => {
  return res.json({
    code: 200,
    msg: '退出成功'
  });
});

// 获取验证码接口
app.get('/prod-api/captchaImage', (req, res) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return res.json({
    code: 200,
    uuid: 'mock-uuid-123456',
    text: code // 仅供前端画图用
  });
});

// 获取路由权限
app.get('/prod-api/getRouters', (req, res) => {
  return res.json({
    msg: "操作成功",
    code: 200,
    data: [
      {
        name: "System",
        path: "/system",
        component: "Layout",
        meta: {
          title: "系统管理",
          icon: "system"
        },
        children: [
          {
            name: "User",
            path: "user",
            component: "system/user/index",
            meta: {
              title: "用户管理",
              icon: "user"
            }
          },
          {
            name: "Role",
            path: "role",
            component: "system/role/index",
            meta: {
              title: "角色管理",
              icon: "peoples"
            }
          },
          {
            name: "Menu",
            path: "menu",
            component: "system/menu/index",
            meta: {
              title: "菜单管理",
              icon: "tree-table"
            }
          }
        ]
      },
      {
        name: "Monitor",
        path: "/monitor",
        component: "Layout",
        meta: {
          title: "系统监控",
          icon: "monitor"
        },
        children: [
          {
            name: "Online",
            path: "online",
            component: "monitor/online/index",
            meta: {
              title: "在线用户",
              icon: "online"
            }
          },
          {
            name: "Job",
            path: "job",
            component: "monitor/job/index",
            meta: {
              title: "定时任务",
              icon: "job"
            }
          }
        ]
      },
      {
        name: "Tool",
        path: "/tool",
        component: "Layout",
        meta: {
          title: "系统工具",
          icon: "tool"
        },
        children: [
          {
            name: "Build",
            path: "build",
            component: "tool/build/index",
            meta: {
              title: "表单构建",
              icon: "build"
            }
          },
          {
            name: "Gen",
            path: "gen",
            component: "tool/gen/index",
            meta: {
              title: "代码生成",
              icon: "code"
            }
          }
        ]
      }
    ]
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Mock API Server with CORS is running on http://localhost:${port}`);
});
