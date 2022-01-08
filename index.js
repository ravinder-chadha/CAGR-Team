require("dotenv").config();
require("./config/database").connect();
const User = require("./model/user");
const Post = require("./model/post");
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const port = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, height, weight, age, gender } =
      req.body;

    if (!(email && password && name)) {
      return res.sendStatus(400);
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.sendStatus(409);
    }
    let encryptedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      phone,
      height,
      weight,
      age,
      gender,
      coins: 0,
    });

    await user.save();

    return res.end(JSON.stringify(user));
  } catch (err) {
    res.sendStatus(500);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!(email && password)) {
      return res.sendStatus(400);
    }
    const user=await User.findOne({ email: email.toLowerCase() });
    
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.sendStatus(500);
      }
      if (!result) {
        return res.sendStatus(401);
      }

      return res.end(JSON.stringify(user));
    });
    
  } 
  catch (err) {
    return res.sendStatus(500);
  }
});
app.post("/post", async (req, res) => {
  try {
    const { title, description, image, author, email } = req.body;
    if (!(title && description && image && author && email)) {
      return res.sendStatus(400);
    }
    const id = uuidv4();
    const post = await Post.create({
      id: id,
      title,
      description,
      image,
      author,
      email,
    });
    await post.save();
    
    return res.sendStatus(200);
  } 
  catch (err) {
    res.sendStatus(500);
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.end(JSON.stringify(posts));
  } 
  catch (err) {
    res.sendStatus(500);
  }
});
app.post("/likes", async (req, res) => {
  try {
    const id = req.body.id;
    const posts = await Post.findOne({ id: id });
    posts.likes += 1;
    await Post.updateOne({ id: id }, { likes: posts.likes });
    await posts.save();
    return res.sendStatus(200);
  } 
  catch (err) {
    res.sendStatus(500);
  }
});
app.post("/comments", async (req, res) => {
  try {
    const id = req.body.id;
    const posts = await Post.findOne({ id: id });
    posts.comments.push({'comment':req.body.comment, 'author':req.body.author});
    await posts.updateOne({ id: id }, { comments: posts.comments });
    await posts.save();
    return res.sendStatus(200);
  } 
  catch (err) {
    res.sendStatus(500);
  }
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
