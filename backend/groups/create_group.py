import sys
import os
from datetime import datetime
import uuid
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
    # group_name = sys.argv[2]
    # project_id = sys.argv[3]
    project_name = 'Some Application'
    group_name = 'Some New Group'
    project_id = '3a3c2c18-7aba-4227-8859-6c7036a91298'
    now = datetime.now()
    today = f'{now.day}/{now.month}/{now.year}'
    file_path = find_file(app_data, app_data_path, project_id)

    with open(file_path, 'r') as file:
        original_data = file.read()
        original_data_dict = json.loads(original_data)
        original_data_dict['groups'].append({
            'title': group_name,
            'group_id': str(uuid.uuid4()),
            'created_at': str(now),
            'issues': [{
                'description': f'{project_name} Issue',
                'issue_id': str(uuid.uuid4()),
                'created_at': str(now),
                'last_modified': str(now),
                'finish_by': str(today),
                'priority': 'Low',
                'stage': 'Todo'
            }]
        })

    with open(file_path, 'w+') as new_file:
        new_json_data = json.dumps(original_data_dict)
        new_file.write(new_json_data)


if __name__ == "__main__":
    main()
