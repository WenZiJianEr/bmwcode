import request from '@/utils/request'

export const Getlist2401 = (data) => {
    return request({
        url: '/kcs-web/stat/page2401Index',
        method: 'post',
        data: data
    })
}