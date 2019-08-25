const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Course } = require('./models/course');
const { Assignment } = require('./models/assignment');
const { Student } = require('./models/student');
const { AssignmentScore } = require('./models/assignmentScore');

const cors = require('cors');

app.options('*', cors());
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

mongoose.connect('mongodb://localhost/playground',  { useNewUrlParser: true })
    .then(() => console.log("connected to mongodb"));

const dataArray = [
    { greeting: "shit is real funky yo!", title: "Comm 101"},
    { greeting: "MAJOR CHAGES RIGHT HERE YO!", title: "English"},
    { greeting: "poop is real funky yo!", title: "Pottery 101"},
    { greeting: "shart is real funky yo!", title: "History 101"},
    { greeting: "shit is real funky yo!", title: "Physics 101"}
]

app.get('/', (req, res, next) => {
    console.log("get route activated");
    res.send(dataArray);
});
    
app.get('/api/courses', async (req, res) => {
    const courses = await Course.find()
        .exec()
        .then((param) => {
            console.log(param);
            return param;
        })
    res.send(courses);
});

app.get('/api/assignments/recent', async (req, res) => {
    
    try {
        console.log("app.get assignment latest");


        Assignment.findOne()
        .sort({ _id : -1 })
        .limit(3)
        .exec((err, data) => {
            try {
            console.log(data);
            res.json(data)
            } catch {
                res.status(500).send(err);
            }
        }); 

        // res.send(mostRecent);
    } catch(error) {
        res.status(500).send(error);
    }
});

app.get('/api/students/recent', async (req, res) => {
    
    try {
        console.log("app.get students latest");


        Student.findOne()
        .sort({ _id : -1 })
        .limit(3)
        .exec((err, data) => {
            try {
            console.log(data);
            res.json(data)
            } catch {
                res.status(500).send(err);
            }
        }); 

        // res.send(mostRecent);
        
    } catch(error) {
        res.status(500).send(error);
    }

});

app.get('/api/courses/recent', async (req, res) => {
    
    try {
        console.log("app.get courses latest");

        Course.findOne()
        .sort({ _id : -1 })
        .limit(3)
        .exec((err, data) => {
            try {
            console.log(data);
            res.json(data)
            } catch {
                res.status(500).send(err);
            }
        }); 

        // res.send(mostRecent);
    } catch(error) {
        res.status(500).send(error);
    }
});

app.get('/api/students', async (req, res) => {
    const student = await Student.find()
        .exec()
        .then((param) => {
            console.log(param);
            return param;
        })
    res.send(student);
});

app.get('/api/assignments', async (req, res) => {
    const student = await Assignment.find()
        .exec()
        .then((param) => {
            console.log(param);
            return param;
        })
    res.send(student);
});

app.get('/api/assignmentscore', async (req, res) => {
    const assignmentscore = await AssignmentScore.find()
        .exec()
        .then((param) => {
            console.log(param);
            return param;
        })
    res.send(assignmentscore);
});
    
app.post('/api/courses', async (req, res) => {
    
    try {
        console.log(req.body);

        const newPost = req.body;

        const course = new Course(newPost);

        const courseResult = course.save();
        console.log(courseResult);

        res.send(course);
    } catch(error) {
        res.status(500).send(error);
    }
});

app.post('/api/assignmentscore', async (req, res) => {
    console.log("app.post assignmentScore called");
    try {
        console.log(req.body);

        const newPost = req.body;

        const assignmentScore = new AssignmentScore(newPost);

        const assignmentScoreResult = assignmentScore.save();
        console.log(assignmentScoreResult._id);
        console.log("poop");
        const assignmentScoreId = assignmentScore._id;
        console.log(assignmentScoreId);

        res.send(assignmentScoreId);
    } catch(error) {
        res.status(500).send(error);
    }
});

app.put('/api/students/:id', async (req, res) => {
    console.log('appPUTinVoked!!');
    console.log(req.params.id);
    const student = await Student.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            courseId: req.body.courseId
        });

    res.send(student);
});

app.put('/api/assignmentscore/:id', async (req, res) => {
    console.log('assignmentscore PUT inVoked!!');
    console.log(req.params.id);
    const assignmentscore = await AssignmentScore.findByIdAndUpdate(req.params.id, 
        {
            assignmentId: req.body.assignmentId,
            studentId: req.body.studentId,
            courseId: req.body.courseId,
            score: req.body.score
        });
  
    res.send(assignmentscore);
});

app.put('/api/assignments/:id', async (req, res) => {
    console.log('assignments PUT inVoked!!');
    console.log(req.params.id);
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            total: req.body.total,
            courseId: req.body.courseId,
        });
  
    res.send(assignment);
});

app.delete('/api/students/:id', async(req, res) => {
    console.log('remove student from DB invoked');
    console.log(req.params.id);
    const student = await Student.findByIdAndRemove(req.params.id);

    res.send(student);
});

app.delete('/api/assignmentscore/:id', async(req, res) => {
    console.log('remove assignmentscore backend invoked');
    console.log(req.params.id);

    const assignmentscore = await AssignmentScore.findByIdAndRemove(req.params.id);

    res.send(assignmentscore);
})

app.post('/api/students', async (req, res) => {
    
    try {
        console.log(req.body);

        const newPost = req.body;

        const course = new Student(newPost);

        const studentResult = course.save();
        console.log(studentResult);

        res.send(course);
    } catch(error) {
        res.status(500).send(error);
    }
});

app.post('/api/assignments', async (req, res) => {
    
    try {
        console.log("app.post submit new assignment");
        console.log(req.body);

        const newPost = req.body;

        const assignment = new Assignment(newPost);

        const assignmentResult = assignment.save();
        console.log(assignmentResult);

        res.send(assignment);
    } catch(error) {
        res.status(500).send(error);
    }
});


















