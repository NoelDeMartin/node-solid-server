# Noel De Martin's Node Solid Server

Forked from [node-solid-server](https://github.com/solid/node-solid-server) in order to customize for personal use. This repository is not intended for others to use, so don't expect it to work in your environment. But I'm leaving it public for educational purposes. If you'd like to use it yourself or make some changes, you should head to the [original repository](https://github.com/solid/node-solid-server).

## Development

```sh
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=data.noeldemartin.test" -keyout privkey.pem -out fullchain.pem
cp config.dev.json config.json
docker-compose up -d
nginx-agora install ./nginx/data.noeldemartin.test.conf ./
nginx-agora start
```
