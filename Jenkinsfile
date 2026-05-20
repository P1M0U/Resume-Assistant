pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'resume-assistant'
    }

    stages {
        stage('Checkout') {
            steps {
                // 拉取代码到默认工作区
                git branch: 'main',
                    url: 'https://gitee.com/pimou/resume_assistant.git',
                    credentialsId: 'gitee-ci'
            }
        }

        stage('Debug Directory') {
            steps {
                // 打印当前目录和文件列表
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build with Docker Compose') {
            steps {
                // 强制在仓库根目录执行
                sh 'ls -la'  // 再次确认文件存在
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