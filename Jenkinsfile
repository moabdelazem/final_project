pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials') // Docker Hub credentials ID in Jenkins
        BACKEND_IMAGE = "moabdelazem/final_project_backend"
        FRONTEND_IMAGE = "moabdelazem/final_project_frontend"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/moabdelazem/team1-project/' // Replace with your repo URL
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    sh 'docker build -t $BACKEND_IMAGE:latest -f backend/Dockerfile backend/'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh 'docker build -t $FRONTEND_IMAGE:latest -f frontend/Dockerfile frontend/'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }

        stage('Push Backend Image to Docker Hub') {
            steps {
                script {
                    sh 'docker push $BACKEND_IMAGE:latest'
                }
            }
        }

        stage('Push Frontend Image to Docker Hub') {
            steps {
                script {
                    sh 'docker push $FRONTEND_IMAGE:latest'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            sh 'docker logout'
        }
    }
}
