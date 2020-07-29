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
    # project_id = sys.argv[1]
    # group_id = sys.argv[2]
    # issue_id = sys.argv[2]
    # new_priority = sys.argv[3]
    project_id = '3a3c2c18-7aba-4227-8859-6c7036a91298'
    group_id = 'a7ce031b-db26-4c83-99fa-6e72ff841704'
    issue_id = '01ace177-3e8d-41c9-aae3-da3202d00710'
    new_priority = 'Urgent'
    file_path = find_file(app_data, app_data_path, project_id)

    with open(file_path, 'r') as file:
        original_data = file.read()
        original_data_dict = json.loads(original_data)
        groups = original_data_dict['groups']
        found = False
        for group in groups:
            if group['group_id'] == group_id:
                for issue in group['issues']:
                    if issue['issue_id'] == issue_id:
                        issue['priority'] = new_priority
                        found = True
                        break
                if found:
                    break

    with open(file_path, 'w+') as new_file:
        new_json_data = json.dumps(original_data_dict)
        new_file.write(new_json_data)


if __name__ == "__main__":
    main()
