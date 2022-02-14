// 테스트 코드const request = require('supertest');
const should = require('should');
const app = require('../routes/users');
const request = require('supertest');
const models = require('../models/user');

// 강의 샘플 참고
describe('GET /users', ()=> {
    const users = [
        {userid: 'kimCoding'},
        {userid: 'ktj'},
        {userid: 'tj'}
    ];
    before(()=>models.sequelize.sync({force: true}));
    before(()=> models.User.bulkCreate(users)); // 테스트 용도로 bulkCreate

    describe('성공시', ()=> {
        it('유저 객체를 담은 배열로 응답한다.', (done)=> {
            request(app)
                .get('/users')
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('최대 limit 갯수만큼 응답한다  ', (done)=> {
            request(app)
                .get('/users?limit=2')
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                });
        });
    });

    describe('실패시', ()=> {
        it('limit이 숫자형이 아니면 400을 응답한다', (done)=> {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        });
    });
});


describe('GET /user/:id', ()=> {
    const users = [
        {name: 'kimCoding'},
        {name: 'ktj'},
        {name: 'tj'}
    ];
    before(()=>models.sequelize.sync({force: true}));
    before(()=> models.User.bulkCreate(users)); // 테스트 용도로 bulkCreate
    describe('성공시', ()=> {
        it('id가 1인 유저 객체를 반환한다.', (done)=> {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                })
        })
    });

    describe('실패시', ()=> {
        it('id가 숫자가 아닐경우 400으로 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done)=> {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    })
})


describe('DELETE /user/:id', ()=> {
    const users = [
        {name: 'kimCoding'},
        {name: 'ktj'},
        {name: 'tj'}
    ];
    before(()=>models.sequelize.sync({force: true}));
    before(()=> models.User.bulkCreate(users)); // 테스트 용도로 bulkCreate
    describe('성공시', ()=> {
        it('204를 응답한다', (done)=> {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    });

    describe('실패시', ()=> {
        it('id가 숫자가 아닐경우 400으로 응답한다.', (done)=> {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
})

describe('POST /users', ()=> {
    const users = [
        {name: 'kimCoding'},
        {name: 'ktj'},
        {name: 'tj'}
    ];
    before(()=>models.sequelize.sync({force: true}));
    before(()=> models.User.bulkCreate(users)); // 테스트 용도로 bulkCreate

    let name = 'ktj9418';
    let body;
    describe('성공시', ()=> {
        before((done)=> {
            request(app)
                .post('/users')
                .send({name: name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        });
        it('생성된 유저 객체를 반환한다.',  ()=>{
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다.', ()=> {
            body.should.have.property('name', name);
        })
    });

    describe('실패시', () => {
        it('name 파라미터 누락시 400을 반환한다.', (done)=> {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        });
        it('name이 중복일 경우 409를 반환한다.', (done)=> {
            request(app)
                .post('/users')
                .send({name})
                .expect(409)
                .end(done);
        })
    })
})


describe('PUT /users/:id', ( )=> {
    const users = [
        {name: 'kimCoding'},
        {name: 'ktj'},
        {name: 'tj'}
    ];
    before(()=>models.sequelize.sync({force: true}));
    before(()=> models.User.bulkCreate(users)); // 테스트 용도로 bulkCreate
    describe('성공시', ()=> {
        it('변경된 name을 응답한다.', (done)=> {
            const name = 'good';
            request(app)
                .put('/users/2')
                .expect(200)
                .send({name})
                .end((err, res)=> {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });

    describe('실패시', ()=> {
        it('정수가 아닌 id일 경우 400을 응답한다.', (done) => {
            request(app)
                .put('/users/kimCoding')
                .expect(400)
                .end(done);
        });
        it('name이 없을 경우 400응답', (done) => {
            request(app)
                .put('/users/2')
                .send({})
                .expect(400)
                .end(done);
        });
        it('없는 유저일 경우 404을 응답한다.', (done) => {
            request(app)
                .put('/users/999')
                .send({name: 'kkk9418'})
                .expect(404)
                .end(done);
        });
        it('이름이 중복일 경우 409 응답', (done) => {
            request(app)
                .put('/users/2')
                .send({name: 'kimCoding'})
                .expect(409)
                .end(done);
        });
    })
});


//node_modules/.bin/mocha index.spec.js