@echo off
echo Compiling TRAVELO Java sources...

if not exist "WebContent\WEB-INF\classes" mkdir "WebContent\WEB-INF\classes"

javac -cp "WebContent\WEB-INF\lib\servlet-api.jar" -d "WebContent\WEB-INF\classes" src\com\travelo\model\*.java src\com\travelo\util\DBConnection.java src\com\travelo\dao\*.java src\com\travelo\servlet\*.java

if %errorlevel% neq 0 (
    echo Compilation failed!
) else (
    echo Compilation successful!
    echo Deploying to Tomcat...
    xcopy /E /I /Y WebContent C:\xampp\tomcat\webapps\travelo
    echo Deployment successful! You can now access the app at http://localhost:8080/travelo/
)
pause
