# Noel De Martin's Node Solid Server

Forked from [node-solid-server](https://github.com/solid/node-solid-server) in order to customize for personal use. This repository is not intended for others to use, so don't expect it to work in your environment. But I'm leaving it public for educational purposes. If you'd like to use it yourself or make some changes, you should head to the [original repository](https://github.com/solid/node-solid-server).

If you want to know more read [this](https://noeldemartin.com/tasks/configuring-a-self-hosted-solid-pod-server).

## Development

This assumes you are using [nginx-agora](https://github.com/NoelDeMartin/nginx-agora).

```sh
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=data.noeldemartin.test" -keyout privkey.pem -out fullchain.pem
cp config.dev.json config.json
docker-compose up -d
nginx-agora install ./nginx/data.noeldemartin.test.conf ./ node-solid-server
nginx-agora enable
nginx-agora start
```

## Production

This assumes you are using [nginx-agora](https://github.com/NoelDeMartin/nginx-agora).

```sh
nginx-agora install ./nginx/data.noeldemartin.com.conf ./ node-solid-server
nginx-agora enable
```

Temporally replace the nginx configuration with the following in order to obtain the [Let's encrypt](https://letsencrypt.org/) certificate:

```
server {
  listen 0.0.0.0:80;
  listen [::]:80;
  server_name data.noeldemartin.com;
  server_tokens off;
  root /var/www/node-solid-server;
  location /.well-known/acme-challenge/ { allow all; }
  location / { return 200 "setting up SSL..."; }
}
```

Run the following, which may fail on the first run but it will tell you the files you need to create on the `.well-known` folder.

```sh
sudo certbot certonly --webroot --webroot-path=/var/www/node-solid-server -d data.noeldemartin.com
```

Update the nginx configuration back to the original and run the following commands:

```sh
cp config.prod.json config.json
docker run -v `pwd`:/app -w /app node bash -c "npm ci"
docker-compose up -d
nginx-agora restart
```
