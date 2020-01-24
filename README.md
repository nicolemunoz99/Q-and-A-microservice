# Q and A microservice

### Summary
System design for the question-and-answers portion of a retail portal's product page.

### Buit With
* Express (load balancer and API servers)
* PostgreSQL (and MongoDB for performance comparison)

### Docker Images
I tested service performance with SQL and noSQL databases. Since the data scrubbing was a little different for the two, I have database-specific APIs.

SQL:
* [PostgreSQL database](https://hub.docker.com/r/nemunoz/shopping-portal-db)
* [API with data scrubbing for PostgreSQL](https://hub.docker.com/r/nemunoz/shopping-portal-api)

noSQL:
* [MongoDB database](https://hub.docker.com/r/nemunoz/shopping-portal-db-nosql)
* [API with data scrubbing for MongoDB](https://hub.docker.com/r/nemunoz/shopping-portal-api-nosql)

### System Overview
(I chose to use human stick figures instead of personal computers as the origin of requests, because I think it's important to consider the fact that humans are interacting with what one designs)

![System Design](https://github.com/nicolemunoz99/Q-and-A-microservice/blob/master/system-diagram.jpg)
