pipeline {
    agent any

    environment {
        // 移除 PROJECT_DIR，改用 Jenkins 默认工作区
        COMPOSE_PROJECT_NAME = 'resume-assistant'
    }

    stages {
        stage('Checkout') {
            steps {
                // 直接在默认工作区拉取代码
                // 注意：这里改成了 Gitee 地址和凭证，如果你继续用 GitHub，请改回原来的
                git branch: 'main',
                    url: 'https://gitee.com/pimou/resume_assistant.git',
                    credentialsId: 'gitee-ci'
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