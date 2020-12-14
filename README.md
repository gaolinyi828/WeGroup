# Project - WeGroup

## Project Description
A full-stack web application to let users create groups and collaborate with each other to share messages(string, photos, files, emoji), calendar.

### Github Pages Link
https://pages.github.ccs.neu.edu/2020FACS5500SV/project-hqryyls/

### Deployed Application Link
TBD

## Team
### Team Members
* Hongdan Zhu: hongdanzhu
* Qing Liao: liaoqing21
* Ruizi Dong: drq12345
* Yongle Lin: robin
* Yongliang Tan: seantanty
* Linyi Gao: gaolinyi828
* Siyu Liu: libertyliu

#### Primary Customer Representative
Qing Liao: liaoqing21

#### Alternate Customer Representative
Yongliang Tan: seantanty

### Methodology
Agile.

### Workflow
Use a feature branch workflow by committing branches and submit pull requests to have code reviewed and committed to the master branch.

## Project Detail
### Features
**Milestone 1**
1. Entry point of site: a search bar to search post, a create button to create post
2. User could search post by tags
3. User could create/update/delete post
4. User could add comment to other posts
5. User could click "Join team" button on post to express willingness to join them
6. The post owner could form a team by clicking the "Form team button" and selecting teammates from those who clicked the "Join Team" button.
7. The post's status will be closed after the team has been formed.


**Milestone 2**
1. Once team has been formed, user could access the team chat room from its "My Teams" menu
2. Users could send messages, photos, emoji and share files in the chatroom.
3. Team chat room has a find meeting time slot function
4. Team chat room has an announcement section to post important messages such as team info, github link, google doc link, etc.


## Project Repo
Project organization:
We organize the whole project in four folders. They are called backend, frontend, docs, and readme. They contain different files inside which play different roles in the entire project. Here are the basic introductions of all four folders.
 
backend:
Basically, this folder contains all the technical related files of backend design.
We have a subfolder called “models”, which contains all the data schemas we designed as the database.
We have a subfolder called “routes”, which contains all the API files to provide the functionality. 
We have a subfolder called “middleware”. It contains the authentication related files.
We also have the server related files contained in this folder.

frontend:
Basically, this folder contains all the technical related files of frontend design.
We have a subfolder called “public”, which contains all the HTML entry files.
We have a subfolder called “styles”, which contains all the css file.
We have a subfolder called “src”, which contains all the course code, for example, the components and services. 
We have a subfolder called “service”, which helps to connect the frontend with the backend.

docs: 
Basically, this folder contains all the technical related files for everyone to read.
“The communication plan” is the file to record our meetings about the project design.
“CS5500 WeGroup Document” is the file which includes all the introductions to help the professor and teaching assistants evaluate our project. 

readme: 
This is the file we provide for other developers. 
In this file, we have the instructions for other developers to install the servers, run the build, and test all the functions.

## Instructions for developers
1. git clone all files in the repository to your working directory
2. go to the working directory and run "npm install"
3. go to the backend directory and run "npm start"
4. go to the frontend directory and run "npm start"
5. You may do your customized changes now
