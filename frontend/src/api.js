import Axios from 'axios'


function addGroup(number, course, number_of_students, faculty) {
  return Axios.post('/api/group/', { number, course, number_of_students, faculty })
}

function addSubject(name, department, hours) {
  return Axios.post('/api/subject/', { name, department, hours })
}

function addSession(teacher, control, date, groupNumber, subjectName) {
  return Axios.post('/api/session/', {
    teacher, control, date,
    group: groupNumber,
    subject: subjectName
  })
}

function getGroups() {
  return Axios.get('/api/group/')
}

function getSubjects() {
  return Axios.get('/api/subject/')
}

function getSessions() {
  return Axios.get('/api/session/')
}

function deleteGroup(groupNumber) {
  const usp = new URLSearchParams({ group: groupNumber })
  return Axios.post(`/api/deleteGroup?${usp}`, {})
}

function deleteSession(groupNumber, date) {
  const usp = new URLSearchParams({ group: groupNumber, date })
  return Axios.post(`/api/deleteSession?${usp}`, {})
}

function stat(method) {
  return Axios.get(`/api/stat?method=${method}`)
}

function getSessionsByGroup(groupNumber) {
  return Axios.get(`/api/byGroup?group=${groupNumber}`)
}

function getSessionsByTeacher(teacher) {
  return Axios.get(`/api/byTeacher?teacher=${teacher}`)
}

export default {
  addGroup,
  addSession,
  addSubject,
  getGroups,
  deleteGroup,
  getSubjects,
  deleteSession,
  getSessions,
  stat,
  getSessionsByGroup,
  getSessionsByTeacher
}