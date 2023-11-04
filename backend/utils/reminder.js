const nodemailer = require("nodemailer");
const Todo = require("../model/todoModel");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "muhammedksafwan@gmail.com",
    pass: "afhj wthy cgbx kjbp",
  },
});
const sendEmailReminder = (task) => {
  const mailOptions = {
    from: "muhammedksafwan@gmail.com",
    to: "muhammedsafwank00@gmail.com",
    subject: "Task Reminder from PlanIt✅",
    text: `Reminder: You have a task ( ${task.title} ) scheduled for ${
      task.dateTime.split("T")[1]
    } on ${task.dateTime.split("T")[1]}`,
    // text:"Reminder : You have a task to complete for now"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email reminder error:", error);
    } else {
      console.log("Email reminder sent:", info.response);
    }
  });
};

const setReminder = async () => {
  //console.log("cron run on server")
  try {
    const todos = await Todo.find();

    todos.forEach((todo) => {
      const todoDateTime = todo.dateTime;
      const currentDateTime = new Date();
      if (
        todoDateTime.getFullYear() === currentDateTime.getFullYear() &&
        todoDateTime.getMonth() === currentDateTime.getMonth() &&
        todoDateTime.getDate() === currentDateTime.getDate() &&
        todoDateTime.getHours() === currentDateTime.getHours() &&
        todoDateTime.getMinutes() === currentDateTime.getMinutes() &&
        todoDateTime.getSeconds() === currentDateTime.getSeconds() &&
        todoDateTime.getMilliseconds() === currentDateTime.getMilliseconds()
        ) {
          sendEmailReminder(todo);
          console.log("email sent");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {setReminder};
