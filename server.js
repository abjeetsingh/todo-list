const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");
const Todo = require("./models/Todo");
mongoose.connect(
  "mongodb+srv://admin:password3940@todo.5dn7xyb.mongodb.net/mern-todo"
);
const port = process.env.PORT || 5001;

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post("/signup", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  newUser
    .save()
    .then(() => {
      return res.status(200).json({
        title: "user successfully added",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        title: "error",
        error: "Email already in use",
      });
    });
});

server.post("/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user)
        return res.status(400).json({
          title: "User not found",
          error: "Invalid username or password",
        });

      if (!bcrypt.compareSync(req.body.password, user.password))
        return res.status(401).json({
          title: "Login failed",
          error: "Password in incorrect",
        });

      let token = jwt.sign({ userid: user._id }, "key");

      return res.status(200).json({
        title: "Successful login",
        token: token,
      });
    })
    .catch((err) => {
      if (err)
        return res.status(400).json({
          title: "error",
          error: "Username already in use",
        });
    });
});

server.get("/user", (req, res) => {
  let token = req.header(token);

  jwt.verify(token, "key", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorised",
      });

    User.find({ _id: decoded.userID }, (err, user) => {
      if (err) return err;
      return res.status(200).json({
        title: "success",
        user: { username: user.username },
      });
    });
  });
});

// get todo route

// server.get("/todos", (req, res) => {
//   // verify
//   ("in todos");
//   jwt.verify(req.headers.token, "key", (err, decoded) => {
//     if (err)
//       return res.status(401).json({
//         title: "not authorized",
//       });

//     // now we know token is valid
//     Todo.find({ author: decoded.userId }, (err, todos) => {
//       if (err) return (err);

//       return res.status(200).json({
//         title: "success",
//         todos: todos,
//       });
//     });
//   });
// });

async function getTodos(decoded) {
  const todos = await Todo.find({ author: decoded.userID });
  return todos;
}

server.get("/todos", (req, res) => {
  jwt.verify(req.headers.token, "key", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "Unable to load todos auth fail",
      });

    getTodos(decoded)
      .then((todos) => {
        typeof todos;
        return res.status(200).json({
          title: "success",
          todos: todos,
        });
      })
      .catch(err);
  });
});

//add todo route

// mark todo as complete route

server.post("/todo", (req, res) => {
  // verify
  jwt.verify(req.headers.token, "key", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });

    let newTodo = new Todo({
      title: req.body.title,
      isCompleted: false,
      author: decoded.userId,
    });

    newTodo
      .save()
      .then(() => {
        return res.status(200).json({
          title: "successfully added",
          todo: newTodo,
        });
      })
      .catch(err);
  });
});

server.put("/todo/:todoId", (req, res) => {
  jwt.verify(req.headers.token, "key", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });

    Todo.findOne({ author: decoded.userId, _id: req.params.todoId }).then(
      (todo) => {
        todo.isCompleted = true;
        todo
          .save()
          .then(() => {
            return res.status(200).json({
              title: "success",
              todo: todo,
            });
          })
          .catch(err);
      }
    );
  });
});

// (error) => {
//   if (error) return console.log(error);

//   //saved
//   return res.status(200).json({
//     title: "success",
//     todo: todo,
//   });
// };
// server.get("/user", (res, req) => {
//   let token = req.header.token;

//   jwt.verify(token, "key", (err, decoded) => {
//     if (err)
//       return res.status(401).json({
//         title: "Not authorised",
//       });

//     User.findOne({ _id: decoded.userId }, (err, user) => {
//       if (err) return (err);

//       return res.status(200).json({
//         title: "success",
//         user: {
//           username: user.username,
//         },
//       });
//     });
//   });
// });

server.listen(port, (err) => {
  if (err) return err;
});
