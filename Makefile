createSecretKey:
kubectl create secret generic jwt-secret --from-literal=JWT_TOKEN_SECRET=microservice
createNginxGateway:
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80
server: 
skaffold run dev
fowarding : 
	echo "fowarding from kubectl to nats"
	kubectl port-forward 'id-container-nats-streaming-server' 4222:4222 

.PHONY: all