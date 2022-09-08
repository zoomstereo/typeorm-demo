# TypeORM Demo

Notas:
    Running a docker image run it with this:
        docker run --name some-mysql \
        -p 3306:3306 \
        -e MYSQL_ROOT_PASSWORD=my-secret-pw \
        -d mysql \
        --default-authentication-plugin=mysql_native_password

    or after created you could change the password this way:
        ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '{ your password }';
        ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '{ your password }';