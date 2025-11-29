' VBScript to create a desktop shortcut for the User Activity Monitoring System

Set oShell = CreateObject("WScript.Shell")
sDesktopPath = oShell.SpecialFolders("Desktop")

' Get the current directory where the script is located
sCurrentDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' Create the shortcut
Set oShortcut = oShell.CreateShortcut(sDesktopPath & "\User Activity Monitoring System.lnk")

' Set shortcut properties
oShortcut.TargetPath = "powershell.exe"
oShortcut.Arguments = "-ExecutionPolicy Bypass -File """ & sCurrentDir & "\start-app.ps1"""
oShortcut.WorkingDirectory = sCurrentDir
oShortcut.Description = "Launch User Activity Monitoring System"
oShortcut.IconLocation = "powershell.exe, 0"

' Save the shortcut
oShortcut.Save

' Show confirmation message
MsgBox "Desktop shortcut created successfully!" & vbCrLf & vbCrLf & _
       "Shortcut location: " & sDesktopPath & "\User Activity Monitoring System.lnk" & vbCrLf & _
       "Double-click the shortcut to start the application.", _
       vbInformation, "Shortcut Created"