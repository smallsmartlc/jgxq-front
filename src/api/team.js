import request from '@/utils/request'

export const getTeamById = (teamId) => request({
    method: 'get',
    url: `/team/infos/${teamId}`,
})