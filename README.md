
This is a TodoApp developed using Django-Tastypie as backend and AngularJS for minimilistic frontend.

Steps:
a) Create and activate the virtual environment.
b) Navigate through the terminal towards the project residing folder (Eg. "cd Documents/MyAppToDo").
c) Type 'pip install -r requirements.txt' on the terminal after navigating to the "requirements.txt" file residing folder.
d) Type "python manage.py makemigrations" on the terminal.
e) Type "python manage.py migrate" on the terminal.
f) The redis server is configured to be running on the port 7999; it can be changed accordingly in the directory path "todoapp/settings.py" file.
g) Type "python manage.py runserver" on the terminal to get the localhost URL.
h) Open "http://127.0.0.1:8000/index" in browser.
i) Type 'celery -A todo worker -l info -B' to start the worker for clean-up job.
j) Test cases directory path being 'mytodoapp/tests.py' are written using "django.test.TestCase" and "tastypie.test.TestApiClient".

Brownie Points for deploying a working version on a publicly accessible URL:
i) Create an Instance on AWS.
ii) Connect the AWS Instance through .pem file.
iii) Install git (If required)(*Note-Currently instaces will have git by default).
iv) Clone the respective repository.
v) Install pip for respective python version you use.(Eg. Python3-pip or python-pip).
vi) Install the required DataBase.
vii) Install the dependent packages in Instance (pip install -r requirements.txt).
viii) After installing the packages, run and check for any bugs.
ix) Once the application is bug-free, run the application on host 0.0.0.0 and any port required.
x) To run the application in the background use "nohup" before application run command.

There are many methods to upload the required application files on the AWS, I would prefer:
I) Upload .zip file (without the virtual environment variable) and extract it, and perform the above procedure.
II) Clone the repository.
