@echo of
if exist app.scss sass --update --no-source-map ./app.scss ./app.wxss
cd ./pages
for /d %%i in (./*) do   if exist ./%%~ni/%%~ni.scss  sass  --update --no-source-map ./%%~ni/%%~ni.scss ./%%~ni/%%~ni.wxss
echo on
