import os
import sys
import json

username = os.getlogin()
# project_id = sys.argv[1]
project_id = '9f222a2d-32d3-48a4-ab7f-c43f61804351'
app_data = os.listdir(f'C:\\Users\\{username}\\AppData\\Local\\bugr')


def read_files(directory):
    for obj in directory:
        if os.path.isdir(obj):
            read_files(obj)
        with open(f'C:\\Users\\{username}\\AppData\\Local\\bugr\\{obj}') as file:
            data = file.read()
            data_dict = json.loads(data)
            if data_dict['project_id'] == project_id:
                try:
                    os.remove(f'C:\\Users\\{username}\\AppData\\Local\\bugr\\{obj}')
                    break
                except PermissionError:
                    print('You do not have permission to delete this file at this time')
                except FileNotFoundError:
                    print('The file does not exist')


read_files(app_data)
