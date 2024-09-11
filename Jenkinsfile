pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-credentials')
        DOCKER_IMAGE_NAME = "moabdelazem/fp_backend"
        DOCKER_IMAGE_NAME_FRONTEND = "moabdelazem/fp_frontend"
        DOCKER_IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clean workspace before checking out the code
                cleanWs()
                // Checkout code from GitHub
                checkout scm
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    // Navigate to the backend directory
                    dir('backend') {
                        // Build the Docker image
                        sh "docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ."
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    // Navigate to the backend directory
                    dir('frontend') {
                        // Build the Docker image
                        sh "docker build -t ${DOCKER_IMAGE_NAME_FRONTEND}:${DOCKER_IMAGE_TAG} ."
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Log in to Docker Hub
                    sh "echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin"
                    
                    // Push the image to Docker Hub
                    sh "docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                    sh "docker push ${DOCKER_IMAGE_NAME_FRONTEND}:${DOCKER_IMAGE_TAG}"
                }
            }
        }
    }

    post {
        always {
            // Log out from Docker Hub
            sh "docker logout"
        }
        success {
            echo "Successfully built and pushed Docker image to Docker Hub"
            // After building and pushing the Docker image, trigger the Terraform pipeline
            // The Jenkins File of this pipeline is provided directly in the Terraform pipeline initial configuration
            // build job: 'terraform-pipeline' , wait: false
        }
        failure {
            echo "Failed to build or push Docker image"
        }
    }
}