const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
  
const password = process.argv[2]

const url = `mongodb+srv://FS_jriekki:${password}@cluster0.fd1b3ve.mongodb.net/?retryWrites=true&w=majority`
  
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
  
const Person = mongoose.model('Person', personSchema)
  
if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')
        
            const person = new Person({
                name: name,
                number: number
            })
            return person.save()
        })
        .then(() => {
            console.log(`Added ${name} with number ${number} to the phonebook!`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}
else if(process.argv.length === 3) {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('Phonebook')
            Person.find({}).then(result => {
                result.forEach(p => {
                    console.log(p.name, p.number)
                })
                mongoose.connection.close()
            })
        }).catch((err) => console.log(err))
}
else console.log(`please provide either 3 or 5 arguments. You provided ${process.argv.length} arguments.`)