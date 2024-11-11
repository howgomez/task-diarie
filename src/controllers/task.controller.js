import Task from "../models/task.model.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config()


// Configuración de Cloudinary (asegúrate de haber configurado Cloudinary en tu proyecto)

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getTasks = async (req, res) => {

  try {
    const tasks = await Task.find({ user: req.user.id });
    if (!tasks) return res.status(404).json({ message: "No tasks found" });
    const sortedTasks = tasks.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(sortedTasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPublicTasks = async (req, res) => {
  try {

    const tasks = await Task.find({ visibility: "public" }).populate("user", "username");
    const sortedTasks = tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!sortedTasks) return res.status(404).json({ message: "No tasks found" });

    res.status(200).json(sortedTasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPrivateTasks = async (req, res) => {s
  try {
    
    const userId = req.user.id;
    console.log('soy el ID privado', userId);
    const privateTask = await Task.find({ user: userId, visibility: "private" });
    if (!privateTask) return res.status(404).json({ message: "No privateTask found" });
    const sortedTasks = privateTask.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(sortedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createTask = async (req, res) => {

  try {
    const { title, description, visibility } = req.body;

    if (!title) return res.status(400).json({ message: "Missing title, please try again" });
    if (!description) return res.status(400).json({ message: "Missing description, please try again" });

    let imageUrl = 'https://cdn4.iconfinder.com/data/icons/basic-flat-ui-extra-set-200-item/76/ui_ux_minimalist_button_crash_error_file-512.png'; // URL por defecto

    console.log(title, description, visibility, req.file);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products',
        public_id: req.file.filename,
        use_filename: true,
        // transformation: { width: 300, height: 300, crop: "fill", gravity: "auto" },
      });

      imageUrl = result.secure_url;
    }

    const newtask = new Task({
      title,
      description,
      user: req.user.id,
      visibility,
      image: imageUrl
    });

    await newtask.save();

    res.status(201).json(newtask);
    console.log(newtask);


  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, visibility } = req.body;
    //validation
    if (!title && !description) return res.status(400).json({ message: "Missing title or description, please try again" });

    const taskUpdated = await Task.findOneAndUpdate(
      { _id: id },
      { title, description, visibility },
      { new: true }
    );

    if (!taskUpdated) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({
      message: "Task updated successfully",
      task: taskUpdated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDeleted = await Task.findByIdAndDelete(id);
    if (!taskDeleted) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: `Task ${taskDeleted.title} deleted successfully` });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}