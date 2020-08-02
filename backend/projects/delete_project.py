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
                    return f'{root}/{file}'


def main():
    username = os.getlogin()
    app_data_path = f'C:\\Users\\{username}\\AppData\\Local\\bugr'
    project_id = sys.argv[1]
    file_to_delete = read_files(app_data_path, project_id)

    if file_to_delete:
        try:
            os.remove(file_to_delete)
        except PermissionError:
            print('You do not have permission to delete this file at this time')
        except FileNotFoundError:
            print('The file does not exist')


if __name__ == "__main__":
    main()
