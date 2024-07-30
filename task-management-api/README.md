### Session 3:

1. docker build -t docker-api:6 . --no-cache
2. docker run -v adriana_volume:/home/customuser/app/data -p 3000:3000 docker-api:6
3. docker run --network adriana-network -v adriana_volume:/home/customuser/app/data -p 3000:3000 --name task-management-api docker-api:6
4. docker run --network adriana-network -v ~/data:/app/data -p 3000:3000 --name task-management-api3 docker-api:7

