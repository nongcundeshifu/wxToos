@echo of
cd ./pages
for /d %%i in (./*) do   if exist ./%%~ni/%%~ni.less  lessc ./%%~ni/%%~ni.less ./%%~ni/%%~ni.css
echo on