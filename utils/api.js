import WXP from './wxp.js'
import regeneratorRuntime from './regenerator-runtime/runtime-module.js'
const host = 'https://xx.xmfinger.com/wegame/api'


const request = async (options, showLoading = true) => {
    if (typeof options === 'string') {
        options = {
            url: options
        }
    }

    if (showLoading) {
        
    }

    options.url = host + '/' + options.url

    let response = await WXP.request(options)

    if (showLoading) {
  
    }

    if (response.statusCode === 500) {
        console.log("服务器错误")
    }

    return response
}

const login = async (params = {}) => {
    let loginData = await WXP.login()
    let userInfo
    try {
        userInfo = await WXP.getUserInfo()
    } catch (err) {
        // console.log(err)
        // 未授权，或者授权失败，跳转到授权页面
    }
    params.code = loginData.code
    params.name = userInfo.userInfo.nickName
    params.avatar = userInfo.userInfo.avatarUrl

    let authResponse = await request({
        url: 'weapp/authorizations',
        data: params,
        method: 'POST'
    })

    if (authResponse.statusCode === 201) {
        await WXP.setStorageSync('access_token', authResponse.data.access_token)
        await WXP.setStorageSync('access_token_expired_at', new Date().getTime() + authResponse.data.expires_in * 1000)
    }

    return authResponse
}

const refreshToken = async (accessToken) => {
    let refreshTokenResponse = await WXP.request({
        url: host + '/' + 'authorizations/current',
        method: 'PUT',
        header: {
            'Authorization': 'Bearer ' + accessToken
        }
    })

    if (refreshTokenResponse.statusCode === 200) {
        WXP.setStorageSync('access_token', refreshTokenResponse.data.access_token)
        WXP.setStorageSync('access_token_expired_at', new Date().getTime() + refreshTokenResponse.data.expires_in * 1000)
    }

    return refreshTokenResponse
}

const getToken = async (options) => {
    let accessToken = WXP.getStorageSync('access_token')
    let expiredAt = WXP.getStorageSync('access_token_expired_at')

    if (accessToken && new Date().getTime() > expiredAt) {
        let refreshResponse = await refreshToken(accessToken)

        if (refreshResponse.statusCode === 200) {
            accessToken = refreshResponse.data.access_token
        } else {
            let authResponse = await login()
            if (authResponse.statusCode === 201) {
                accessToken = authResponse.data.access_token
            }
        }
    }
    return accessToken
}

const authRequest = async (options, showLoading = true) => {
    if (typeof options === 'string') {
        options = {
            url: options
        }
    }

    let accessToken = await getToken()

    // 设置 token 在 header 中
    let header = options.header || {}
    header.Authorization = 'Bearer ' + accessToken
    options.header = header

    return await request(options, showLoading)
}

const logout = async (params = {}) => {
    let accessToken = WXP.getStorageSync('access_token')

    let logoutResponse = await WXP.request({
        url: host + '/' + 'authorizations/current',
        header: {
            'Authorization': 'Bearer ' + accessToken
        },
        method: 'DELETE'
    })

    if (logoutResponse.statusCode === 204) {
        WXP.clearStorage()
    }

    return logoutResponse
}

const checkLogin = async() => {
  let accessToken = WXP.getStorageSync('access_token')
  return accessToken
}

module.exports = {
  request: request,
  authRequest: authRequest,
  refreshToken: refreshToken,
  login: login,
  logout: logout,
  checkLogin: checkLogin
}