import os
import json

from helpers import app_data_path, app_data

# project_id = sys.argv[1]
project_id = '3a3c2c18-7aba-4227-8859-6c7036a91298'


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
                    return json_data


project_data = read_files(app_data, app_data_path)

print(project_data)

# open a socket connection to send the project data back to electron
# look into the child-process module
