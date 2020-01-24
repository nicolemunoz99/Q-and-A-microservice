# Q and A microservice

### Summary
System design for the question-and-answers portion of a retail portal's product page. Docker images can be found on my [Docker Hub] (https://hub.docker.com/u/nemunoz)

### Buit With
* Express (load balancer and API servers)
* PostgreSQL (and MongoDB for performance comparison)

### Docker Images
I testing performance with SQL and noSQL databases. Since the data scrubbing was a little different, I have database-specific APIs.

SQL:
* [PostgreSQL database] (https://hub.docker.com/r/nemunoz/shopping-portal-db)
* [API with data scrubbing for PostgreSQL] (https://hub.docker.com/r/nemunoz/shopping-portal-api)

noSQL:
* [MongoDB database] (https://hub.docker.com/r/nemunoz/shopping-portal-db-nosql)
* [API with data scrubbing for MongoDB] (https://hub.docker.com/r/nemunoz/shopping-portal-api-nosql)

### System Overview
