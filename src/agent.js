'use strict'

import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'
const PORT = process.env.PORT || 3001;

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = `https://meetingku.herokuapp.com/api`
console.log('port------------------------', API_ROOT, process.env)
const encode = encodeURIComponent
const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  del: url => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/user/login', {
    user: {
      email,
      password
    }
  }),
  register: (username, email, password) => requests.post('/user', {
    user: {
      username,
      email,
      password
    }
  }),
  save: user => requests.put('/user', {
    user
  })
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const Agenda = {
  //type = 0: agenda type=1: trash
  all: (page, type) => requests.get(`/agenda?type=${type}&${limit(20, page)}`),
  get: agendaId => requests.get(`/agenda/${agendaId}`),
  update: agenda => requests.put(`/agenda/${agenda.id}`, {
    agenda: agenda
  }),
  save: agenda => requests.post('/agenda', {
    agenda
  })
}

const Template = {
  all: (page) => requests.get(`/template?${limit(20, page)}`),
  get: agendaId => requests.get(`/template/${agendaId}`)
}

export default {
  Agenda,
  Auth,
  Template,
  setToken: _token => {
    token = _token
  }
}
