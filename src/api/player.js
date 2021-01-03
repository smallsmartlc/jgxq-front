import request from '@/utils/request'

export const getTeamMembers = (teamId) => request({
    method: 'get',
    url: `/player/team/${teamId}`,
})
export const getPlayerById = (id) =>request({
    method : 'get',
    url : `/player/${id}`
})