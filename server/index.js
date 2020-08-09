const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Course } = require("./models/course");
const { Assignment } = require("./models/assignment");
const { Student } = require("./models/student");
const { AssignmentScore } = require("./models/assignmentScore");
const { User } = require("./models/user");

require("./prod")(app);

const cors = require("cors");
// Ew2CGYTSwMsjX4yz
// mongodb atlas user password
// Ew2CGYTSwMsjX4yz

app.options("*", cors());
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Listening on port ${port}...`));

// mongoose.connect('mongodb://localhost/playground',  { useNewUrlParser: true })
//     .then(() => console.log("connected to mongodb"));

mongoose
  .connect(
    "mongodb://<patrick>:<Asherbasher8808>@ds011715.mlab.com:11715/gradesdb"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Connection failed");
  });

// mongoose.connect('mongodb+srv://patrick:Ew2CGYTSwMsjX4yz@cluster0-v2kit.mongodb.net/test?retryWrites=true&w=majority')
//     .then(() => {
//         console.log('Connected to DB');
//     })
//     .catch(() => {
//         console.log('Connection failed');
//     })

app.get("/", (req, res, next) => {
  console.log("get route activated");
  res.send(dataArray);
});

app.get("/api/courses", async (req, res) => {
  const courses = await Course.find()
    .exec()
    .then((param) => {
      console.log(param);
      return param;
    });
  res.send(courses);
});

app.get("/api/assignments/recent", async (req, res) => {
  try {
    console.log("app.get assignment latest");

    Assignment.findOne()
      .sort({ _id: -1 })
      .limit(3)
      .exec((err, data) => {
        try {
          console.log(data);
          res.json(data);
        } catch {
          res.status(500).send(err);
        }
      });

    // res.send(mostRecent);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/students/recent", async (req, res) => {
  try {
    console.log("app.get students latest");

    Student.findOne()
      .sort({ _id: -1 })
      .limit(3)
      .exec((err, data) => {
        try {
          console.log(data);
          res.json(data);
        } catch {
          res.status(500).send(err);
        }
      });

    // res.send(mostRecent);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/courses/recent", async (req, res) => {
  try {
    console.log("app.get courses latest");

    Course.findOne()
      .sort({ _id: -1 })
      .limit(3)
      .exec((err, data) => {
        try {
          console.log(data);
          res.json(data);
        } catch {
          res.status(500).send(err);
        }
      });

    // res.send(mostRecent);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/students", async (req, res) => {
  const student = await Student.find()
    .exec()
    .then((param) => {
      console.log(param);
      return param;
    });
  res.send(student);
});

app.get("/api/users", async (req, res) => {
  console.log("BACKEND GET USERS INVOKED");
  const user = await User.find()
    .exec()
    .then((param) => {
      console.log(param);
      return param;
    });
  res.send(user);
});

app.get("/api/assignments", async (req, res) => {
  const student = await Assignment.find()
    .exec()
    .then((param) => {
      console.log(param);
      return param;
    });
  res.send(student);
});

app.get("/api/assignmentscore", async (req, res) => {
  const assignmentscore = await AssignmentScore.find()
    .exec()
    .then((param) => {
      console.log(param);
      return param;
    });
  res.send(assignmentscore);
});

app.post("/api/courses", async (req, res) => {
  try {
    console.log(req.body);

    const newPost = req.body;

    const course = new Course(newPost);

    const courseResult = course.save();
    console.log(courseResult);

    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    console.log(req.body);

    const newUser = req.body;

    const user = new User(newUser);

    user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/assignmentscore", async (req, res) => {
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
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/students/:id", async (req, res) => {
  console.log("appPUTinVoked!!");
  console.log(req.params.id);
  const student = await Student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    courseId: req.body.courseId,
  });

  res.send(student);
});

app.put("/api/assignmentscore/:id", async (req, res) => {
  console.log("assignmentscore PUT inVoked!!");
  console.log(req.params.id);
  const assignmentscore = await AssignmentScore.findByIdAndUpdate(
    req.params.id,
    {
      assignmentId: req.body.assignmentId,
      studentId: req.body.studentId,
      courseId: req.body.courseId,
      score: req.body.score,
    }
  );

  res.send(assignmentscore);
});

app.put("/api/assignments/:id", async (req, res) => {
  console.log("assignments PUT inVoked!!");
  console.log(req.params.id);
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    total: req.body.total,
    courseId: req.body.courseId,
  });

  res.send(assignment);
});

app.delete("/api/students/:id", async (req, res) => {
  console.log("remove student from DB invoked");
  console.log(req.params.id);
  const student = await Student.findByIdAndRemove(req.params.id);

  res.send(student);
});

app.delete("/api/courses/:id", async (req, res) => {
  console.log("remove course from DB invoked");
  console.log(req.params.id);
  const course = await Course.findByIdAndRemove(req.params.id);

  res.send(course);
});

app.delete("/api/assignmentscore/:id", async (req, res) => {
  console.log("remove assignmentscore backend invoked");
  console.log(req.params.id);

  const assignmentscore = await AssignmentScore.findByIdAndRemove(
    req.params.id
  );

  res.send(student);
});

app.delete("/api/assignmentscore/:id", async (req, res) => {
  console.log("remove assignmentscore backend invoked");
  console.log(req.params.id);

  const assignmentscore = await AssignmentScore.findByIdAndRemove(
    req.params.id
  );

  res.send(assignmentscore);
});

app.delete("/api/assignments/:id", async (req, res) => {
  console.log("remove assignment backend invoked");
  console.log(req.params.id);

  const assignment = await Assignment.findByIdAndRemove(req.params.id);

  res.send(assignment);
});

app.post("/api/students", async (req, res) => {
  try {
    console.log(req.body);

    const newPost = req.body;

    const course = new Student(newPost);

    const studentResult = course.save();
    console.log(studentResult);

    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/assignments", async (req, res) => {
  try {
    console.log("app.post submit new assignment");
    console.log(req.body);

    const newPost = req.body;

    const assignment = new Assignment(newPost);

    const assignmentResult = assignment.save();
    console.log(assignmentResult);

    res.send(assignment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// const dataArray = [
//     { greeting: "Hey there!", title: "Comm 101"},
//     { greeting: "MAJOR CHAGES RIGHT HERE YO!", title: "English"},
//     { greeting: "!", title: "Pottery 101"},
//     { greeting: "HI THERE", title: "History 101"},
//     { greeting: "Welcome", title: "Physics 101"}
// ]
