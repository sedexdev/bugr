const path = require("path");
const os = require("os");
const { PythonShell } = require("python-shell");

const fetchProjectNames = (callback) => {
    const options = {
        mode: "text",
        pythonPath: `${
            os.userInfo().homedir
        }\\AppData\\Local\\Programs\\Python\\Python37\\python.exe`,
        pythonOptions: ["-u"],
        scriptPath: path.join(
            __dirname,
            "/",
            "../",
            "../",
            "../",
            "backend",
            "projects"
        ),
        args: [],
    };

    PythonShell.run("fetch_project_names.py", options, function (err, results) {
        if (err) throw err;
        callback(results);
    });
};

const loadProject = (projectId, callback) => {
    const options = {
        mode: "text",
        pythonPath: `${
            os.userInfo().homedir
        }\\AppData\\Local\\Programs\\Python\\Python37\\python.exe`,
        pythonOptions: ["-u"],
        scriptPath: path.join(
            __dirname,
            "/",
            "../",
            "../",
            "../",
            "backend",
            "projects"
        ),
        args: [projectId],
    };

    PythonShell.run("load_project.py", options, function (err, results) {
        if (err) throw err;
        callback(results);
    });
};

const createProject = (projectName) => {
    const options = {
        mode: "text",
        pythonPath: `${
            os.userInfo().homedir
        }\\AppData\\Local\\Programs\\Python\\Python37\\python.exe`,
        pythonOptions: ["-u"],
        scriptPath: path.join(
            __dirname,
            "/",
            "../",
            "../",
            "../",
            "backend",
            "projects"
        ),
        args: [projectName],
    };

    PythonShell.run("create_project.py", options, function (err) {
        if (err) throw err;
    });
};

const createGroup = (projectName, projectId) => {
    const options = {
        mode: "text",
        pythonPath: `${
            os.userInfo().homedir
        }\\AppData\\Local\\Programs\\Python\\Python37\\python.exe`,
        pythonOptions: ["-u"],
        scriptPath: path.join(
            __dirname,
            "/",
            "../",
            "../",
            "../",
            "backend",
            "groups"
        ),
        args: [projectName, projectId],
    };

    PythonShell.run("create_group.py", options, function (err) {
        if (err) throw err;
    });
};

module.exports = {
    fetchProjectNames,
    loadProject,
    createProject,
    createGroup,
};
