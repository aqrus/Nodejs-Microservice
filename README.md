# Install app
install docker and run k8s
install skaffold
install make
## clone file .env-temp
## Create secret in k8s
make createSecretKey
## Create Nginx-ingress-controller
make createNginxGateway
## Run server
make server
### port-forwards with kubectl
instead 'id-container-nats-streaming-server' by id of container run on docker in Makefile
run: make fowarding