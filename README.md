# product-test-ssr

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint

```
### To run this test you'll need a web server setup.  I'm using nginx here

Install NGINX using homebrew. Run this command
```
brew install nginx.
```

### You may have to upgrade your Homebrew instance if you're running latest version of MAC OS
```
$ brew upgrade
```

### Once homebrew is upgraded you can then install **nginx**
```
$ brew install nginx
```
</br>

NGINX Config File can be found at
```
usr/local/etc/nginx (if installed with Homebrew)
```

### Start Stop using Brew
```
start - sudo brew services restart nginx
stop - sudo brew services stop nginx
```

You will then need to create a new server entry inside the http directive to serve the
web app.

### NGINX root can be found here. This is usefull if you want to deploy a distribution build
```
/usr/local/Cellar/nginx/1.21.1/html (If installed with homebrew)
```


The following is an example of the server section in NGINX for simplicy I'm adding my config to this
repo.  You can grab it and paste it to your MGINX server folder.
```
Just go to *usr/local/etc/nginx* and add the
nginx.config file from this repo there.
```

```
Notice NGINX will listen on port 80 here so be sure you dont have a running process
listening on that port in your local.

server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # if you want to serve your site with nginx
        #location / {
        #    root   /Users/aguevara/Documents/web-apps/dist;
        #    index  index.html index.htm;
        #    # notice the following line, this is to make vue-router work in history mode
        #    try_files $uri $uri/ /index.html;
        #}

        # serve your site SSR via proxy pass
        location / {
            proxy_set_header   X-Forwarded-For $remote_addr;
            proxy_set_header   Host $http_host;
            proxy_pass         http://localhost:8000;
        }

        location /js {
          proxy_set_header   X-Forwarded-For $remote_addr;
          proxy_set_header   Host $http_host;
          proxy_pass         http://localhost:8080;
        }


        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
```

>This URL goes through NGINX into your express server via a proxy pass
```
http://localhost/product/005054891
```

Other usefull information about NGINX.  To check logs you can tail the following files
/usr/local/var/log/nginx (error.log access.log)


</br>

---

## **Running with apache**

```
Apache on MAC OSX can be found in this location
/etc/apache2 could also be /private/etc/apache2

You will need to create a proxy pass into the Node server
Follow instructions here on what to do to edit the httpd.conf file

you will need to uncomment out the proxy modules then setup your vhosts

Make sure this line is uncommented in your httpd.conf file
Virtual hosts
Include /private/etc/apache2/extra/httpd-vhosts.conf

Make sure these lines are uncommented in httpd.conf
LoadModule proxy_module libexec/apache2/mod_proxy.so
LoadModule proxy_http_module libexec/apache2/mod_proxy_http.so

Add the following to /extra/httpd-vhosts.conf
<VirtualHost *:80>
    ServerName localhost
    ProxyRequests On
    ProxyPass /js http://localhost:8080/js/
    ProxyPassReverse /js/ http://localhost:8080/js/


    ProxyPass / http://localhost:8000/
    ProxyPassReverse / http://localhost:8000/

</VirtualHost>

Now restart apache server with the following
sudo apachectl restart

To run Apache on work mac you'll first have to get admin previleges elevated

start - sudo apachectl restart
stop - sudo apachectl stop

```
