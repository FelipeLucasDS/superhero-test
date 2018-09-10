docker build -q -v /storage/docker/mysql-datadir:/var/lib/mysql -t mysql-test -f test/env/docker/mysql.dockerfile .
docker run -d -p 3306:3306 mysql-test