const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'kiensave',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
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

test('Get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Not get profile for unaunthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Not delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(500)
})