import request from '@/request'

export function login(account, password) {
  const data = {
    account,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
// {
// 	"code":0,
// 	"data":{
// 		"Oauth-Token":"469e265e-2334-440d-ab19-4010e0fd2986"
// 	},
// 	"msg":"成功",
// 	"user":{
// 		"account":"root",
// 		"address":"惠州惠州",
// 		"admin":false,
// 		"avatar":"/static/user/admin.png",
// 		"email":"",
// 		"id":1,
// 		"job":"java工程师",
// 		"mobilePhoneNumber":"",
// 		"nickname":"管理员",
// 		"password":"78cbb54481120f60f991358b451d5021",
// 		"salt":"675dfcdc36f56df0f9dfdd0dafe78cbc",
// 		"status":"normal"
// 	}
// }


export function getUserInfo() {
  return request({
    url: '/users/currentUser',
    method: 'get'
  })
}

export function register(account, nickname, password) {
  const data = {
    account,
    nickname,
    password
  }
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
