@echo of
rem cd /d "E:/project/抽奖小程序（开发版）/pages/"
rem 为什么上面那一句进不去那个路径呢？？？下面那个就进的去？？？
rem cd ./pages
rem mkdir dir1
rem 这里的错误原因，因为你每次循环都以相对路径来设置，所以第一次设置后路径就不对了。所以。先进入pages
rem 而且，这里的cd 进入绝对路径又无法成功。要先切换磁盘才行好像。
cd ./pages
for /d %%i in (./*) do   if exist ./%%~ni/%%~ni.less  lessc ./%%~ni/%%~ni.less ./%%~ni/%%~ni.css
rem pause  rem 这个是暂停。可以查看输出
rem 如果时bat文件，那么 需要使用为%%i  如果是直接dos那么就是%i
echo on
