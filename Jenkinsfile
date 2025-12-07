pipeline {
    agent any

    tools {
        nodejs "node20"
    }

    options {
        timestamps()
    }

    environment {
        SONAR_TOKEN = credentials('sonar-token')
        DOCKERHUB = credentials('dockerhub-cred')
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "📥 Pulling code from GitHub..."
                checkout scm
            }
        }

        stage('Install & Test Frontend') {
            steps {
                echo "📦 Installing frontend deps..."
                sh 'npm install'

                echo "🧪 Running frontend tests..."
                sh 'npm run test -- --coverage --reporter=junit --outputFile=frontend-tests.xml'
            }

            post {
                always {
                    junit '**/frontend-tests.xml'
                }
            }
        }

        stage('Install & Test Backend') {
            steps {
                dir('server') {
                    echo "📦 Installing backend deps..."
                    sh 'npm install'

                    echo "🧪 Running backend tests..."
                    sh 'npm run test -- --coverage --reporter=junit --outputFile=backend-tests.xml'
                }
            }
            post {
                always {
                    junit '**/backend-tests.xml'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo "⚙️ Building Vite frontend..."
                sh 'npm run build'
            }
        }

        stage('SonarQube Scan') {
            steps {
                echo "🔎 Running SonarQube analysis..."

                withSonarQubeEnv('sonar-server') {
                    sh """
                        sonar-scanner \
                        -Dsonar.projectKey=Portfolio_Git_Jenkins \
                        -Dsonar.sources=src,server \
                        -Dsonar.exclusions=**/node_modules/**,**/dist/** \
                        -Dsonar.tests=src,server \
                        -Dsonar.test.inclusions=**/*.test.ts,**/*.test.tsx \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.login=$SONAR_TOKEN
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🐳 Building Docker image with multi-stage Dockerfile..."
                    dockerImage = docker.build("sahil0724/portfolio:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    echo "📤 Pushing Docker image to DockerHub..."

                    sh """
                        echo "${DOCKERHUB_PSW}" | docker login -u "${DOCKERHUB_USR}" --password-stdin
                        
                        docker tag sahil0724/portfolio:${env.BUILD_NUMBER} sahil0724/portfolio:latest

                        docker push sahil0724/portfolio:${env.BUILD_NUMBER}
                        docker push sahil0724/portfolio:latest

                        docker logout
                    """
                }
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline Completed Successfully!"
            emailext(
                to: "sahilsaykar24@gmail.com",
                subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Your pipeline completed successfully.\nBuild URL: ${env.BUILD_URL}"
            )
        }
        failure {
            echo "❌ Pipeline Failed."
            emailext(
                to: "sahilsaykar24@gmail.com",
                subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Your pipeline failed.\nBuild URL: ${env.BUILD_URL}"
            )
        }
    }
}
