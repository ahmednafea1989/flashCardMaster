const { User, Questions, Score } = require("../models/index");
module.exports = {
  addQuestion: async (req, res) => {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res
        .status(400)
        .json({ error: "You must provide question and answer" });
    }
    try {
      const newQusetion = await new Questions({
        question,
        answer,
        user: req.user._id,
      }).save();
      await req.user.save();
      return res.status(200).json(newQusetion);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  addScore: async (req, res) => {
    let score = 0;
    const questionIds = [];
    for (let key in req.body) {
      const questionId = key;
      const userAnswer = req.body[key];
      const checkAnswer = await Questions.findById(questionId);
      if (!checkAnswer) {
        return res.status(200).json({ error: "No questions found" });
      }
      if (checkAnswer.answer === userAnswer) {
        console.log("yeeeeeeeeeeeee");
        score = score + 20;
        console.log(score);
      } else {
        console.log("nooooooooooo");
      }
    }
    try {
      const newScore = await new Score({ score, user: req.user._id }).save();
      req.user.scores.push(newScore);
      await req.user.save();
      return res.status(200).json(newScore);
    } catch (e) {
      console.log(e);
      return res.status(403).json({ e });
    }
  },
  getScore: async (req, res) => {
    try {
      const scores = await Score.find({ user: req.user._id });
      return res.json(scores.pop());
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getAllScore: async (req, res) => {
    try {
      const scores = await Score.find({ user: req.user._id });
      return res.json(scores);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
};