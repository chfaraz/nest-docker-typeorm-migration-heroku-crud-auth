# Basic Template

This is a basic template of nestjs. it contains all the basic stuff for bigener projects .

## it contains following stuff:

basic nest crud api connected with postgress through typeorm.
typeorm ready to run along with migrations automatically. to generate migrations look commands in package.json.
data validations with class validators.
docker to run application in containers it generates two containers for postgres(database) and our applications.
the docker compose file is also written just run:

```
sudo docker-compose up
```

the basic authentication is also applied with json web tokens.
passwords are encrypted with bcrypt.
also ready to be deployed to heroku just create app on heroku set environment variables and hit:

```
git push heroku branch_name:main
```

make shore to install heroku cli first
### Better to push on heroku with github actions
Check github action tempelate for referance

do visit ormconfig.js file before pushing to heroku you need to make a little change there. which is mentioned there
