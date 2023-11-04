// const Todo = require("../model/todoModel");
// const cron = require("node-cron");
// const sendEmailReminder = require("../utils/setReminder");

// const setReminder = async () => {
//     try {
//       const todos = await Todo.find();
      
//       // Send reminders for each task
//       todos.forEach((todo) => {
//         const todoDateTime = todo.dateTime ;
//         if(todoDateTime){
//         const cronPattern = `${todoDateTime.getMinutes()} ${todoDateTime.getHours()} ${todoDateTime.getDate()} ${todoDateTime.getMonth() + 1} *`;
//         console.log("cron pattern:",cronPattern)
//         cron.schedule("* * * * *", () => {
//             console.log("cron runs")
//             sendEmailReminder(todo);
//         });
//         }
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   module.exports = {setReminder};
//   //fuction as property