import axios from 'axios'


const ins = axios.create({
})

/**
 * 请求拦截器
 */
ins.interceptors.request.use(config => {
    const data = config.data;
    const timesTamp = String(new Date().getTime());
    config.headers['X-Timestamp'] = timesTamp
    config.headers['x-type'] = 2;
    return config
}, error => Promise.reject(error))

/**
 * 响应拦截器
 */
ins.interceptors.response.use(response => {
    const code = response.data.code;
    if (code == '403' || code == '401' || code == '402') {
        // clearLoginInfo('loginInfo')
        // router.push('/login')
    } else if (code !== '200') {
        // message.error(`${response.data.message}`)
    }
    return response
}, error => {
    return Promise.reject(error)
})

// 自定义各种常用的restful api的请求
// axios.get('url', { params: { key: value } })
// axios.post('url', { key: value })
// axios({ url: '', method: 'GET', params: { key: value }})
// axios({ url: '', method: 'POST', data: { key: value }})
export default function request(config) {
    // 接口请求 必须参数  url method  data  headers
    const { url = '', method = 'POST', data = {}, headers = {} } = config

    // 区分不同的数据请求 为了执行时传入的数据请求方式统一性 GEt GeT get GET
    switch (method.toUpperCase()) {
        case 'GET':
            return ins.get(url, { params: data, headers })
        case 'POST':
            // 可能数据请求方式 表单提交  文件提交   默认json
            // 表单提交
            if (headers['content-type'] === 'application/x-www-form-url-encoded') {
                // 转换参数  URLSearchParams  / 第三方库 qs
                const p = new URLSearchParams()
                for (const key in data) {
                    p.append(key, data[key])
                }
                return ins.post(url, p, { headers })
            }

            // 文件提交
            if (headers['content-type'] === 'multipart/form-data') {
                const p = new FormData()
                for (const key in data) {
                    console.log(key, data);
                    p.append(key, data[key])
                }
                return ins.post(url, p, { headers })
            }

            // 默认 application/json
            return ins.post(url, data);
        // 修改数据 - 所有的数据的更新
        case 'PUT':
            return ins.put(url, data);
        // 删除数据
        case 'DELETE':
            return ins.delete(url, { data });
        // 修改数据 - 部分的数据的更新
        case 'PATCH':
            return ins.patch(url, data);
        default:
            return ins(config);
    }
}