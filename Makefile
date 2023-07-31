.PHONY: image deploy

image:
	docker build -t hub.lubui.com/love .
	docker push hub.lubui.com/love

deploy:
	ssh lubui.com sudo kubectl scale deployment love --replicas 0
	ssh lubui.com sudo kubectl scale deployment love --replicas 1