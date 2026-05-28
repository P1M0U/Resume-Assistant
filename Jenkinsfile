pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME     = 'resume-assistant'
        DOCKER_BUILDKIT          = '0'
        COMPOSE_DOCKER_CLI_BUILD = '0'
        DOCKER_CACHE_DIR         = '/tmp/docker-build-cache'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                // 清理工作空间，解决权限残留问题
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://gitee.com/pimou/Resume-Assistant.git',
                    credentialsId: 'gitee-jenkins'
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

        stage('Prepare Environment File') {
            steps {
                withCredentials([file(credentialsId: 'env-yaml', variable: 'ENV_FILE')]) {
                    sh '''
                        echo "准备环境配置文件..."
                        # 确保目录存在
                        mkdir -p backend/app
                        # 只替换 env.yaml，不删除其他代码
                        cp $ENV_FILE backend/app/env.yaml
                        echo "env.yaml 已放置"
                        ls -la backend/app/env.yaml
                    '''
                }
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

        stage('Deploy') {
            steps {
                sh '''
                    # 停止并删除旧容器
                    docker compose down --remove-orphans --volumes || true
                    # 强制重新构建并启动
                    docker compose up -d --force-recreate --build
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