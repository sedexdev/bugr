import sys
import os
import json


def read_files(data, path, project_id):
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
                    return json_data


def main():
    username = os.getlogin()
    app_data_path = f'C:\\Users\\{username}\\AppData\\Local\\bugr'
    app_data = os.listdir(app_data_path)
    # project_id = sys.argv[1]
    project_id = 'e79136f3-1451-44e4-8ab0-be557ec789ef'
    project_data = read_files(app_data, app_data_path, project_id)
    print(project_data)


if __name__ == "__main__":
    main()
