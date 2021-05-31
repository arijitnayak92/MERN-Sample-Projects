const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("../passport/fac_pass");
const Mcq = require("../database/models/Faculty/mcq");
const User = require("../database/models/Faculty/user");
const TestHistory = require("../database/models/Faculty/test_history");
const Skills = require("../database/models/Faculty/skills");
const TestRef = require("../database/models/Faculty/test_ref");
const Question = require("../database/models/Faculty/question");
const SuperAdmin = require("../database/models/Faculty/super_admin");
var nodemailer = require("nodemailer");
require("datejs");

console.log("Connected to Server !!");

let app_pass = "mtbviksyovrrtjkt";
let app_mail = "etestsrm@gmail.com";

/**-------------Signup---------- */
router.get("/", (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});
router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

router.post("/faclogin", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401);
      res.send(info.message);
      return;
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      var userInfo = {
        username: req.user.username,
        h_order: req.user.h_order,
      };
      res.send(userInfo);
    });
  })(req, res, next);
});

router.post("/signup", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      //console.log('User.js post error: ', err)
    } else if (user) {
      var emsg = {
        emsg: "User already taken",
      };
      res.send(emsg);
    } else {
      const newUser = new User({
        title: req.body.title,
        name: req.body.name,
        username: req.body.username,
        mailid: req.body.mailid,
        phone: req.body.phone,
        campus: req.body.campus,
        dept: req.body.dept,
        desgn: req.body.desgn,
        password: req.body.password,
      });
      newUser.save((err, savedUser) => {
        if (err) {
        } else if (savedUser) {
          var succ = {
            succ: "Successful SignedUP",
          };
          res.send(succ);
        }
      });
    }
  });
});

router.post("/mcq_upload", (req, res) => {
  const newMcq = new Mcq({
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer,
  });
  newMcq.save((err, savedMcq) => {
    if (err) {
      console.log(err);
    } else if (savedMcq) {
      var succ = {
        succ: "Successfully Uploaded",
      };
      res.send(succ);
    }
  });
});

router.post("/add_test", function (req, res) {
  var trans = new TestHistory(req.body.data);
  trans.save((err, savedUser) => {
    var succ = {
      succ: "Done",
    };
    res.send(succ);
  });
});

router.post("/edit_test", function (req, res) {
  TestHistory.updateOne(
    {
      $and: [{ serial: req.body.data.serial }, { username: req.user.username }],
    },
    req.body.data,
    (err, user) => {
      var succ = {
        succ: "Successful SignedUP",
      };
      res.send(succ);
    }
  );
});

router.post("/fetch_test", function (req, res) {
  if (req.user) {
    TestHistory.find(
      {
        $and: [
          { type: req.body.type },
          { layout: req.body.layout },
          { username: req.user.username },
        ],
      },
      function (err, docs) {
        if (err) {
          res.status(500).send("error");
        } else {
          res.send(docs);
        }
      }
    );
  } else {
    let data = [];
    res.send(data);
  }
});
router.post("/fetch_test_to_edit", function (req, res) {
  TestHistory.findOne(
    { $and: [{ serial: req.body.id }, { username: req.user.username }] },
    function (err, docs) {
      if (err) {
        res.status(500).send("error");
      } else {
        res.send(docs);
      }
    }
  );
});

router.post("/delete_test", function (req, res) {
  TestHistory.deleteOne(
    { $and: [{ serial: req.body.serial }, { username: req.user.username }] },
    function (err, succ) {
      res.send("OK");
    }
  );
});

router.post("/add_questions", function (req, res) {
  console.log(req.body);
  var trans = new Question(req.body.data);
  trans.save((err, savedUser) => {
    var succ = {
      succ: "Done",
    };
    res.send(succ);
  });
});

router.post("/edit_questions", function (req, res) {
  Question.updateOne(
    {
      $and: [{ serial: req.body.data.serial }, { username: req.user.username }],
    },
    req.body.data,
    (err, user) => {
      var succ = {
        succ: "Successful SignedUP",
      };
      res.send(succ);
    }
  );
});

router.post("/fetch_questions", function (req, res) {
  if (req.user) {
    //console.log(req.body);
    let query;
    if (req.body.admin_action === true) {
      query = {
        $and: [
          { skill_name: req.body.skill_name },
          { level: req.body.level },
          { question_type: req.body.question_type },
        ],
      };
    } else if (req.body.action === "question_set") {
      query = {
        $and: [
          { course_id: req.body.course_id },
          { username: req.user.username },
        ],
      };
    } else {
      query = {
        $and: [
          { skill_name: req.body.skill_name },
          { level: req.body.level },
          { question_type: req.body.question_type },
          { username: req.user.username },
        ],
      };
    }
    Question.find(query, function (err, docs) {
      if (err) {
        res.status(500).send("error");
      } else {
        res.send(docs);
      }
    });
  } else {
    let data = [];
    res.send(data);
  }
});

router.post("/fetch_part_of_questions", function (req, res) {
  if (req.user) {
    console.log(req.body);
    let query;
    if (req.body.admin_action === true) {
      query = {
        $and: [
          { skill_name: req.body.skill_name },
          { level: req.body.level },
          { question_type: req.body.question_type },
        ],
      };
    } else if (req.body.action === "question_set") {
      query = { $and: [{ course_id: req.body.course_id }] };
    } else {
      query = {
        $and: [
          { skill_name: req.body.skill_name },
          { level: req.body.level },
          { question_type: req.body.question_type },
          { username: req.user.username },
        ],
      };
    }
    Question.find(query, function (err, docs) {
      if (err) {
        res.status(500).send("error");
      } else {
        res.send(docs);
      }
    });
  } else {
    let data = [];
    res.send(data);
  }
});

router.post("/fetch_questions_to_edit", function (req, res) {
  Question.findOne(
    { $and: [{ serial: req.body.id }, { username: req.user.username }] },
    function (err, docs) {
      if (err) {
        res.status(500).send("error");
      } else {
        res.send(docs);
      }
    }
  );
});

router.post("/delete_questions", function (req, res) {
  Question.deleteOne(
    { $and: [{ serial: req.body.serial }, { username: req.user.username }] },
    function (err, succ) {
      res.send("OK");
    }
  );
});

router.get("/fetch_skills", function (req, res) {
  Skills.find({}, function (err, data) {
    if (err) {
      res.status(500).send("error");
    } else {
      res.send(data);
    }
  });
});

router.post("/check_availability", function (req, res) {
  Question.find(
    {
      $and: [
        { course_id: req.body.props_data.state.course_id },
        { level: req.body.data.level },
        { question_type: req.body.data.question_type },
      ],
    },
    function (err, data) {
      if (err) {
        res.status(500).send("error");
      } else {
        let count = 0;
        Array.apply(null, {
          length: parseInt(req.body.data.q_combination),
        }).map((content, index) => {
          let dataset = data.filter(
            (item) =>
              item.mark ===
              parseInt(req.body.data["mark_for_combination" + (index + 1)])
          );
          if (
            parseInt(req.body.data["no_of_question" + (index + 1)]) >
            dataset.length
          ) {
          } else {
            count = count + 1;
          }
        });

        if (count === parseInt(req.body.data.q_combination)) {
          res.send("ok");
        } else {
          res.send("no");
        }
      }
    }
  );
});

router.post("/add_combination", function (req, res) {
  TestHistory.updateOne(
    {
      $and: [
        { _id: req.body.refer_data._id },
        { username: req.body.props_data.state.username },
        { type: req.body.refer_data.type },
      ],
    },
    {
      $set: {
        combination: req.body.data.combination,
        question_setup: req.body.question_setup,
      },
    },
    function (err, data) {
      if (err) {
        res.status(500).send("error");
      } else {
        if (data.nModified === 1) {
          res.send("ok");
        } else {
          res.send("no");
        }
      }
    }
  );
});

router.post("/delete_combination", function (req, res) {
  TestHistory.findOne(
    {
      $and: [
        { _id: req.body.refer_data._id },
        { username: req.body.props_data.state.username },
        { type: req.body.refer_data.type },
      ],
    },
    function (err, data) {
      if (err) {
        res.status(500).send("error");
      } else {
        let combination = data.combination.filter(
          (item, j) => req.body.index !== j
        );
        TestHistory.updateOne(
          {
            $and: [
              { _id: req.body.refer_data._id },
              { username: req.body.props_data.state.username },
              { type: req.body.refer_data.type },
            ],
          },
          { $set: { combination: combination } },
          function (err1, data1) {
            if (err1) {
              res.status(500).send("error");
            } else {
              if (data1.nModified === 1) {
                res.send("ok");
              } else {
                res.send("no");
              }
            }
          }
        );
      }
    }
  );
});

router.post("/save_random_testsetup", function (req, res) {
  TestHistory.updateOne(
    {
      $and: [
        { _id: req.body.refer_data._id },
        { username: req.body.props_data.state.username },
        { type: req.body.refer_data.type },
      ],
    },
    { $set: { questions: req.body.data.generateset } },
    function (err, data) {
      if (err) {
        res.status(500).send("error");
      } else {
        if (data.nModified === 1) {
          var datsets = new TestRef({
            exam_details: req.body.refer_data,
            questions: req.body.data.finalarray,
          });
          datsets.save((err1, done) => {
            if (err1) {
              res.status(500).send("error");
            } else {
              res.send("ok");
            }
          });
        } else {
          res.send("no");
        }
      }
    }
  );
});

router.post("/save_choice_setup", function (req, res) {
  TestHistory.updateOne(
    {
      $and: [
        { _id: req.body.refer_data._id },
        { username: req.body.props_data.state.username },
        { type: req.body.refer_data.type },
      ],
    },
    { questions: req.body.questions },
    function (err, data) {
      if (err) {
        res.status(500).send("error");
      } else {
        if (data.nModified === 1) {
          TestRef.findOne(
            { exam_id: req.body.refer_data.serial },
            (error, found) => {
              if (error) {
              } else if (found) {
                TestRef.updateOne(
                  { exam_id: req.body.refer_data.serial },
                  { questions: req.body.questions },
                  function (err2, data2) {
                    if (err) {
                      res.status(500).send("error");
                    } else {
                      if (data2.nModified === 1) {
                        res.send("ok");
                      } else {
                        res.send("no");
                      }
                    }
                  }
                );
              } else {
                var datsets = new TestRef({
                  exam_id: req.body.refer_data.serial,
                  exam_details: req.body.refer_data,
                  questions: req.body.questions,
                });
                datsets.save((err1, done) => {
                  if (err1) {
                    //console.log('error here');
                    res.status(500).send("error");
                  } else {
                    res.send("ok");
                  }
                });
              }
            }
          );
        } else {
          res.send("no");
        }
      }
    }
  );
});

//CSVReader

// Questions add

router.post("/mcq_upload", (req, res) => {
  const newMcq = new Mcq({
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer,
  });
  newMcq.save((err, savedMcq) => {
    if (err) {
      console.log(err);
    } else if (savedMcq) {
      var succ = {
        succ: "Successfully Uploaded",
      };
      res.send(succ);
    }
  });
});

router.post("/truefalse_upload", (req, res) => {
  const newTrueFalse = new Question({
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    answer: req.body.answer,
  });
  newTrueFalse.save((err, savedTrueFalse) => {
    if (err) {
      console.log(err);
    } else if (savedTrueFalse) {
      var succ = {
        succ: "Successfully Uploaded",
      };
      res.send(succ);
    }
  });
});

router.post("/oneword_upload", (req, res) => {
  const newOneWord = new Question({
    question: req.body.question,
    answer: req.body.answer,
  });
  newOneWord.save((err, savedOneWord) => {
    if (err) {
      console.log(err);
    } else if (savedOneWord) {
      var succ = {
        succ: "Successfully Uploaded",
      };
      res.send(succ);
    }
  });
});

router.post("/match_upload", (req, res) => {
  const newMatch = new Question({
    left1: req.body.left1,
    left2: req.body.left2,
    left3: req.body.left3,
    left4: req.body.left4,
    left5: req.body.left5,
    right1: req.body.right1,
    right2: req.body.right2,
    right3: req.body.right3,
    right4: req.body.right4,
    right5: req.body.right5,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    answer4: req.body.answer4,
    answer5: req.body.answer5,
  });
  newMatch.save((err, savedMatch) => {
    if (err) {
      console.log(err);
    } else if (savedMatch) {
      var succ = {
        succ: "Successfully Uploaded",
      };
      res.send(succ);
    }
  });
});

router.post("/shortlong_upload", (req, res) => {
  const newShortLong = new Question({
    question: req.body.question,
  });
  newShortLong.save((err, savedShortLong) => {
    if (err) {
      console.log(err);
    } else if (savedShortLong) {
      var succ = {
        succ: "Successfully Uploaded",
      };
      res.send(succ);
    }
  });
});

/*Super Admin Action*/

router.post("/add_actions_S", function (req, res) {
  console.log(req.body);
  var trans = new SuperAdmin(req.body.data);
  trans.save((err, savedUser) => {
    var succ = {
      succ: "Done",
    };
    res.send(succ);
  });
});

router.post("/edit_actions_S", function (req, res) {
  SuperAdmin.updateOne(
    { $and: [{ serial: req.body.data.serial }] },
    req.body.data,
    (err, user) => {
      var succ = {
        succ: "Successful SignedUP",
      };
      res.send(succ);
    }
  );
});

router.post("/fetch_data_S", function (req, res) {
  if (req.user) {
    //  console.log(req.body.campus);
    let query;
    if (req.body.fix_action) {
      query = { $and: [{ action: req.body.fix_action }] };
    } else {
      query = {};
    }
    //console.log(query);
    SuperAdmin.find(query, function (err, docs) {
      if (err) {
        res.status(500).send("error");
      } else {
        //console.log(docs);
        res.send(docs);
      }
    });
  } else {
    let data = [];
    res.send(data);
  }
});
router.post("/edit_actions_S_for_existing_data", function (req, res) {
  SuperAdmin.findOne({ $and: [{ serial: req.body.id }] }, function (err, docs) {
    if (err) {
      res.status(500).send("error");
    } else {
      res.send(docs);
    }
  });
});

router.post("/del_action_S", function (req, res) {
  SuperAdmin.deleteOne(
    { $and: [{ serial: req.body.serial }] },
    function (err, succ) {
      res.send("OK");
    }
  );
});

router.post("/checkadmin", function (req, res) {
  User.findOne({ username: req.user.username }, function (err, found) {
    if (err) {
    } else if (found) {
      if (bcrypt.compareSync(req.body.password, found.password)) {
        var succ = {
          succ: "Matched",
        };
        res.send(succ);
      } else {
        var fail = {
          fail: "fail",
        };
        res.send(fail);
      }
    } else if (!found) {
    }
  });
});

router.post("/validate-co-admin", (req, res) => {
  let password = bcrypt.hashSync(req.body.password, 10);
  User.findOne(
    { $and: [{ username: req.body.username }, { deptToken: req.body.id }] },
    (err, user) => {
      if (err) {
        res.status(500).send("error");
      } else if (user) {
        if (user.active === true && user.deptToken) {
          res.send("no");
        } else {
          User.updateOne(
            {
              $and: [
                { username: req.body.username },
                { deptToken: req.body.id },
              ],
            },
            {
              $set: {
                password: password,
                suspension_status: false,
                active: true,
              },
            },
            (err, done) => {
              if (err) {
                res.status(500).send("error");
              } else if (done) {
                res.send("ok");
              }
            }
          );
        }
      } else if (!user) {
        res.send("no");
      }
    }
  );
});

router.post("/insert-co-admin", (req, res) => {
  User.findOne(
    {
      $and: [
        { username: req.body.data.username },
        { h_order: req.body.data.h_order },
      ],
    },
    (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send("error");
      } else if (user) {
        if (user.deptToken) {
          res.send("no");
        } else {
          mailToDeptAdmin(req.body.data, req, res);
        }
      } else {
        const newadmin = new User(req.body.data);
        newadmin.save((err, savedUser) => {
          if (err) {
            res.status(500).send("error");
          } else if (savedUser) {
            mailToDeptAdmin(req.body.data, req, res);
          }
        });
      }
    }
  );
});

function mailToDeptAdmin(data, req, res) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: app_mail,
      pass: app_pass,
    },
  });
  var string = "03@#ABC9DEF12GH46IJKLM$%NOPQ5RST78UVWXYZ";
  let OTP = "";
  var len = string.length;
  for (let i = 0; i < 6; i++) {
    OTP += string[Math.floor(Math.random() * len)];
  }
  const token = OTP;
  const mailOptions = {
    from: "ework.care@gmail.com",
    to: data.mailid,
    subject: "Team eSeat : " + req.body.data.admin_type + " Choosen",
    html:
      "<p>Dear User,</p><br /><p>You are receiving this message from eSeat team.You have been choosen as a " +
      req.body.data.admin_type +
      " for eSeat. In order to validate yourself kindlly navigate " +
      '<a href="http://localhost:3000/etest/valid_campus_admin"><b>Here<b></a> </p><br /><p>Please use this code <b>' +
      token +
      "</b> [ Every Letter is in Capital Letter ] at the time of signup.And one more important info,your username is - <b>" +
      req.body.data.username +
      "</b></p><br />Thank You.",
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.status(500).send("error");
    } else {
      User.updateOne(
        {
          $and: [
            { username: data.username },
            { campus: data.campus },
            { college: data.college },
            { mailid: data.mailid },
            { h_order: data.h_order },
          ],
        },
        { $set: { deptToken: token } },
        (err, user) => {
          if (err) {
            res.status(500).send("error");
          } else {
            res.send("ok");
          }
        }
      );
    }
  });
}

module.exports = router;
