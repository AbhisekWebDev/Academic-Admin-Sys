const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    phone : {type : Number, required : true},
    role : {type : String, required : true},
    dept : {type : String, required : true},
    enroll_no : {type : String, required : true},
    joiningDate: { type: Date, default: Date.now }
    
    // subjects wala hua to thik warna choro / reference to subjects
    // subjects : [{type : mongoose.Schema.Types.ObjectId, ref : 'Subject'}] 
})

// create subject schema
const subjectSchema = new mongoose.Schema({
    subjectName : String,
    subjectCode : String
})

const facultySchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    phone : {type : Number, required : true},
    role : {type : String, required : true},
    dept : {type : String, required : true},
    faculty_no : {type : String, required : true},
    joiningDate: { type: Date, default: Date.now }
})

// create user collection schema
const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    role : {type : String, required : true},
    password : {type : String, required : true}
})

// create events collection schema
const eventSchema = new mongoose.Schema({
    eventName : {type : String, require : true},
    eventDate : {type : Date, default : Date.now}
})

module.exports = {
    Student : mongoose.model('Student', studentSchema),
    Faculty : mongoose.model('Faculty', facultySchema),
    Subject : mongoose.model('Subject', subjectSchema),
    User : mongoose.model('User', userSchema),
    Event : mongoose.model('Event', eventSchema)
}