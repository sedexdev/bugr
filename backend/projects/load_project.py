import sys
import os
import json


def read_files(path, project_id):
    for (root, dirs, files) in os.walk(path, topdown=False):
        for file in files:
            with open(f'{root}/{file}', 'r') as project_file:
                json_data = project_file.read()
                data_dict = json.loads(json_data)
                if data_dict['project_id'] == project_id:
                    return json_data


def main():
    username = os.getlogin()
    app_data_path = f'C:\\Users\\{username}\\AppData\\Local\\bugr'
    project_id = sys.argv[1]
    project_data = read_files(app_data_path, project_id)
    print(json.dumps(project_data))


if __name__ == "__main__":
    main()
