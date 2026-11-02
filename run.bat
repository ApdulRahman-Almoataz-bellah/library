@echo off
title Library Management
start "Library Server" /min cmd /c "py -m http.server 5500"
timeout /t 2 /nobreak >nul
start "" http://localhost:5500/login.html
