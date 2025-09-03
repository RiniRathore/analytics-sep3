# 🚀 Deploy Frontend to EC2 Guide

## ✅ Build Status
Your frontend has been successfully built! The build files are located in the `dist/` directory.

## 📁 Build Files Created
- `dist/index.html` - Main HTML file
- `dist/assets/index-B0DHORU5.js` - JavaScript bundle (527KB)
- `dist/assets/index-BCVZXHmr.css` - CSS bundle (26KB)

## 🔧 Quick Build Command
```bash
npm run build
```

## 🌐 EC2 Deployment Options

### Option 1: Nginx (Recommended)
1. **Upload files to EC2:**
   ```bash
   # From your local machine, upload the dist folder
   scp -r dist/ ec2-user@your-ec2-ip:/var/www/html/
   ```

2. **Install Nginx on EC2:**
   ```bash
   sudo yum update -y
   sudo yum install nginx -y
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

3. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```
   
   Add this server block:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

4. **Restart Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Option 2: Apache
1. **Install Apache:**
   ```bash
   sudo yum install httpd -y
   sudo systemctl start httpd
   sudo systemctl enable httpd
   ```

2. **Upload files:**
   ```bash
   scp -r dist/* ec2-user@your-ec2-ip:/var/www/html/
   ```

3. **Configure .htaccess for SPA routing:**
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

### Option 3: Simple HTTP Server (Development/Testing)
```bash
# On EC2, navigate to dist folder and run:
cd dist
python3 -m http.server 80
# or
npx serve -s . -l 80
```

## 🔒 Security Considerations
1. **Configure Security Groups:** Open port 80 (HTTP) and 443 (HTTPS)
2. **Use HTTPS:** Set up SSL certificate with Let's Encrypt
3. **Firewall:** Configure EC2 security groups properly

## 📊 Performance Optimization
1. **Enable Gzip compression** in Nginx/Apache
2. **Set proper cache headers** for static assets
3. **Use CDN** for better global performance
4. **Enable HTTP/2** for faster loading

## 🚨 Troubleshooting
- **Files not loading:** Check file permissions on EC2
- **Routing issues:** Ensure SPA fallback is configured
- **CORS errors:** Configure API endpoints properly
- **Build errors:** Run `npm run build` locally first

## 📝 Next Steps
1. Choose your deployment method (Nginx recommended)
2. Upload the `dist/` folder to your EC2 instance
3. Configure your web server
4. Test your application
5. Set up domain and SSL if needed

## 💡 Pro Tips
- Use `rsync` instead of `scp` for large deployments
- Set up CI/CD pipeline for automatic deployments
- Monitor your application with CloudWatch
- Use CloudFront for global content delivery 