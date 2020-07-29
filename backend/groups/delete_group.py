import sys
import os
import json


def find_file(data, path, project_id):
    for obj in data:
        object_path = f'{path}\\{obj}'
        if os.path.isdir(object_path):
            contents = os.listdir(object_path)
            return find_file(contents, object_path)
        else:
            with open(object_path, 'r+') as data_file:
                json_data = data_file.read()
                data_dict = json.loads(json_data)
                if data_dict['project_id'] == project_id:
                    return object_path


def main():
    username = os.getlogin()
    app_data_path = f'C:\\Users\\{username}\\AppData\\Local\\bugr'
    app_data = os.listdir(app_data_path)
    # project_name = sys.argv[1]
    # project_id = sys.argv[2]
    # group_id = sys.argv[3]
    # group_id = sys.argv[4]
    project_name = 'Some Application'
    project_id = '3a3c2c18-7aba-4227-8859-6c7036a91298'
    group_id = 'efc371f5-1597-43fa-b2ad-af0993323e67'
    file_path = find_file(app_data, app_data_path, project_id)

    with open(file_path, 'r') as file:
        original_data = file.read()
        original_data_dict = json.loads(original_data)
        groups = original_data_dict['groups']
        for i, group in enumerate(groups):
            if group['group_id'] == group_id:
                groups.pop(i)
                break

    with open(file_path, 'w+') as new_file:
        new_json_data = json.dumps(original_data_dict)
        new_file.write(new_json_data)


if __name__ == "__main__":
    main()
