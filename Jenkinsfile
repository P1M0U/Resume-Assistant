pipeline {
    agent any

    environment {
        // 你的项目部署目录
        PROJECT_DIR = '/home/pimou/Public/resume_ai'
        // docker compose 项目名称（通常与目录名一致）
        COMPOSE_PROJECT_NAME = 'resume-assistant'
    }

    stages {
        stage('Checkout') {
            steps {
                // 直接拉取代码到指定的部署目录
                dir("${PROJECT_DIR}") {
                    git branch: 'main',
                        url: 'https://github.com/P1M0U/Resume-Assistant.git',
                        credentialsId: 'github-ci'
                }
            }
        }

        stage('Build with Docker Compose') {
            steps {
                // 进入部署目录，使用 docker compose 构建
                dir("${PROJECT_DIR}") {
                    sh 'docker compose build'
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                // 进入部署目录，使用 docker compose 部署
                dir("${PROJECT_DIR}") {
                    sh '''
                        docker compose down || true
                        docker compose up -d
                    '''
                }
            }
        }
    }
}