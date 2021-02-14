const { Task } = require('../models/');

const authorization = (req, res, next) => {
  const id = +req.params.id;

  Task.findOne({
    where: { id: id }
  })
    .then(task => {
      if (!task) throw { name: "Error404", status: 404, msg: 'Task not found!' };

      if (task.UserId === +req.decoded.id) {
        next();
      } else {
        throw { name: "Error401", status: 401, msg: 'You are not authorized to perform this action' };
      }
    })
    .catch(err => {
      next(err);
    })
}

module.exports = authorization;