const Mongoose = require('mongoose');

const Course = Mongoose.model("course", {
	title: String,
	author: String,
	description: String,
	topic: String,
	url: String
});

module.exports = Course;
