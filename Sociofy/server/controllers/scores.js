import fetch from 'node-fetch'; // Import fetch for Node.js environment
import User from "../models/User.js"; // Import the User model
import classifyComment from './test.js'; // Import the classifyComment function from test.js


export const updateScore = async (req, res) => {
  try {
    const userId = req.params.id;
    const { text } = req.body;
    const postData = { comment: text }; // Assuming 'text' contains the comment
    const user = await User.findById(userId);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    };

    fetch('http://localhost:5000/predict', requestOptions)
      .then(response => response.json())
      .then(data => {
        // console.log('Prediction result:', data);
        // Process the prediction result here
        const { toxicity } = data;
        const averageToxicity = toxicity.reduce((acc, val) => acc + val, 0) / toxicity.length;


        console.log(user.score);
        let userScore = user.score;
        let score = 0;

        if(averageToxicity < 0.5)
        score = Math.min(95, userScore + 1);

        else
        score = Math.max(5, userScore - 1);

        // console.log('averageToxicity:', averageToxicity);
        // console.log('score:', user.score);
        
        // Update user's score in the database
        classifyComment(req, res);
        

        // User.findByIdAndUpdate(
        //   userId,
        //   { score: score },
        //   { new: true },
        //   (err, updatedUser) => {
        //     if (err) {
        //       console.error("Error updating user score:", err);
        //       // return res.status(500).json({ message: "Error updating user score" });
        //     }
        //     

        //     // console.log(updatedUser);
        //     // res.status(200).json({ message: "Score updated successfully", user: updatedUser });
        //   }
        // );
        // console.log('User1234:', user.score);
      })
      .catch(error => {
        console.error('Error:', error);
        // res.status(500).json({ message: "Internal server error" });
      });
  } catch (err) {
    console.error("Error:", err);
    // res.status(500).json({ message: "Internal server error" });
  }
};
