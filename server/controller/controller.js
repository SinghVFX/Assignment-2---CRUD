const postdb = require("../model/model");

//The first function named "create" handles the creation of a new post in the database. The function first extracts the required data from the request body using destructuring. If the request body is empty, the function responds with a status code of 400 and a JSON message. Otherwise, a new "postdb" object is created with the extracted data, and the "save" method is called to save the object to the database. If the save operation is successful, the function responds with a status code of 200 and a success message along with the saved data in JSON format. If an error occurs, the function responds with a status code of 500 and an error message in JSON format.//

exports.create = async (req, res) => {
  const { name, title, subheading, content } = req.body;

  if (!req.body) {
    res.status(400).json({ message: "Content can not be emtpy!" });

    return;
  }

  const newpost = new postdb({ name, title, subheading, content });

  try {
    const data = await newpost.save();

    res.status(200).json({ message: "Post created successfully", data });
  } catch (err) {
    res.status(500).json({
      message: "Some error occurred while creating a create operation",
    });
  }
};

//The second function named "find" handles the retrieval of post data from the database. The function first checks if a query parameter "id" is present in the request. If so, the function retrieves the post with the specified ID using the "findById" method of the "postdb" model. If the post is not found, the function responds with a status code of 404 and a message. Otherwise, the function responds with the post data in JSON format. If the "id" parameter is not present in the request, the function retrieves all the posts using the "find" method of the "postdb" model. If an error occurs during the retrieval operation, the function responds with a status code of 500 and an error message in JSON format.//

exports.find = async (req, res) => {
  try {
    if (req.query.id) {
      const id = req.query.id;

      const data = await postdb.findById(id);
      if (!data) {
        res.status(404).json({ message: "Not found post with id " + id });
      } else {
        res.send(data);
      }
    } else {
      const post = await postdb.find();

      res.send(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "Error occurred while retrieving post information",
    });
  }
};

//The third function named "update" handles the update of an existing post in the database. The function first checks if the request body is empty. If so, the function responds with a status code of 400 and a message. Otherwise, the function extracts the "id" parameter from the request parameters and uses the "findByIdAndUpdate" method of the "postdb" model to update the post with the specified ID using the request body. If the post is not found, the function responds with a status code of 404 and a message. Otherwise, the function responds with the updated post data in JSON format. If an error occurs during the update operation, the function responds with a status code of 500 and an error message in JSON format.//

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;

  try {
    const updatedPost = await postdb.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!updatedPost) {
      res.status(404).json({
        message: `Cannot Update post with ${id}. Maybe post not found!`,
      });
    } else {
      res.send(updatedPost);
    }
  } catch (err) {
    res.status(500).json({ message: "Error Update post information" });
  }
};

//The fourth function named "delete" handles the deletion of an existing post from the database. The function extracts the "id" parameter from the request parameters and uses the "findByIdAndDelete" method of the "postdb" model to delete the post with the specified ID. If the post is not found, the function responds with a status code of 404 and a message. Otherwise, the function responds with a success message in JSON format. If an error occurs during the deletion operation, the function responds with a status code of 500 and an error message in JSON format.//

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await postdb.findByIdAndDelete(id);
    if (!data) {
      res.status(404).json({
        message: `Cannot Delete with id ${id}. Maybe id is wrong`,
      });
    } else {
      res.json({
        message: "post was deleted successfully!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Could not delete post with id=" + id,
    });
  }
};
