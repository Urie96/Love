set -e
docker build -t love:tmp .
set +e
docker stop love
docker rm love
docker rmi -f love:latest
docker tag love:tmp love:latest
docker rmi love:tmp
docker run -d -p 10000:80 --name love love:latest