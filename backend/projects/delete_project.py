import os
import sys
import json

username = os.getlogin()
# project_id = sys.argv[1]
project_id = '84a67870-928a-482f-98c5-4020e9e23ab0'
app_data_path = f'C:\\Users\\{username}\\AppData\\Local\\bugr'
app_data = os.listdir(app_data_path)


def read_files(data, path):
    for obj in data:
        object_path = f'{path}\\{obj}'
        if os.path.isdir(object_path):
            contents = os.listdir(object_path)
            return read_files(contents, object_path)
        else:
            with open(object_path, 'r+') as file:
                json_data = file.read()
                data_dict = json.loads(json_data)
                if data_dict['project_id'] == project_id:
                    return object_path


file_to_delete = read_files(app_data, app_data_path)

if file_to_delete:
    try:
        os.remove(file_to_delete)
    except PermissionError:
        print('You do not have permission to delete this file at this time')
    except FileNotFoundError:
        print('The file does not exist')

