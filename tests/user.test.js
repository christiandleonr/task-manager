const { TestScheduler } = require('jest')
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

beforeEach(async () => {
    await User.deleteMany()
})

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