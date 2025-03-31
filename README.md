# Next.js Frontend Deployment Guide on DigitalOcean Droplet

## Table of Contents
- [Introduction](#introduction)
- [1. Prerequisites](#prerequisites)
- [2. Setting Up a New DigitalOcean Droplet](#setting-up-a-new-digitalocean-droplet)
- [3. Initial Server Configuration](#initial-server-configuration)
- [4. Cloning the Frontend Project](#cloning-the-frontend-project)
- [5. Setting Up Node.js and PM2](#setting-up-nodejs-and-pm2)
- [6. Deploying the Next.js Application](#deploying-the-nextjs-application)
- [7. Setting Up NGINX as a Reverse Proxy](#setting-up-nginx-as-a-reverse-proxy)
- [8. SSL Configuration with ZeroSSL](#ssl-configuration-with-zerossl)
- [9. Setting Up Log Rotation for NGINX and PM2](#setting-up-log-rotation-for-nginx-and-pm2)
- [10. Updating Your Frontend from Git](#updating-your-frontend-from-git)
- [11. Maintenance and Monitoring](#maintenance-and-monitoring)

---

## Introduction
This guide provides step-by-step instructions to deploy a Next.js frontend application on a DigitalOcean droplet from scratch, including configuring SSL, managing logs, and updating the application.

## 1. Prerequisites
- A GitHub repository containing your Next.js project.
- A registered domain (configured with DNS in Hostinger).
- SSL certificate files from ZeroSSL.
- SSH access to your DigitalOcean droplet.

## 2. Setting Up a New DigitalOcean Droplet
1. Create a new droplet using the Ubuntu image.
2. Log in via SSH:
   ```bash
   ssh root@your_droplet_ip
   ```
3. Update the system:
   ```bash
   apt update && apt upgrade -y
   ```

## 3. Initial Server Configuration
- Install essential packages:
  ```bash
  apt install git curl nginx -y
  ```
- Configure the firewall:
  ```bash
  ufw allow OpenSSH
  ufw allow 'Nginx Full'
  ufw enable
  ```

## 4. Cloning the Frontend Project
- Navigate to your deployment directory:
  ```bash
  mkdir -p /var/www/frontend && cd /var/www/frontend
  ```
- Clone the repository:
  ```bash
  git clone https://github.com/your_username/your_nextjs_repo.git .
  ```

## 5. Setting Up Node.js and PM2
- Install Node.js:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  apt install -y nodejs
  ```
- Install PM2:
  ```bash
  npm install -g pm2
  ```

## 6. Deploying the Next.js Application
- Install dependencies:
  ```bash
  npm install
  ```
- Build the project:
  ```bash
  npm run build
  ```
- Start with PM2:
  ```bash
  pm2 start npm --name 'nextjs' -- start
  pm2 save
  pm2 startup
  ```

## 7. Setting Up NGINX as a Reverse Proxy
- Create an NGINX configuration file:
  ```bash
  nano /etc/nginx/sites-available/frontend
  ```
- Configuration:
  ```
  server {
      listen 80;
      server_name your_domain;
      location / {
          proxy_pass http://localhost:3000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      }
  }
  ```
- Enable and restart NGINX:
  ```bash
  ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
  nginx -t
  systemctl restart nginx
  ```

## 8. SSL Configuration with ZeroSSL
- Move SSL files:
  ```bash
  mv /ssl-folder/unitedengineering.org/*.crt /etc/ssl/certs/
  mv /ssl-folder/unitedengineering.org/private.key /etc/ssl/private/
  ```
- Update NGINX config for HTTPS:
  ```bash
  ssl_certificate /etc/ssl/certs/fullchain.pem;
  ssl_certificate_key /etc/ssl/private/private.key;
  ```
- Restart NGINX:
  ```bash
  systemctl restart nginx
  ```

## 9. Setting Up Log Rotation for NGINX and PM2
- NGINX log rotation configuration:
  ```bash
  nano /etc/logrotate.d/nginx
  ```
- Example config:
  ```
  /var/log/nginx/*.log {
      daily
      rotate 14
      compress
      missingok
  }
  ```
- PM2 log rotation:
  ```bash
  pm2 install pm2-logrotate
  pm2 set pm2-logrotate:max_size 10M
  ```

## 10. Updating Your Frontend from Git
- Stop the frontend:
  ```bash
  pm2 stop nextjs
  ```
- Pull latest code:
  ```bash
  git pull origin main
  npm install
  npm run build
  pm2 restart nextjs
  ```

## 11. Maintenance and Monitoring
- Check PM2 logs:
  ```bash
  pm2 logs
  ```
- Restart NGINX:
  ```bash
  systemctl restart nginx
  ```
- Reboot the system:
  ```bash
  reboot
  ```

## Conclusion
This document helps you set up, maintain, and update your Next.js application on a DigitalOcean droplet efficiently. Keep this as a reference for smooth deployment and maintenance.

