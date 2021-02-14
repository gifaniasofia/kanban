const router = require('express').Router();
const taskRouter = require('./taskRoute');
const userRouter = require('./userRoute');

router.use('/users', userRouter);
router.use('/tasks', taskRouter);

module.exports = router;