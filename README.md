# url-shortener-back-end


## Travis CI set-up

#### Refs
* [travis ci with node-project - travis official](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)
* [travis ci dashboard - travis official](https://travis-ci.com/dashboard)
* [google app engine + travis ci - google official](https://cloud.google.com/solutions/continuous-delivery-with-travis-ci#install_travis_command-line_tools)
* [google app engine + travis ci - blog](https://graysonkoonce.com/continuous-deployment-to-google-app-engine-using-travis-ci/)
* [travis.yml example - google official](https://github.com/GoogleCloudPlatform/continuous-deployment-demo/blob/master/.travis.yml)

#### Steps
1. create an valid service account
  * has three roles
    1. App Engine Admin
    2. Cloud Build Editor
    3. Storage Admin
2. download key from specific account
3. install travis CI cli
4. travis login + encrypt downloaded key
  * `travis login --pro`
  * `travis encrypt-file [your file] --pro --add`
    * add decode command to travis.yml file directly
5. commit the encrypted file


#### Notes
1. to see project number/id
  * IAM & admin > settings  
2. to add new role to specific service account
  * dashboard > IAM & admin home page > edit specific service account

## Features
1. testing
2. CI/CD

## Services + Packages
1. google app engine
2. travis ci
3. http mock request test

## TO DO
* production and dev env
* [secret management](https://cloud.google.com/solutions/secrets-management/)
* enable CORS
* font end
* handle unrecognized path
* create my own shortId hash function
* typescript || flow
* travis CI from push flow to PR flow

## References
* [ref](https://www.youtube.com/watch?v=7VNgjfmv_fE)
* [ref2](https://codeburst.io/creating-custom-url-shortener-with-nodejs-de10bbbb89c7?source=bookmarks---------0-----------------------)
* [ref3](https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/)
* [ref4](https://github.com/kriscfoster/express-mongo)
