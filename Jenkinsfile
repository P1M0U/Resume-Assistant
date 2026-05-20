pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'resume-assistant'
    }

    stages {
        stage('Checkout') {
            steps {
                // 直接在默认工作区拉取代码，不要用 dir()
                git branch: 'main',
                    url: 'https://gitee.com/pimou/resume_assistant.git',
                    credentialsId: 'gitee-ci'
            }
        }

        stage('Build with Docker Compose') {
            steps {
                // 直接在当前目录执行（默认就是仓库根目录）
                sh 'docker compose build'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                    docker compose down || true
                    docker compose up -d
                '''
            }
        }
    }
}