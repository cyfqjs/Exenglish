import axios from 'axios'

export function getTranslateResult(params){
    return axios.get('/api',{
        params
    })
}