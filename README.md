# Nodejs-Microservice
install docker and run k8s
install skaffold
##
install NATS
### port-forwards with kubectl
instead 'id-container-nats-streaming-server' by id of container run on docker in Makefile
run: make fowarding
#### seen nats client sub
http://localhost:8222/streaming/clientsz?subs=1

### work with common
#### login : npm login
#### publish : npm publish

## create secret
kubectl create secret generic jwt-secret --from-literal=JWT_TOKEN_SECRET=microservice