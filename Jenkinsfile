pipeline {
    agent any

    environment {
        PROJECT_DIR = '/home/pimou/Public/resume_assistant'
        COMPOSE_PROJECT_NAME = 'resume-assistant'
    }

    stages {
        stage('Checkout') {
            steps {
                // 切换到项目目录
                dir("${PROJECT_DIR}") {
                    // 拉取代码
                    git branch: 'main',
                        url: 'https://gitee.com/pimou/resume_assistant.git',
                        credentialsId: 'gitee-ci'
                }
            }
        }

        stage('Build with Docker Compose') {
            steps {
                // 直接在默认工作区执行 docker compose build
                sh 'docker compose build'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                // 直接在默认工作区执行 docker compose up
                sh '''
                    docker compose down || true
                    docker compose up -d
                '''
            }
        }
    }
}