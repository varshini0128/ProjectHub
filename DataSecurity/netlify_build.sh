 
#!/bin/bash

# Update and install system packages required by mysqlclient
apt-get update && \
apt-get install -y \
  build-essential \
  libssl-dev \
  libffi-dev \
  libmysqlclient-dev \
  pkg-config \
  default-libmysqlclient-dev

# Upgrade pip and install Python packages
pip install --upgrade pip
pip install -r requirements.txt
