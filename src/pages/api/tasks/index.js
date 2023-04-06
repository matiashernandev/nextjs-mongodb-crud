import Task from "models/Task";
import { dbConnect } from "utils/mongoose";

dbConnect();

export default async function handler(req, res) {
	const { method, body } = req;

	switch (method) {
		case "GET":
			try {
				const tasks = await Task.find();
				return res.status(200).json(tasks);
			} catch (error) {
				return res.status(400).json({ msg: error.message });
			}
		case "POST":
			try {
				console.log(body);

				const newTask = new Task(body);
				const savedTask = await newTask.save();
				return res.status(201).json(savedTask);
			} catch (error) {
				return res.status(400).json({ msg: error.message });
			}
		default:
			return res.status(400).json({ msg: "This method is not supported, F" });
	}
}
