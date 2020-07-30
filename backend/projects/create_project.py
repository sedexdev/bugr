import os
import sys
from datetime import datetime
import uuid
import json


def main():
    project_name = sys.argv[1]
    now = datetime.now()
    today = f'{now.day}/{now.month}/{now.year}'

    project_data = {
        'project_name': project_name,
        'project_id': str(uuid.uuid4()),
        'created_at': str(now),
        'groups': [{
            'title': 'New Group',
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
        }]
    }

    username = os.getlogin()
    json_data = json.dumps(project_data)
    if not os.path.exists(f'C:\\Users\\{username}\\AppData\\Local\\bugr'):
        os.mkdir(f'C:\\Users\\{username}\\AppData\\Local\\bugr')

    project_id = project_data['project_id']
    path = f"C:\\Users\\{username}\\AppData\\Local\\bugr\\{project_name}-{project_id}.json"

    with open(path, 'w+') as file:
        file.write(json_data)

    print(json.dumps(project_data))


if __name__ == "__main__":
    main()
