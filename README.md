# KU Friend Matcher Site
![image](https://github.com/SSMYJAY/demo-repository/assets/89928533/df5c760f-6106-409a-b1fc-1079efaa2ade)

# Installation Steps:
Download all the files in the drive folder below:  
https://drive.google.com/drive/folders/1ptdRpy4jLv4A4OzZCGcwFBAWuMm2uHAM?usp=sharing  
Make sure the directory looks like this:  

![image](https://github.com/SSMYJAY/demo-repository/assets/89928533/38123508-feb4-4cde-a80e-95939734e2ba)  

![image](https://github.com/SSMYJAY/demo-repository/assets/89928533/152cc722-1a7e-45b8-bdb8-2393c43fda8d)


Rename 'dockerfile-node.txt' to 'dockerfile-node'

Using the terminal inside the folder, run "chmod 777 database"

Then, run "docker-compose up" or "sudo docker-compose up". You may need to run it a few times since there is a chance the node js service starts before the mysql service has finished setting up. 

If the terminal outputs  
app listening at https://localhost:443  
Successfully connected to the database  
for the nodejs service, then the project has been run successfully.





