const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const Workspace = require("../models/workspaceModel");
exports.setCreatedBy = (req, res, next) => {
  req.body.createdBy = req.user._id;
  next();
};
//@ desc Get list of workSpace
//@ route Get /api/v1/workspace
// @acess piblic
exports.getWorkspaces = factory.getAll(Workspace);
////////////////////////////////////////////
// @desc Get Specific workspace by id
// @route Get /api/v1/workspace/:id
// @access public
exports.getWorkspace = factory.getOne(Workspace);

//@desc createWorkspace
//@route post /api/v1/workspace
//@access private

exports.createWorkspace = factory.createOne(Workspace);
/////////////////////////////////////////
//@desc Update specific workSpace
//@route Put /api/v1/workspace/:id
//@access private
exports.updateWorkspace = factory.updateOne(Workspace);

////////////////////////////////////////////////
//@desc Delete specific workspace
//@route Delete /api/v1/workspace/:id
//@access private
exports.deleteWorkspace = factory.deleteOne(Workspace);
