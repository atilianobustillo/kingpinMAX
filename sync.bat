@echo off
cd /d "%~dp0"
echo Sincronizando kingpinMAX con GitHub (rama main)...
echo.
git pull origin main
echo.
echo Listo.
pause
