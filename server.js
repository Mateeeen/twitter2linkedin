const express = require('express')
const mongoose = require('mongoose')
const ImageModel = require("./models/imageModel")
const userModel = require("./models/userModel")
const bcrypt = require('bcryptjs')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
mongoose.set("strictQuery",false)

mongoose.connect('mongodb+srv://muteen:12345admin@cluster0.ejau5p7.mongodb.net/Twitter-API?retryWrites=true&w=majority')
.then(()=> console.log('Mongoose running'))
.catch(error => console.log(error))

app.get('/',(req,res) => {
    res.status(200).json({
        status: true,
        message: "Welcome to backend"
    })
})

app.get('/api/v1',(req,res) => {
    res.status(200).json({
        status: true,
        message: "Welcome to backend"
    })
})

app.get('/get',async(req,res) => {
    try{
        const images = await ImageModel.find({});
        if(images)
        res.status(200).json({ data: images})
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message: error.message})

    }
})

app.get('/user_check/:email',async(req,res) => {
    try{
        const {email} = req.params;
        const user_email = await userModel.findOne({ email: email });
        if(user_email){
            if(user_email.password == null){
                res.status(404).json({ data: 'Exists with google login'})
            }
            res.status(200).json({ data: 'Found'})
        }
        else{
            res.status(404).json({ data: 'Not found'})
        }
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message: error.message})

    }
})

app.post('/add_user',async(req,res) => {
    try{
        const user_email = await userModel.findOne({ email: req.body.email });
        if(user_email){
            if(user_email.password == null){
                const hash = await bcrypt.hash(req.body.password,10);
                req.body.password = hash
                const updated_user = await userModel.findByIdAndUpdate(user_email.id, req.body);
                res.status(200).json({ data: 'updated'})
            }
        }
        else
        {
            const password = req.body.password
            const hash = await bcrypt.hash(password,10);
            req.body.password = hash 
            const user_created = await userModel.create(req.body);
            if(user_created){
                res.status(200).json({ data: user_created})
            }
            else{
                res.status(404).json({ data: "Not found"})
            }
        }
        
        
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message: error.message})

    }
    
})

app.post('/google_signin',async(req,res) => {
    try{

        const user_email = await userModel.findOne({ email: req.body.email });
        if(user_email){
            res.status(200).json({ data: "Found"})
        }
        else{
            const user_created = await userModel.create(req.body);
            res.status(404).json({ data: "Not found"})
        }
        
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message: error.message})

    }
    
})

app.post('/login',async(req,res) => {
    try{

        const user_email = await userModel.findOne({ email: req.body.email });
        if(user_email){
            if(user_email.password == null){
                res.status(500).json({ data: 'Only exists in google login'})
            }
            const validpass = await bcrypt.compare(req.body.password,user_email.password)
            if(validpass == true){
                res.status(200).json({ data: 'Correct Password'})
            }
            else{
                res.status(300).json({ data: 'Incorrect Password'})
            }
            
        }
        else{
            res.status(404).json({ data: "Not found"})
        }
        
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message: error.message})

    }
    
})

app.put('/images_update/:id',async(req,res) => {
    try{
        const {id} = req.params;
        const images = await ImageModel.findByIdAndUpdate(id, req.body);
        if(!images){
            return res.status(404).json({message: "Cannot find"})
        }
        if(images)
        res.status(200).json({ data: images})
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message: error.message})

    }
})


app.use("*", (req, res) => {
    res.status(500).json({
        status: false,
        message: "API not found"
    })
})

app.listen(3000, () => {
    process.on("uncaughtException", (error) => {
        console.log("Server: ", error.message)
        process.exit(1)
    })

    process.on("unhandledRejection", (error) => {
        console.log("Server: ", error.message)
        process.exit(1)
    })
})



