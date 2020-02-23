const { Course } = require('../models');

const course = ({ id }) => Course.findById(id).exec();

const courses = () => Course.find().exec();

const createCourse = args => new Course(args).save();

const updateCourse = async args =>
	new Course(Object.assign(await Course.findById(args.id), args)).save();

const deleteCourse = async ({ id }) => {
	const course = await Course.findById(id);
	const ret = new Course(course);
	course.remove();
	return ret;
}

module.exports = {
	course,
	courses,
	createCourse,
	updateCourse,
	deleteCourse
}
