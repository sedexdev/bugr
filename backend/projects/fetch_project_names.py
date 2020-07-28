import os
import json

username = os.getlogin()
app_data_path = f'C:\\Users\\{username}\\AppData\\Local\\bugr'
app_data = os.listdir(app_data_path)

project_names = []


def read_files(data, path, projects_list):
    for obj in data:
        object_path = f'{path}\\{obj}'
        if os.path.isdir(object_path):
            contents = os.listdir(object_path)
            read_files(contents, object_path, projects_list)
        else:
            with open(object_path, 'r+') as file:
                json_data = file.read()
                data_dict = json.loads(json_data)
                projects_list.append(data_dict['project_name'])


read_files(app_data, app_data_path, project_names)

print(project_names)

# open a socket connection to send the list of names back to electron
# look into the child-process module
