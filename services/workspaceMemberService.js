const factory = require("./handlersFactory");

const WorkspaceMember = require("../models/workspaceMemberModel");
//@ desc Get list of workSpaceMember
//@ route Get /api/v1/workspaceMember
// @acess piblic
exports.getWorkspacesMembers = factory.getAll(WorkspaceMember);
////////////////////////////////////////////
// @desc Get Specific workspaceMember by id
// @route Get /api/v1/workspaceMember/:id
// @access public
exports.getWorkspaceMember = factory.getOne(WorkspaceMember);

//@desc createWorkspaceMember
//@route post /api/v1/workspaceMember
//@access private

exports.createWorkspaceMember = factory.createOne(WorkspaceMember);
/////////////////////////////////////////
//@desc Update specific workSpaceMember
//@route Put /api/v1/workspaceMember/:id
//@access private
exports.updateWorkspaceMember = factory.updateOne(WorkspaceMember);

////////////////////////////////////////////////
//@desc Delete specific workspaceMember
//@route Delete /api/v1/workspaceMember/:id
//@access private
exports.deleteWorkspaceMember = factory.deleteOne(WorkspaceMember);
