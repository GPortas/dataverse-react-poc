# dataverse-react-poc

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

dataverse-react-poc is a PoC of how a new front-end application decoupled from the Dataverse application can interact with Dataverse through the Native API, coexisting with the JSF Dataverse front-end.

In particular, this PoC focuses on testing the following points:

- New API auth mechanism using JSESSIONID cookie for new front-end requests to the Native API
- URL routing of both new and old front-ends coexisting, with specific URLs for the new front-end
- New front-end mavenization and application building through a .war file, following the Dataverse model
- Deployment of the new front-end application on the same Payara server as Dataverse

## Requirements

### Dataverse local instance

It is necessary to locally deploy Dataverse with this branch: https://github.com/GPortas/dataverse/tree/session_api_auth

That branch has the JSESSIONID cookie Native API auth implemented, necessary for this PoC.

### Node and Yarn

For the development of the React application you will need to have Node 14.0.0 or later version on your local development machine.

Using Homebrew, you can upgrade your node version by running the following command:

````
brew upgrade node
````

Make sure you have Yarn installed, as it is the package manager used in this project.

You can install Yarn by running the following command:

````
brew install corepack
````

## Building the application

This project is mavenized, so to build the application and produce a .war file, simply run the following command:

````
mvn package
````

The generated .war file can be found inside the /target folder in the repository.

## Deploying the application

Once we have the application .war file, we can deploy it to Payara using asadmin in a similar way to Dataverse:

````
asadmin deploy --contextroot new react-poc.war
````

Context root identifies the origin of the base path of the new application's URLs, so that there is no conflict with the existing deployed Dataverse application URLs.
