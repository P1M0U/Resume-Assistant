pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME     = 'resume-assistant'
        DOCKER_BUILDKIT          = '0'
        COMPOSE_DOCKER_CLI_BUILD = '0'
        DOCKER_CACHE_DIR         = '/tmp/docker-build-cache'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://gitee.com/pimou/resume_assistant.git',
                    credentialsId: 'gitee-ci'
            }
        }

        stage('Debug Directory') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Setup BuildKit Cache') {
            steps {
                sh 'mkdir -p ${DOCKER_CACHE_DIR}'
            }
        }

        stage('Build Backend') {
            options {
                timeout(time: 15, unit: 'MINUTES')
                retry(2)
            }
            steps {
                sh '''
                    echo "====== 开始构建后端服务 ======"
                    docker compose build backend \
                        --build-arg PIP_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/
                '''
            }
        }

        stage('Build Frontend') {
            options {
                timeout(time: 20, unit: 'MINUTES')
                retry(2)
            }
            steps {
                sh '''
                    echo "====== 开始构建前端服务 ======"
                    docker compose build frontend \
                        --build-arg NPM_REGISTRY=https://registry.npmmirror.com
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            options {
                timeout(time: 5, unit: 'MINUTES')
            }
            steps {
                sh '''
                    docker compose down --remove-orphans || true
                    docker compose up -d --force-recreate
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "等待服务启动..."
                    sleep 10

                    echo "检查后端服务..."
                    curl -f -s -o /dev/null -w "后端状态码: %{http_code}" \
                        http://localhost:8000/health || echo "后端未就绪"

                    echo ""

                    echo "检查前端服务..."
                    curl -f -s -o /dev/null -w "前端状态码: %{http_code}" \
                        http://localhost/ || echo "前端未就绪"

                    echo ""
                '''
            }
        }
    }

    post {
        failure {
            echo '构建或部署失败，执行清理操作...'
            sh '''
                docker compose down --remove-orphans --volumes || true
                docker system prune -f || true
                rm -rf ${DOCKER_CACHE_DIR}
            '''
        }
        success {
            echo '构建并部署成功！'
            sh '''
                echo "当前运行的容器:"
                docker compose ps
            '''
        }
        always {
            echo "清理悬空镜像..."
            sh 'docker image prune -f || true'
        }
    }
}