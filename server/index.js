const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const port = process.env.PORT || 8000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  //database collection
  const subjectCollection = client.db("nuconnect").collection("subjects");
  const detailedSyllCollection = client
    .db("nuconnect")
    .collection("detailedSyllabus");
  const courseCollection = client.db("nuconnect").collection("courses");
  const usersCollection = client.db("nuconnect").collection("users");
  const instructorsCollection = client
    .db("nuconnect")
    .collection("instructors");

  try {
    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      console.log("I need a new jwt", user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });
    app.get("/all-users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return;
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    app.get("/all-users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });
    app.get("/user", async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query?.email };
      }
      const result = await usersCollection.findOne(query);
      res.send(result);
    });
    //users
    // Logout
    app.get("/logout", async (req, res) => {
      app.get("/all-users", async (req, res) => {
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      });

      app.post("/users", async (req, res) => {
        const user = req.body;
        const query = { email: user.email };
        const existingUser = await usersCollection.findOne(query);
        if (existingUser) {
          return;
        }
        const result = await usersCollection.insertOne(user);
        res.send(result);
      });
      app.get("/users/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.findOne(query);
        res.send(result);
      });
      app.delete("/users/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
        res.send(result);
      });
      app.get("/user", async (req, res) => {
        let query = {};
        if (req.query?.email) {
          query = { email: req.query?.email };
        }
        const result = await usersCollection.findOne(query);
        res.send(result);
      });
      //users
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Save or modify user email, status in DB
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const isExist = await usersCollection.findOne(query);
      console.log("User found?----->", isExist);
      if (isExist) return res.send(isExist);
      const result = await usersCollection.updateOne(
        query,
        {
          $set: { ...user, timestamp: Date.now() },
        },
        options
      );
      res.send(result);
    });

    //subjects list handling
    app.get("/subjects", async (req, res) => {
      const cursor = subjectCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/detailed-syllabus", async (req, res) => {
      const cursor = detailedSyllCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/detailed-syllabus/:slug", async (req, res) => {
      const slug = req.params.slug;
      const query = { slug: slug };
      const result = await detailedSyllCollection.findOne(query);
      res.send(result);
    });
    app.post("/detailed-syllabus", async (req, res) => {
      const syllabus = req.body;
      const result = await detailedSyllCollection.insertOne(syllabus);
      res.send(result);
    });

    app.put("/detailed-syllabus/courses/:courseCode", (req, res) => {
      const courseCode = req.params.courseCode;
      const updatedCourse = req.body;

      // Find the course by courseCode and update it
      let found = false;
      detailedSyllCollection.forEach((syllabus) => {
        if (
          syllabus.details &&
          syllabus.details.firstYear &&
          syllabus.details.firstYear.courses[0]
        ) {
          const courses = syllabus.details.firstYear.courses;
          const courseIndex = courses.findIndex(
            (course) => course.courseCode === courseCode
          );
          if (courseIndex !== -1) {
            // Update the course with updatedCourse
            courses[courseIndex] = updatedCourse;
            found = true;
            return;
          }
        }
        // Add checks for other years (secondYear, thirdYear, fourthYear) if needed
      });

      if (found) {
        res
          .status(200)
          .json({ message: "Course updated successfully", updatedCourse });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    });

    app.get("/subject/:slug", async (req, res) => {
      const slug = req.params.slug;
      const query = { slug: slug };
      const result = await subjectCollection.findOne(query);
      res.send(result);
    });

    //subjects list handling
    //course collection handling
    app.get("/courses", async (req, res) => {
      const cursor = courseCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/course/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.findOne(query);
      res.send(result);
    });
    app.get("/courses/:department", async (req, res) => {
      try {
        const name = req.params.department;
        const query = { department: name };
        const result = await courseCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });
    app.post("/courses", async (req, res) => {
      const course = req.body;
      const result = await courseCollection.insertOne(course);
      res.send(result);
    });
    // Enroll in a course
    app.post("/enroll/:id", async (req, res) => {
      // const db = client.db("edutech");
      const courses = courseCollection;
      const users = usersCollection;
      const { id } = req.params;
      const { userEmail } = req.body; // from body
      try {
        // Find the course by ID
        const course = await courses.findOne({ _id: new ObjectId(id) });

        // Check if the course exists and has available seats
        if (!course) {
          return res.status(404).send("Course not found");
        }
        if (course.seatsLeft <= 0) {
          return res.status(400).send("No seats available");
        }

        // Update the user's enrolled courses
        await users.updateOne(
          { email: userEmail },
          { $push: { enrolledCourses: id } }
        );

        // Update the course's totalEnrolled and seatsLeft
        await courses.updateOne(
          { _id: new ObjectId(id) },
          {
            $inc: { totalEnrolled: 1, seatsLeft: -1 },
          }
        );

        res.status(200).send("Enrolled successfully");
      } catch (err) {
        res.status(500).send("Error enrolling in course: " + err);
      }
    });
    app.get("/user/:userEmail/enrolledCourses", async (req, res) => {
      const users = usersCollection;
      const courses = courseCollection;
      const { userEmail } = req.params;

      try {
        // Find the user by ID
        const user = await users.findOne({ _id: new ObjectId(userId) });

        // Get the enrolled courses
        const enrolledCourses = await courses
          .find({
            _id: { $in: user.enrolledCourses.map((id) => new ObjectId(id)) },
          })
          .toArray();

        res.status(200).json(enrolledCourses);
      } catch (err) {
        res.status(500).send("Error fetching enrolled courses: " + err);
      }
    });

    //course collection handling
    //instructors collection handling
    app.get("/instructors", async (req, res) => {
      const cursor = instructorsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/instructor/:id", async (req, res) => {
      const id = req.params.id;
      const query = { id: id };
      const result = await instructorsCollection.findOne(query);
      res.send(result);
    });
    app.post("/instructor/:id/reviews", async (req, res) => {
      const { id } = req.params;
      const { studentName, rating, comment, studentEmail, studentImage } =
        req.body;

      try {
        // Example of storing review in MongoDB
        const result = await instructorsCollection.updateOne(
          { id: id },
          {
            $push: {
              reviews: {
                studentName,
                rating: parseInt(rating),
                studentEmail,
                studentImage,
                comment,
                createdAt: new Date(),
              },
            },
          }
        );

        if (result.modifiedCount === 1) {
          res.status(201).json({ message: "Review added successfully" });
        } else {
          res.status(404).json({ error: "Instructor not found" });
        }
      } catch (err) {
        console.error("Error saving review:", err);
        res.status(500).json({ error: "Server error" });
      }
    });
    //instructors collection handling
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("connected by NU.connect server..");
});

app.listen(port, () => {
  console.log(`NU.connect is running on port ${port}`);
});
