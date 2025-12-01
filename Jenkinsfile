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
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling code from GitHub..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing frontend dependencies..."
                sh 'npm install'

                echo "Installing backend dependencies..."
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests (Vitest)') {
            steps {
                echo "Running frontend tests..."
                sh 'npm run test -- --coverage --reporter=junit --outputFile=frontend-tests.xml'

                echo "Running backend tests..."
                dir('server') {
                    sh 'npm run test -- --coverage --reporter=junit --outputFile=backend-tests.xml'
                }
            }
            post {
                always {
                    junit '**/*tests.xml'
                }
            }
        }

        stage('Build Frontend (Vite)') {
            steps {
                sh 'npm run build'
            }
        }
       stage('Pre-Cleanup') {
    steps {
        sh """
            echo "Cleaning previous Sonar artifacts..."
            rm -rf .sonar
            rm -rf .scannerwork
        """
    }
}

stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('sonar-server') {
            sh """
                sonar-scanner \
                -Dsonar.projectKey=Portfolio_Git_Jenkins \
                -Dsonar.sources=src \
                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                -Dsonar.host.url=http://localhost:9000 \
                -Dsonar.login=$SONAR_TOKEN
            """
        }
    }
}

stage('Quality Gate') {
    steps {
        timeout(time: 10, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
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
        }
        failure {
            echo "❌ Pipeline Failed."
        }
    }
}
