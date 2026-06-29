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
            description: 'Select microservice to build and deploy'
        )

    }



    environment {

        REGISTRY = "hiqode01.jfrog.io/docker-local"

        AWS_REGION = "us-east-1"

        EKS_CLUSTER = "testCluster1"

        JFROG_CREDS = "jfrog_login"

        AWS_CREDS = "aws_login"

        SONAR_SERVER = "sonar-dev"

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

                        services=[params.SERVICE]

                    }



                    def scannerHome = tool 'sonar-scanner'



                    withSonarQubeEnv("${SONAR_SERVER}") {


                        services.each { service ->



                            sh """

                            echo "Running SonarQube scan for ${service}"


                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=${service} \
                            -Dsonar.sources=${service}


                            """

                        }


                    }


                }

            }

        }







        stage('Docker Build') {


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

                        services=[params.SERVICE]

                    }





                    services.each { service ->



                        sh """

                        echo "Building Docker image for ${service}"


                        docker build \
                        -t ${REGISTRY}/${service}:${BUILD_NUMBER} \
                        ./${service}



                        """



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

                        services=[params.SERVICE]

                    }





                    withCredentials([usernamePassword(
                        
                        credentialsId: "${JFROG_CREDS}",
                        usernameVariable: 'JFROG_USER',
                        passwordVariable: 'JFROG_PASS'

                    )]) {



                        sh """

                        echo "Logging into JFrog"



                        echo \$JFROG_PASS | docker login \
                        ${REGISTRY} \
                        -u \$JFROG_USER \
                        --password-stdin



                        """





                        services.each { service ->



                            sh """

                            echo "Pushing ${service}"


                            docker push \
                            ${REGISTRY}/${service}:${BUILD_NUMBER}



                            """



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

                        services=[params.SERVICE]

                    }





                    withAWS(

                        credentials: "${AWS_CREDS}",

                        region: "${AWS_REGION}"

                    ) {



                        services.each { service ->




                            sh """

                            echo "Updating kubeconfig"



                            aws eks update-kubeconfig \
                            --region ${AWS_REGION} \
                            --name ${EKS_CLUSTER}



                            echo "Deploying ${service}"



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


            echo "================================"

            echo "Deployment Successful"

            echo "================================"

        }




        failure {


            echo "================================"

            echo "Deployment Failed"

            echo "================================"

        }


    }


}
