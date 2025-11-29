@echo off
echo Creating desktop shortcut...

REM Get the current directory
set "SCRIPT_DIR=%~dp0"

REM Create VBScript to create shortcut
echo Set oShell = CreateObject("WScript.Shell") > "%TEMP%\createshortcut.vbs"
echo sDesktopPath = oShell.SpecialFolders("Desktop") >> "%TEMP%\createshortcut.vbs"
echo Set oShortcut = oShell.CreateShortcut(sDesktopPath ^& "\User Activity Monitor.lnk") >> "%TEMP%\createshortcut.vbs"
echo oShortcut.TargetPath = "%SCRIPT_DIR%quick-start.bat" >> "%TEMP%\createshortcut.vbs"
echo oShortcut.WorkingDirectory = "%SCRIPT_DIR%" >> "%TEMP%\createshortcut.vbs"
echo oShortcut.Description = "Launch User Activity Monitoring System" >> "%TEMP%\createshortcut.vbs"
echo oShortcut.Save >> "%TEMP%\createshortcut.vbs"

REM Run the VBScript
cscript //nologo "%TEMP%\createshortcut.vbs"

REM Clean up
del "%TEMP%\createshortcut.vbs"

echo.
echo Desktop shortcut created successfully!
echo.
echo Shortcut name: User Activity Monitor
echo Location: Your Desktop
echo.
echo You can now double-click the desktop shortcut to start the application.
echo.
pause