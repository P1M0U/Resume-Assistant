pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/P1M0U/Resume-Assistant.git',
                    credentialsId: 'github-ci'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t resume-assistant:latest .'
            }
        }

        stage('Deploy to Local Docker') {
            steps {
                sh '''
                    docker stop resume-assistant || true
                    docker rm resume-assistant || true
                    docker run -d --name resume-assistant -p 8081:8080 resume-assistant:latest
                '''
            }
        }
    }
}