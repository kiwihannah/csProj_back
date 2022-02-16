const assert = require('assert')
const request = require('supertest')
const Users = require('../user.modle')
const app = require('../routes/users')

Users.init()

describe('테스트 코드 작동 확인용', () => {
  it('jest는 정상작동 한다', () => {
    expect(true).toBe(true)
  })
})
qs
describe('idIdInDB Test', () => {
  it('find exsited user', () => {
    console.log(Users.items)
    expect(Users.isIdInDB('aaaa1111')).toBe(true)
  })
  it('find not existed user', function () {
    expect(Users.isIdInDB('hannah1234')).toBe(false)
  })
  it('empty string', function () {
    expect(Users.isIdInDB('')).toBe(false)
  })
  it('param is number', function () {
    expect(Users.isIdInDB(22)).toBe(false)
  })
  it('null type', function () {
    expect(Users.isIdInDB(null)).toBe(false)
  })
  it('undefined type', function () {
    expect(Users.isIdInDB(undefined)).toBe(false)
  })
})

describe('get findByIdPw', function () {
  it('find existed user', function () {
    const user = {
      id: 'auddn6676',
      pw: '12345',
    }
    expect(Users.findByIdPw(user)).toMatchObject(user)
  })
  it('find not existed user', function () {
    const user = {
      id: 'auddn667',
      pw: '12345',
    }
    expect(Users.findByIdPw(user)).toBeUndefined()
  })
  it('user is empty object', function () {
    const user = {}
    expect(Users.findByIdPw(user)).toBeUndefined()
  })
})

describe('test login request', () => {
  it('should success login', async () => {
    const user = {
      username: 'auddn6676',
      password: '12345',
    }
    const res = await request(app).post('/users/login').send(user)
    expect(res.statusCode).toEqual(200)
  })
  it('should not success login', async () => {
    const user = {
      username: 'auddn667',
      password: '12345',
    }
    const res = await request(app).post('/users/login').send(user)
    expect(res.statusCode).toEqual(404)
  })
  it("don't have id & pw property", async () => {
    const user = {}
    const res = await request(app).post('/users/login').send(user)
    expect(res.statusCode).toEqual(404)
  })
  it('param is undefined', async () => {
    const user = undefined
    const res = await request(app).post('/users/login').send(user)
    expect(res.statusCode).toEqual(404)
  })
  it('param is null', async () => {
    const user = null
    const res = await request(app).post('/users/login').send(user)
    expect(res.statusCode).toEqual(404)
  })
})
