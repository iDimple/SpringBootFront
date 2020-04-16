1.导入IDE     
启动   
选中项目，右键，run as Java application  
浏览器中打开  
http://localhost:4463  
2.部署到服务器    
打成jar包: package spring-boot:repackage   
查看端口是否占用：lsof -i:4463  
开启服务：nohup java -jar SpringBootFront.jar &

