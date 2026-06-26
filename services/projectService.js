const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const Project = require("../models/projectModel");
const { createActivityLog } = require("./activityLogService");
exports.setCreatedBy = (req, res, next) => {
  req.body.createdBy = req.user._id;
  next();
};

//@ desc Get list of project
//@ route Get /api/v1/project
// @acess piblic
exports.getProjects = factory.getAll(Project);
////////////////////////////////////////////
// @desc Get Specific project by id
// @route Get /api/v1/project/:id
// @access public
exports.getProject = factory.getOne(Project);

//@desc createProject
//@route post /api/v1/Project
//@access private

exports.createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);

  await createActivityLog({
    action: "CREATE_PROJECT",
    user: req.user._id,
    workspace: project.workspace,
    description: `${req.user.name} created project ${project.title}`,
  });

  res.status(201).json({
    data: project,
  });
});
/////////////////////////////////////////
//@desc Update specific project
//@route Put /api/v1/project/:id
//@access private
exports.updateProject = factory.updateOne(Project);

////////////////////////////////////////////////
//@desc Delete specific Project
//@route Delete /api/v1/Project/:id
//@access private
exports.deleteProject = factory.deleteOne(Project);
