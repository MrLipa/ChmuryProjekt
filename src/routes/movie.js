
const {Router} = require('express')
const userModel = require('../models/movie');
const user = Router()


user.get('/', async (req,res)=>{
    const result = await userModel.findAll()
    res.json(result)
})
user.get('/:title', async (req,res)=>{
    const result = await userModel.findById(req.params.title)
    res.json(result)
})
user.post('/', async (req,res)=>{
    const result = await userModel.create(req.body)
    res.json(result)
})
user.put('/:title', async (req,res)=>{
    const result = await userModel.findByIdAndUpdate(req.params.title, req.body)
    res.json(result)
})
user.delete('/:title', async (req,res)=>{
    const result = await userModel.findByIdAndDelete(req.params.title)
    res.json(result)
})

module.exports = user;