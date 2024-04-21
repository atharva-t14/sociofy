// import User from "../models/User.js";
// import Post from "../models/Post.js";
// import { PythonShell } from "python-shell";
// import path from "path";
// import { log } from "console";

// console.log("Node.js script is running...");

// export const updateScore = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const { userId, text, name, picturePath } = req.body;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const comments = user.comments;
//     const textArray = comments.map((comment) => comment.text);

//     console.log("Retrieved comments:", textArray);

//     // Call Python script with comments

//     let options = {
//       mode: "text",
//       pythonPath: "C:\\Program Files\\Python312\\python.exe",
//       pythonOptions: ["-u"],
//       scriptPath: "C:\\Users\\Nitish Sharma\\Desktop\\project\\SMP-mini-project\\Sociofy\\api",
//       args: JSON.stringify(textArray),
//     };
      
//     console.log("Calling Python script...");
//     PythonShell.run("api.py", options)
//       .then((messages) => {
//         console.log("results:", messages);
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//       });

//     // PythonShell.run("api.py", options, (err, results) => {
//     //   if (err) {
//     //     console.error("Error executing Python script:", err);
//     //     return res
//     //       .status(500)
//     //       .json({ message: "Error executing Python script" });
//     //   }

//     //   console.log("Python script output:", results);
//     //   res.status(200).json({ message: "Python script executed successfully" });
//     // });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Internal server error" }); // Catch-all for unexpected errors
//   }
// };










import User from "../models/User.js";
import Post from "../models/Post.js";
import { PythonShell } from "python-shell";
import path from "path";
import { log } from "console";

console.log("Node.js script is running...");

export const updateScore = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text, name, picturePath } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comments = user.comments;
    const textArray = comments.map((comment) => comment.text);

    console.log("Retrieved comments:", textArray);

    // Call Python script with comments

    let options = {
      mode: "text",
      pythonPath: "C:\\Program Files\\Python312\\python.exe",
      pythonOptions: ["-u"],
      scriptPath: "C:\\Users\\Nitish Sharma\\Desktop\\project\\SMP-mini-project\\Sociofy\\api",
      args: JSON.stringify(textArray),
    };
      
    console.log("Calling Python script...");
    PythonShell.run("api.py", options)
    .then((messages) => {
      console.log("results:", messages);
      const output = messages[0]; // Assuming messages contains the JSON output
  
      // Parse the JSON output
      const parsedOutput = JSON.parse(output);
  
      // Access the toxicity level from the parsed output
      const toxicityLevel = parsedOutput.toxicity;
  
      // Update user's score based on the toxicity level
      const currentScore = user.score;
  
      if (!isNaN(toxicityLevel) && !isNaN(currentScore)) {
        if (toxicityLevel > 0.5) {
          user.score = Math.max(0, currentScore - 1);
        } else {
          user.score = Math.min(95, currentScore + 1);
        }
  
        // Save the updated user
        user.save((err) => {
          if (err) {
            console.error("Error saving user:", err);
            return res.status(500).json({ message: "Error saving user" });
          }
  
          return res.status(200).json({ message: "Score updated successfully" });
        });
      } else {
        // Handle NaN values in toxicityLevel or currentScore
        console.error("Invalid toxicity level or current score");
        return res.status(500).json({ message: "Invalid data received from Python script" });
      }
    })
    .catch((err) => {
      console.error("Error executing Python script:", err);
      return res.status(500).json({ message: "Error executing Python script" });
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
