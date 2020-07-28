import sys
import os
from datetime import datetime
import json

# project_name = sys.argv[1]
# project_id = sys.argv[2]
# group_id = sys.argv[3]
# group_id = sys.argv[4]
# new_description = sys.argv[4]
project_name = 'Some Application'
project_id = 'f6b618af-6e82-4f7b-b096-dc5ab0999f53'
group_id = 'd29b20e2-630d-4598-a8e7-6a833fe7eed0'
issue_id = 'c9b40293-c171-441e-bce0-8f68df4c3dfc'
new_description = 'This is a serious issue!'
now = datetime.now()
today = f'{now.day}/{now.month}/{now.year}'

username = os.getlogin()
app_data_path = f'C:\\Users\\{username}\\AppData\\Local\\bugr'
app_data = os.listdir(app_data_path)


def find_file(data, path):
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


file_path = find_file(app_data, app_data_path)

with open(file_path, 'r') as file:
    original_data = file.read()
    original_data_dict = json.loads(original_data)
    groups = original_data_dict['groups']
    found = False
    for group in groups:
        if group['group_id'] == group_id:
            for issue in group['issues']:
                if issue['issue_id'] == issue_id:
                    issue['description'] = new_description
                    found = True
                    break
            if found:
                break

with open(file_path, 'w+') as new_file:
    new_json_data = json.dumps(original_data_dict)
    new_file.write(new_json_data)
