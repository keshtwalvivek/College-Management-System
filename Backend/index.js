import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import multer from "multer";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/uploads", express.static("uploads"));
mongoose.set('strictQuery', false);
// connect dataBase

mongoose.connect(
  "mongodb://0.0.0.0:27017/myLoginRegisterDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Above these configration part is necessary for every backend application
  },
  () => {
    console.log("DB connected !!");
  }
);
////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////   Login & register Api
// DataBase Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String, // { step 5 block}
  password: String,
});

//  DataBase model create

const User = new mongoose.model("User", userSchema);

//                  LOGIN  PAGE

app.post("/login", (req, res) => {
  // { step 4 block}
  const { email, password } = req.body;
  //console.log(req.body);
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login sucessfully", user: user });
      }
      else {
        res.send({ message: "password did'nt match " });
      }
    } else {
      res.send({ message: "user not registered " });
    }
  });
});

//                  REGISTRATION PAGE

app.post("/register", (req, res) => {
  const { name, email, password, reEnterPassword } = req.body;
  console.log(req.body);
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already registerd" }); // if user alredy register
    } else {
      const user = new User({
        name,
        email, //  for new user
        password,
      });

      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Succsessfully Registerd , Please login now " });
        }
      });
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////
//                        STUDENT PAGE TABLE DETAILS

const StudentDetailsSchema = new mongoose.Schema({
  name: String,
  email: String,
  college:String,
  phone: Number,
  dob: String,
  imagePath: String,
});

const StudentModels = new mongoose.model("info", StudentDetailsSchema);

app.get("/", (req, res) => {
  StudentModels.find({})
    .then((infos) => {
      res.json(infos);
    })
    .catch((err) => res.json(err));
});

app.get("/count", (req, res) => {
  StudentModels.countDocuments({})
    .then((infos) => {
      res.json(infos);
    }) // get all number of students details
    .catch((err) => {
      res.json(err);
    });
});

app.get("/getUser/:id", (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  StudentModels.findById({ _id: id})
    .then((infos) => {
      res.json(infos);
    })
    .catch((err) => {
      res.json(err); 
    });
   
});



// app.put("/update/:id", (req, res) => {
//   const id = req.params.id;
//   StudentModels.findByIdAndUpdate(
//     { _id: id },
//     {
//       name: req.body.name,
//       email: req.body.email,
//       college:req.body.college,
//       phone: req.body.phone,
//       dob: req.body.dob,
//       // imagePath: req.body.image,
//     }
//   )
//     .then((infos) => {
//       console.log(infos)
//       res.json(infos);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });



// app.post("/create", (req, res) => {
//   StudentModels.create(req.body)
//     .then((Details) => {
//       res.json(Details);
//     })
//     .catch((err) => {
//       res.json(err);
//     });

// });

////////////////////////////////////////////////////////////////////////////////////////////
//    form data CREATE API api
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/create-with-image", upload.single("image"), async (req, res) => {
  try {
    const { name, email,college, phone, dob } = req.body;
    const data = JSON.stringify(req.body);
    console.log(req.file.path);
    const imagePath = req.file.path;

    // Save user data and image path to the database
    const newUser = new StudentModels({
      name,
      email,
      college,
      phone,
      dob,
      imagePath,
    });
    console.log(newUser);
    await newUser.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.put("/update/:id",upload.single("image") , (req, res) => {
//   const id = req.params.id;
//   StudentModels.findByIdAndUpdate(
//     { _id: id },
//     {
//       name: req.body.name,
//       email: req.body.email,
//       college:req.body.college,
//       phone: req.body.phone,
//       dob: req.body.dob,
//       imagePath: req.body.image,
//     }
//   )
//     .then((infos) => {
//       console.log(infos)
//       res.json(infos);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });


app.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, college, phone, dob } = req.body;
    const image = req.file; // Access uploaded image file

    const updatedStudent = await StudentModels.findByIdAndUpdate(
      { _id: id },
      {
        name,
        email,
        college,
        phone,
        dob,
        imagePath: image ? image.path :image , // Update imagePath only if image is present
      },
      { new: true } // Return the updated document
    );

    res.json({ message: "Student updated successfully", student: updatedStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating student" });
  }
});

//////////////////////////////////////////////////////////////////////////////
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  StudentModels.findByIdAndDelete({ _id: id })
    .then((res) => {
      res.json(res);
    })
    .catch((err) => {
      res.json(err);
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///College Apis ///
const CollegeDetailsSchema = new mongoose.Schema({
  name: String,
  course: String,
  department:String,
  teacher: String,
  phone: Number,
  collegeImgPath: String,
});

const CollegeDetailsModel = new mongoose.model("college", CollegeDetailsSchema);

const storageCollege = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadCollegImg = multer({ storageCollege });

app.post(
  "/addCollegeDetails",
  uploadCollegImg.single("image"),
  async (req, res) => {
    const { name, course,department, teacher, phone } = req.body;
    const collegeImgPath = req.file.path;

    const newClgUser = new CollegeDetailsModel({
      name,
      course,
      department,
      teacher,
      phone,
      collegeImgPath,
    });
    console.log(newClgUser);
    await newClgUser.save();
  }
);

app.get("/getCollegeData", (req, res) => {
  CollegeDetailsModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getCollegeDataForUpdate/:id", (req, res) => {
  const id = req.params.id;
  CollegeDetailsModel.findById({ _id: id })
    .then((result) => {
      res.json(result);
      // console.log("All college data ->>>",result)
    })   
    .catch((err) => {
      console.log(err);
    });
});

// app.put("/upateCollegeData/:id", (req, res) => {
//   const id = req.params.id;
//   CollegeDetailsModel.findByIdAndUpdate(
//     { _id: id },
//     {
//       name: req.body.name,
//       course: req.body.course,
//       department:req.body.department,
//       teacher: req.body.teacher,
//       phone: req.body.phone,
//     }
//   )
//     .then((result) => {
//       res.json(result);
//       console.log("server side ->>>>>>>>>", result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


app.put("/updateCollegeData/:id", upload.single("image"), async (req, res) => {
  try {
    // Validate incoming data (consider using a validation library)
    // ...

    const id = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    
    const { name, course, department, teacher, phone } = req.body;
    const image = req.file;
    const collegeImgPath = image.path;
    // Efficiently update only necessary fields
    const updatedCollegeDetils = await CollegeDetailsModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          course,
          department,
          teacher,
          phone,
          collegeImgPath,
        },
      },
      { new: true }
    );
    console.log("updated college data ->>",updatedCollegeDetils);
    res.json({ message: "College updated successfully", college: updatedCollegeDetils });
  } catch (err) {
    console.error(err);
    // Provide more specific error messages to the user
    if (err.name === "ValidationError") {
      res.status(400).json({ message: "Invalid data provided" });
    } else {
      res.status(500).json({ message: "Error updating college" });
    }
  }
});


app.delete("/deletCollegeData/:id", (req, res) => {
  const id = req.params.id;
  CollegeDetailsModel.findByIdAndDelete({ _id : id}) 
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    console.log(err);
  })
});

//      colleges name Api for add college form

app.get("/findCollegeBYName" ,(req,res)=>{
  CollegeDetailsModel.find({})
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    console.log(err);
  })
})



//      department  Apis 
const DepartmentSchema = new mongoose.Schema({
  name: String,
});

const DepartmentModel = new mongoose.model("department", DepartmentSchema);

app.post("/create-departmentTable", async (req, res) => {
  try {
    const { name } = req.body;
    const newdata = new DepartmentModel({
      name,
    });
    await newdata.save();
    res.json({ message: "Department created successfully" });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Failed to create department" });
  }
});

app.get("/getDepartmentData", (req, res) => {
  DepartmentModel.find({})
    .then((infos) => {
      res.json(infos);
    })
    .catch((err) => res.json(err));
});

app.delete("/deletDepartmentData/:id", (req, res) => {
  const id = req.params.id;
  DepartmentModel.findByIdAndDelete({ _id : id}) 
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    console.log(err);
  })
});

////////////////////////////  teachears apis////////////
const TeacherDetailsSchema = new mongoose.Schema({
  name: String,
  email: String,
  college:String,
  department: String,
  imagePath: String,
});

const TeacherDetailsModel = new mongoose.model("teacher", TeacherDetailsSchema);



app.post("/createProferssor", upload.single("image"), async (req, res) => {
  try {
    const { name, email, college, department } = req.body;
    const imagePath = req.file.path;
  console.log(imagePath)
    const newUser = new TeacherDetailsModel({
      name,
      email,
      college,
      department,
      imagePath,
    });
    console.log(newUser)
    await newUser.save();

    res.json({details: newUser , message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.get("/getProfessorData", (req, res) => {
  TeacherDetailsModel.find({})
    .then((infos) => {
      res.json(infos);
    })
    .catch((err) => res.json(err));
});

app.delete("/deleteProfessorData/:id", (req, res) => {
  const id = req.params.id;
  TeacherDetailsModel.findByIdAndDelete({ _id : id}) 
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    console.log(err);
  })
});

app.listen(9002, () => {
  console.log("server is running on localhost: 9002");
});
