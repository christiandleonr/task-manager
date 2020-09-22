const { TestScheduler } = require('jest')
const request = require('supertest')
const app = require('../src/app')

test('Signup a new user', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Christian Ramirez',
            email: 'christianradele12@gmail.com',
            password: 'kiensave'
        })
        .expect(201)
})