const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');

const rollbar = new Rollbar({
    accessToken: '6f6ce945ae624ff7b98def756ec8f1c6',
    captureUncaught: true,
    captureUnhandledRejections: true
});

const app = express();

app.use(express.json())
app.use('/style', express.static(path.join(__dirname, './public/styles.css')))


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
});

let characters = [
    {
        id: 0,
        firstName: 'Jake', 
        lastName: 'Peralta', 
        gender: 'male',
        age: 39, 
        likes: ['Amy', 'Die Hard', 'Taylor Swift']
    }, 
    {
        id: 2, 
        firstName: 'Rosa', 
        lastName: 'Diaz', 
        gender: 'female',
        age: 34, 
        likes: ['motorcycles', 'Nancy Meyers', 'weapons']
    }, 
    {
        id: 1, 
        firstName: 'Amy', 
        lastName: 'Santiago', 
        gender: 'female', 
        age: 37, 
        likes: ['binders', 'grammar', 'dancing']
    }, 
    {
        id: 3,
        firstName: 'Charles', 
        lastName: 'Boyle', 
        gender: 'male',
        age: 42, 
        likes: ['Jake', 'dogs', 'food']
    }
]

// app.get('/characters', (req, res) => {
//     console.log('hit chars')
//     res.status(200).send(characters)
// })

// app.get('/character/:name', (req, res) => {
//     const { name } = req.params
//     const index = characters.findIndex(char => char.firstName.toLowerCase() === name)
//     res.status(200).send(characters[index])
// })

// app.get('/character', (req, res) => {
//     const { age } = req.query
    
//     let filtered = characters.filter(char => {
//         return char.age > age
//     })

//     res.status(200).send(filtered)
// })

// let id = 4

// app.post('/character', (req, res) => {
//     let newChar = {...req.body, id}
//     newChar.likes = newChar.likes.slice(0, 3)
//     characters.unshift(newChar)
//     res.status(200).send(characters)
//     id++
// })

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server up on ${port}`));