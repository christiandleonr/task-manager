const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const {success, message, error, route} = require('../utilities/colors')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail, sendCancelationEMail} = require('../emails/account')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({token, user})

        console.log(success(201), route(req.method), route(req.path), message('the user was succesfully created!'))
    }catch(e) {
        res.status(400).send(e)

        console.log(error(400), route(req.method), route(req.path), message(e))
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({token, user})

        console.log(success(200), route(req.method), route(req.path), message('login succesfully!'))
    } catch (e) {
        res.status(400).send(e)
        console.log(error(400), route(req.method), route(req.path), message(e))
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)

        await req.user.save()

        res.send()
        console.log(success(200), route(req.method), route(req.path), message('logout succesfully!'))
    } catch (e) {
        res.status(500).send(e)
        console.log(error(500), route(req.method), route(req.path), message(e))
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.send()

        console.log(success(200), route(req.method), route(req.path), message('logout all succesfully!'))
    } catch (e) {
        res.status(500).send(e)
        console.log(error(500), route(req.method), route(req.path), message(e))
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        console.log(error(400), route(req.method), route(req.path), message('Invalid updates!'))

        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
    
        res.send(req.user)
        console.log(success(200), route(req.method), route(req.path), message('user profile consulted successfully!'))
    }catch (e) {
        res.status(500).send(e)
        console.log(error(500), route(req.method), route(req.path), message(e))
    }
})

router.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.remove()
        sendCancelationEMail(req.user.email, req.user.name)

        res.send(req.user)

        console.log(success(200), route(req.method), route(req.path), message('user deleted successfully!'))
    } catch (e) {
        res.status(500).send(e)
        console.log(error(500), route(req.method), route(req.path), message(e))
    }
})

const upload = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)/)){
            return cb(new Error('Please upload a image'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()

    console.log(success(200), message('file uploaded successfully!'))
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
    console.log(error(400), route(req.method), route(req.path), message(error.message))
})

router.delete('/users/me/avatar', auth, async (req, res) => {

    try {
        req.user.avatar = undefined
        await req.user.save()

        res.send()

        console.log(success(200), route(req.method), route(req.path), message('file deleted successfully!'))
    } catch (e) {
        res.status(500).send()
        console.log(error(500), route(req.method), route(req.path), message(e))
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

        console.log(success(200), route(req.method), route(req.path), message('file consulted successfully!'))
    } catch (e) {
        res.status(404).send()
        console.log(error(404), route(req.method), route(req.path), message(e))
    }
})

module.exports = router