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
Install NGINX using homebrew
brew install nginx.

You may have to upgrade your Homebrew instance if you're running latest version of MAC OS

NGINX Config File can be found at usr/local/etc/nginx (if installed with Homebrew)

You will then need to create a new server entry inside the http directive to serve the
web app.

Start Stop using Brew
stop - sudo brew services stop nginx
start - sudo brew services restart nginx

Where to find the root document on NGINX
/usr/local/Cellar/nginx/1.21.1/html (If installed with homebrew)

When deploying your web application you (on MAC) you may want to provide a folder that is accessible by your user

I created a folder inside my Documents called 'web-apps' then copy my built dist folder into that folder.  Then you can setup your nginx.config as follows

user aguevara staff; // this is specifc to me you'll need to find your user and group specific to your machine.

The following is an example of the server section in NGINX for simplicy I'm adding my config to this
repo.  You can grab it and pas it to your NGINX server.  Just go to usr/local/etc/nginx and add the
nginx.config file from this repo there.  

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

Other usefull information about NGINX.  To check logs you can tail the following files
/usr/local/var/log/nginx (error.log access.log)

```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
