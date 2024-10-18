apt update

apt install sudo

sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

apt-get install nodejs -y

npm i

node src/app.js sendText queueName src date hour asteriskUniqueID
