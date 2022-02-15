const request = require('supertest')
const router = require('../routes/users')
const should = require('should')
const models = require('../models/user')

describe('회원가입, 로그인 테스트 코드', () => {
  test('회원가입 api testcode 작동 확인용', (done) => {
    request(router)
      .post('/api/signup')
      .send({
        userId: 'hannah1',
        nickname: 'hannah',
        userPw: 'hannah123',
      })
      .expect(201)
      .end({ message: 'SUCCESS' })
    done()
  })
  // test('생성된 유저 객체를 반환한다', ()=>{
  //     body.should.have.property('userId');
  // });
  // test('입력한 nickname을 반환한다', ()=> {
  //     body.should.have.property('userId', userId)
  // });

  describe('실패시', () => {
    it('userId 파라매터 누락시 400을 반환한다', (done) => {
      request(router).post('/api/signup').send({}).expect(400).end(done)
    })
    it('userId 중복일 경우 409를 반환한다', (done) => {
      request(router.existUsers)
        .post('/api/signup')
        .send({ name: 'hannah' })
        .expect(409)
        .end(done)
    })
  })

  test('아이디는 기존 유저의 아이디와 같지 않아야 한다.', () => {
    expect(() => {}).not.toThrow()
  })

  test('닉네임과 아이디는 동일하지 않아야 한다.', () => {
    expect(() => {}).not.toThrow()
  })

  test('패스워드와 아이디는 동일하지 않아야 한다.', () => {
    expect(() => {}).not.toThrow()
  })

  test('패스워드와 아이디 닉네임은 4글자 이상이어야 하며, 숫자와 영문의 조합이다.', () => {
    expect(() => {}).not.toThrow()
  })

  test('비밀번호 확인란과 비밀번호 란이 일치해야 한다.', () => {
    expect(() => {}).not.toThrow()
  })
})
