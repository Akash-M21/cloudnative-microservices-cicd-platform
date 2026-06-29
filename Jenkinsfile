pipeline {

    agent any


    parameters {

        choice(
            name: 'SERVICE',
            choices: [
                'all',
                'api-gateway',
                'users',
                'products',
                'orders',
                'payments'
            ],
            description: 'Select microservice to deploy'
        )

    }


    environment {

        REGISTRY = "mycompany.jfrog.io/docker-local"

        AWS_REGION = "us-east-1"

        EKS_CLUSTER = "my-eks-cluster"

        JFROG_CREDS = "jfrog-creds"

        AWS_CREDS = "aws-creds"

        SONAR_SERVER = "sonarqube"

    }


    tools {

        sonarQube 'sonar-scanner'

    }


    stages {


        stage('Checkout') {

            steps {

                git branch: 'main',
                    url: 'https://github.com/Akash-M21/cloudnative-microservices-cicd-platform.git'

            }

        }



        stage('SonarQube Scan') {

            steps {

                withSonarQubeEnv("${SONAR_SERVER}") {

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

                timeout(
                    time: 5,
                    unit: 'MINUTES'
                ){

                    waitForQualityGate abortPipeline: true

                }

            }

        }




        stage('Docker Build') {

            steps {


                script {


                    def services=[]


                    if(params.SERVICE == "all") {


                        services = [

                            "api-gateway",
                            "users",
                            "products",
                            "orders",
                            "payments"

                        ]

                    }
                    else {


                        services = [

                            params.SERVICE

                        ]

                    }




                    services.each { service ->



                        docker.build(

                            "${REGISTRY}/${service}:${BUILD_NUMBER}",

                            "./${service}"

                        )


                    }

                }

            }

        }






        stage('Push Docker Images To JFrog') {


            steps {


                script {


                    def services=[]


                    if(params.SERVICE == "all") {


                        services=[

                            "api-gateway",
                            "users",
                            "products",
                            "orders",
                            "payments"

                        ]


                    }
                    else {


                        services=[

                            params.SERVICE

                        ]

                    }



                    docker.withRegistry(

                        "https://${REGISTRY}",

                        "${JFROG_CREDS}"

                    ){



                        services.each { service ->



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


                script {


                    def services=[]


                    if(params.SERVICE == "all") {


                        services=[

                            "api-gateway",
                            "users",
                            "products",
                            "orders",
                            "payments"

                        ]


                    }
                    else {


                        services=[

                            params.SERVICE

                        ]

                    }





                    withAWS(

                        credentials: "${AWS_CREDS}",

                        region: "${AWS_REGION}"

                    ){



                        services.each { service ->




                            sh """


                            echo "Updating kubeconfig..."


                            aws eks update-kubeconfig \

                            --region ${AWS_REGION} \

                            --name ${EKS_CLUSTER}



                            echo "Deploying ${service}..."



                            kubectl apply \

                            -f ${service}/k8s/



                            """



                        }



                    }



                }


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
