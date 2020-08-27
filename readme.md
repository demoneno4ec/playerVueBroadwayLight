### vue component broadway

За место тяжеловесного и замусоренного аналога на нативном 

Зависимостьи
================
|name           |version |description                      |
|:---------     |:------:|-----------                      |
|**npm**        | 6.14.8 | Пакетный менеджер на фронте     |
|**Java**       | 13.9.0 | Для npm                         |
|**Vue.js**     |        | Framework для фронт части на js |

Устанавливаем нужные пакеты на фронте
```shell script
npm install
```

Копируем файл с урлом и подставляем свое значение
```shell script
cd src/dist/constants/
cp example.streamUrl.js streamUrl.js
cd ../../../ 
```

Собираем скрипты
```shell script
npm run build
```

При необходимости дебажить в реалтайме
```shell script
npm run watch
```


UPD 2020.08.27 Осталось перевести воркер на vue. (1700 строк)