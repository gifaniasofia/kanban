const { Task, User } = require('../models/');

class TaskController {
  static addTask(req, res, next) {
    const { title, description, category } = req.body;
    const UserId = +req.decoded.id;

    Task.create({
      title,
      description,
      category,
      UserId
    })
      .then(newTask => {
        res.status(201).json(newTask);
      })
      .catch(err => {
        next(err);
      })
  }

  static getAllTask(req, res, next) {
    Task.findAll({
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    })
      .then(tasks => {
        res.status(200).json(tasks);
      })
      .catch(err => {
        next(err);
      })
  }

  static getTaskById(req, res, next) {
    const id = +req.params.id;

    Task.findOne({
      where: { id: id }
    })
      .then(task => {
        if (!task) throw { name: "Error404", status: 404, msg: 'Task not found!' };
        res.status(200).json(task);
      })
      .catch(err => {
        next(err);
      })
  }

  static updateTask(req, res, next) {
    const id = +req.params.id;
    const { title, description } = req.body;

    Task.update({
      title,
      description
    }, {
      where: { id },
      returning: true
    })
      .then(task => {
        const updatedTask = task[1][0];
        
        res.status(200).json(updatedTask);
      })
      .catch(err => {
        next(err);
      })
  }

  static updateCategory(req, res, next) {
    const id = +req.params.id;
    const { category } = req.body;

    Task.update({
      category
    }, {
      where: { id },
      returning: true
    })
      .then(task => {
        const updatedTask = task[1][0];
        
        res.status(200).json(updatedTask);
      })
      .catch(err => {
        next(err);
      })
  }

  static deleteTask(req, res, next) {
    const id = +req.params.id;
    let deletedTask;

    Task.findByPk(id)
      .then(task => {
        deletedTask = task;
        return Task.destroy({
          where: { id }
        })
      })
      .then(() => {
        res.status(200).json({ deleted_task: deletedTask, message: 'Successfully delete task' });
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = TaskController;