#port-fowarding to nats kubectl
#port-fowarding to nats kubectl
fowarding : 
	echo "fowarding from kubectl to nats"
	kubectl port-forward 'id-container-nats-streaming-server' 4222:4222 

.PHONY: all