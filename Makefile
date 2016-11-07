DOCKER_NAME := oomg
APP := oomg

run:
	gulp serve

build:
	gulp build

export:
	gulp export

deploy: build-docker tag-docker
	docker push registry.heroku.com/$(APP)/web

packages:
	npm install

install: packages

prune:
	npm prune

build-docker:
	docker build -t $(DOCKER_NAME) .

tag-docker:
	docker tag $(DOCKER_NAME) registry.heroku.com/$(APP)/web

save-docker: build-docker
	docker save $(DOCKER_NAME) > $(DOCKER_NAME).tar

bundle-docker: save-docker
	gzip $(DOCKER_NAME).tar

config-env:
	$(eval CONFIG := $(shell heroku config -s -a ${APP} | awk '{print "-e " $$0 }') )

run-docker: config-env
	docker run ${CONFIG} --user=root --dns=8.8.8.8  -p 8080:8080 -it ${DOCKER_NAME}
