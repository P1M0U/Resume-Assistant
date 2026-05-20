pipeline {
    agent any

    environment {
        // 你的项目部署目录
        PROJECT_DIR = '/home/pimou/Public/resume_ai'
        // 容器名称
        CONTAINER_NAME = 'resume-assistant'
        // 镜像名称
        IMAGE_NAME = 'resume-assistant:latest'
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

        stage('Build Docker Image') {
            steps {
                // 进入部署目录并构建镜像
                dir("${PROJECT_DIR}") {
                    sh 'docker build -t ${IMAGE_NAME} .'
                }
            }
        }

        stage('Deploy to Local Docker') {
            steps {
                script {
                    sh """
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                        docker run -d --name ${CONTAINER_NAME} -p 8081:8080 --restart always ${IMAGE_NAME}
                    """
                }
            }
        }
    }
}