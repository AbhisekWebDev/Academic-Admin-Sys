const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    phone : {type : Number, required : true},
    role : {type : String, required : true},
    dept : {type : String, required : true},
    enroll_no : {type : String, required : true, unique : true},
    joiningDate: { type: Date, default: Date.now },
    photo: { type: String }
    
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
    email : {type : String, required : true, unique : true},
    phone : {type : Number, required : true},
    role : {type : String, required : true},
    dept : {type : String, required : true},
    faculty_no : {type : String, required : true, unique : true},
    joiningDate: { type: Date, default: Date.now },
    photo: { type: String }
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



// faculty assigns subjects to students
const studentSubjectSchema = new mongoose.Schema({
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Student',
        required: true
    },
    subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subject',
        required: true
    },
    enroll_no : {
        type : String,
        required: true
    },
    facultyName : {
        type : String,
        required: true
    },
    marks : {
        type : Number, 
        default : 0
    },
    attendance : {
        type : Number, 
        default : 0
    }
}, { 
    timestamps: true 
})



// exam schedule
const examScheduleSchema = new mongoose.Schema({
  subjectCode: String,
  subjectName: String,
  examDate: Date,
  createdBy: String, // optional: store faculty name/email
}, { timestamps: true })


// faculty classes
const FacultyClassSchema = new mongoose.Schema({
   facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  time: String,
  classroom: String,
  date: String // stored as YYYY-MM-DD
})


module.exports = {
    Student : mongoose.model('Student', studentSchema),
    Faculty : mongoose.model('Faculty', facultySchema),
    Subject : mongoose.model('Subject', subjectSchema),
    User : mongoose.model('User', userSchema),
    Event : mongoose.model('Event', eventSchema),
    StudentSubject : mongoose.model('StudentSubject', studentSubjectSchema),
    ExamSchedule: mongoose.model('ExamSchedule', examScheduleSchema),
    FacultyClass: mongoose.model('FacultyClass', FacultyClassSchema)
}