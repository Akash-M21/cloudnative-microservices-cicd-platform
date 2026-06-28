pipeline {


agent any



parameters {


choice(

name:'SERVICE',

choices:[

'all',

'api-gateway',

'users',

'products',

'orders',

'payments'

],

description:'Select microservice'

)


}



environment {


REGISTRY="mycompany.jfrog.io/docker-local"


AWS_REGION="us-east-1"


EKS_CLUSTER="my-eks-cluster"


JFROG_CREDS="jfrog-creds"


}



tools {


sonarQube 'sonar-scanner'


}





stages {



stage('Checkout') {


steps {


git branch:'main',

url:'https://github.com/Akash-M21/cloudnative-microservices-cicd-platform.git'


}

}





stage('SonarQube Scan') {


steps {


withSonarQubeEnv('sonarqube'){


sh """

sonar-scanner \

-Dsonar.projectKey=${SERVICE} \

-Dsonar.sources=${SERVICE}

"""


}


}


}





stage('Quality Gate') {


steps {


timeout(time:5,unit:'MINUTES'){


waitForQualityGate abortPipeline:true


}


}


}





stage('Docker Build') {


steps {


script {



def services=[]


if(params.SERVICE=="all"){


services=[

"api-gateway",

"users",

"products",

"orders",

"payments"

]


}

else{


services=[params.SERVICE]


}




services.each{


service ->



docker.build(

"${REGISTRY}/${service}:${BUILD_NUMBER}",

"./${service}"

)


}


}


}


}





stage('Push To JFrog') {


steps {


script {



docker.withRegistry(

"https://${REGISTRY}",

JFROG_CREDS

){



def services=[]



if(params.SERVICE=="all"){


services=[

"api-gateway",

"users",

"products",

"orders",

"payments"

]


}

else{


services=[params.SERVICE]


}




services.each{


service ->



docker.image(

"${REGISTRY}/${service}:${BUILD_NUMBER}"

).push()



}



}



}


}


}





stage('Deploy To EKS') {


steps {


sh """

aws eks update-kubeconfig \

--region ${AWS_REGION} \

--name ${EKS_CLUSTER}



kubectl apply \

-f ${SERVICE}/k8s/


"""


}


}


}


post {


success {


echo "Deployment Successful"


}


failure {


echo "Deployment Failed"


}


}


}
