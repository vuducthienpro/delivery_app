PROJECT = study-nodejs
COMPOSE_FILE = docker-compose.yml

.PHONY: start
start:
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) up -d --build

.PHONY: logs
logs:
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) logs --tail="all" -f

.PHONY: exec
exec:
	docker exec -it ${name} /bin/bash

.PHONY: restart
restart:
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) kill && \
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) rm -f && \
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) up -d --build

.PHONY: reset
reset:
	rm -rf infrastructure/postgresql/data/* && \
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) kill && \
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) rm -f && \
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) up -d --build

.PHONY: kill
kill:
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) kill

.PHONY: ps
ps:
	docker-compose -f $(COMPOSE_FILE) -p $(PROJECT) ps

.PHONY: nodejs
nodejs:
	docker exec -it nodejs-ts-docker /bin/bash
