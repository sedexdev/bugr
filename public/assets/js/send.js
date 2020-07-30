const path = require("path");
const os = require("os");
const { PythonShell } = require("python-shell");

const options = {
    mode: "text",
    pythonPath: `${
        os.userInfo().homedir
    }\\AppData\\Local\\Programs\\Python\\Python37\\python.exe`,
    pythonOptions: ["-u"],
};

const projectOptions = {
    ...options,
    scriptPath: path.join(
        __dirname,
        "/",
        "../",
        "../",
        "../",
        "backend",
        "projects"
    ),
};

const groupOptions = {
    ...options,
    scriptPath: path.join(
        __dirname,
        "/",
        "../",
        "../",
        "../",
        "backend",
        "groups"
    ),
};

const issueOptions = {
    ...options,
    scriptPath: path.join(
        __dirname,
        "/",
        "../",
        "../",
        "../",
        "backend",
        "issues"
    ),
};

/*
===================================================
              Project Level Functions
===================================================
*/

const fetchProjectNames = (callback) => {
    projectOptions.args = [];
    PythonShell.run("fetch_project_names.py", projectOptions, function (
        err,
        results
    ) {
        if (err) throw err;
        callback(results);
    });
};

const loadProject = (projectId, callback) => {
    projectOptions.args = [projectId];
    PythonShell.run("load_project.py", projectOptions, function (err, results) {
        if (err) throw err;
        callback(results);
    });
};

const createProject = (projectName, callback) => {
    projectOptions.args = [projectName];
    PythonShell.run("create_project.py", projectOptions, function (
        err,
        results
    ) {
        if (err) throw err;
        callback(results);
    });
};

const deleteProject = (projectId) => {
    projectOptions.args = [projectId];
    PythonShell.run("delete_project.py", projectOptions, function (err) {
        if (err) throw err;
    });
};

/*
===================================================
              Group Level Functions
===================================================
*/

const createGroup = (projectName, projectId, groupName, callback) => {
    groupOptions.args = [projectName, projectId, groupName];
    PythonShell.run("create_group.py", groupOptions, function (err, results) {
        if (err) throw err;
        callback(results);
    });
};

const deleteGroup = (projectId, groupId) => {
    groupOptions.args = [projectId, groupId];
    PythonShell.run("delete_group.py", groupOptions, function (err) {
        if (err) throw err;
    });
};

/*
===================================================
              Issue Level Functions
===================================================
*/

const createIssue = (projectName, projectId, groupId) => {
    issueOptions.args = [projectName, projectId, groupId];
    PythonShell.run("create_issue.py", issueOptions, function (err) {
        if (err) throw err;
    });
};

const deleteIssue = (projectId, groupId, issueId) => {
    issueOptions.args = [projectId, groupId, issueId];
    PythonShell.run("delete_issue.py", issueOptions, function (err) {
        if (err) throw err;
    });
};

const editIssue = (projectId, groupId, issueId, description) => {
    issueOptions.args = [projectId, groupId, issueId, description];
    PythonShell.run("edit_issue.py", issueOptions, function (err) {
        if (err) throw err;
    });
};

const setDate = (projectId, groupId, issueId, date) => {
    issueOptions.args = [projectId, groupId, issueId, date];
    PythonShell.run("set_date.py", issueOptions, function (err) {
        if (err) throw err;
    });
};

const setPriority = (projectId, groupId, issueId, priority) => {
    issueOptions.args = [projectId, groupId, issueId, priority];

    PythonShell.run("set_priority.py", issueOptions, function (err) {
        if (err) throw err;
    });
};

const setStage = (projectId, groupId, issueId, stage) => {
    issueOptions.args = [projectId, groupId, issueId, stage];
    PythonShell.run("set_stage.py", issueOptions, function (err) {
        if (err) throw err;
    });
};

module.exports = {
    fetchProjectNames,
    loadProject,
    createProject,
    deleteProject,
    createGroup,
    deleteGroup,
    createIssue,
    deleteIssue,
    editIssue,
    setDate,
    setPriority,
    setStage,
};
