import sys
from datetime import datetime
import json

from helpers import find_file, app_data_path, app_data

# project_name = sys.argv[1]
# project_id = sys.argv[2]
# group_id = sys.argv[3]
# group_id = sys.argv[4]
project_name = 'Some Application'
project_id = '3a3c2c18-7aba-4227-8859-6c7036a91298'
group_id = 'efc371f5-1597-43fa-b2ad-af0993323e67'
now = datetime.now()
today = f'{now.day}/{now.month}/{now.year}'
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
