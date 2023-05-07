require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONNECTION);

const homeStartingContent = "Do you have something to say? Do you want to share your thoughts, ideas, and stories with the world? Do you want to express yourself in your own way?"+

"If you answered yes to any of these questions, then Blog is the web app for you. "+

"Blog is a web app that lets you create and share your own blogs with the world. You can write about anything you want, from your hobbies, your opinions, your experiences, or anything else that interests you. "+

"Blog is easy to use and fun to explore. You can create your own profile and customize it with your photo, bio, and social media links. You can write and edit your blogs using a simple and intuitive editor that supports markdown formatting and media embedding. You can publish your blogs and share them with your friends, family, and followers on social media platforms. You can also discover and read blogs from other users who share your passions and interests. "+

"Blog is more than just a web app. It's a community of bloggers who support each other and inspire each other. It's a platform where you can express yourself freely and creatively. It's a place where you can find your voice and make it heard. "+

"So what are you waiting for? Join Blog today and start blogging!";

const aboutContent = "Hi, I'm the creator of this Blog, the ultimate blogging platform. My name is Danusshkumar and I'm a Full Stack Web Developer."+

"I created this Blog because I love writing and sharing my thoughts, ideas, and stories with the world. I wanted to create a web app that would allow anyone to do the same, without any hassle or limitations."+

"Blog is a web app that lets you create and share your own blogs with the world. You can write about anything you want, from your hobbies, your opinions, your experiences, or anything else that interests you."+

"Blog is easy to use and fun to explore. You can create your own profile and customize it with your photo, bio, and social media links. You can write and edit your blogs using a simple and intuitive editor that supports markdown formatting and media embedding. You can publish your blogs and share them with your friends, family, and followers on social media platforms. You can also discover and read blogs from other users who share your passions and interests."+

"Blog is more than just a web app. It's a community of bloggers who support each other and inspire each other. It's a platform where you can express yourself freely and creatively. It's a place where you can find your voice and make it heard."+

"I hope you enjoy using Blog as much as I enjoyed creating it. If you have any feedback, suggestions, or questions, feel free to contact me at [your email]. I would love to hear from you."+

"Happy blogging!";
const contactContent = "We would love to hear from you. Whether you have a question, a suggestion, a feedback, or a problem, we are here to help."+

"You can contact us by:"+

" Email: mdanusshkumar@gmail.com"+
" LinkedIn page : https://www.linkedin.com/in/danusshkumar-72b909244/"+
" Instagram id: danusshkumarofficial."+

" We will try to respond to you as soon as possible. Please be patient and respectful."+

"Thank you for using Blog, the ultimate blogging platform.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = mongoose.Schema({
  postTitle : String,
  postBody : String
});

const Post = mongoose.model("Post",postSchema);



app.get("/",async (req,res) => {

  const postsFound = await Post.find({});

  res.render("home",{heading : "Home" ,homeContent : homeStartingContent, postArr : postsFound});

});

app.get("/posts/:heading",async (req,res) => {

  const postFound = await Post.findOne({postTitle : lodash.capitalize(req.params.heading)});

  res.render("post",postFound);

  // posts.forEach((post) => {
  //   if(lodash.lowerCase(post.postTitle) === lodash.lowerCase(req.params.heading)){
  //     res.render("post",{postTitle : post.postTitle, postBody : post.postBody});
  //   }
  // });

});

app.get("/compose",(req,res) => {
  res.render("compose");
});

app.post("/compose",async (req,res) => {

  const newPost = new Post({
    postTitle : lodash.capitalize(req.body.title),
    postBody : req.body.content
  });

  await newPost.save();

  res.redirect("/");
});

app.get("/contact",(req,res) => {
  res.render("home",{heading : "Contact" , homeContent : contactContent, postArr : []});
});

app.get("/about",(req,res) => {
  res.render("home",{heading : "About" , homeContent : aboutContent, postArr : []});
});


app.listen(process.env.PORT, function() {
  console.log("Server started on port 3000");
});
