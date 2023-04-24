const axios = require("axios");

exports.homeRoutes = (req, res) => {
  console.log("WORKING");
  axios
    .get("http://localhost:3000/api/posts")
    .then(function (response) {
      console.log(response);
      res.render("index", { posts: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_post = (req, res) => {
  res.render("add_post");
};

exports.register_user = (req, res) => {
  res.render("register_user");
};

exports.signInUser = (req, res) => {
  res.render("sign_in_user");
};

exports.update_post = (req, res) => {
  axios
    .get("http://localhost:3000/api/posts", { params: { id: req.query.id } })
    .then(function (postData) {
      console.log(postData.data);

      res.render("update_post", { post: postData.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
