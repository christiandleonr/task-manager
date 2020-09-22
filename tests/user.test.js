const { TestScheduler } = require('jest')
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: 'kiensave'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
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

test('Login existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)
})

test('Not login nonexistent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'perroque@example.com',
            password: 'nomuerde'
        })
        .expect(400)
})