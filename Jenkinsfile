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
        echo "Running SonarQube scan..."

        withSonarQubeEnv('sonar-server') {
            sh """
                sonar-scanner \
                -Dsonar.projectKey=Portfolio_Git_Jenkins \
                -Dsonar.projectName=Portfolio_Git_Jenkins \
                -Dsonar.projectVersion=1.0 \
                -Dsonar.sources=src \
                -Dsonar.tests=src \
                -Dsonar.test.inclusions=**/*.test.ts,**/*.test.tsx \
                -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/*.config.js,**/*.config.ts \
                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                -Dsonar.typescript.tsconfigPath=tsconfig.json \
                -Dsonar.sourceEncoding=UTF-8 \
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
stage("Performing Unit Test"){
    steps {
        echo "Running Unit Test..."
        sh "npm run test"
        dir("server") {
           echo "Running Unit Test In Server.."
           sh "npm run test"
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
                to:"sahilsaykar24@gmail.com",
                subject:"Successfully Pipeline Excuted..'${env.JOB_NAME}' and Build Number : '${env.BUILD_NUMBER}'",
                body:"GOOD NEWS \n Your Pipeline is successfully Completely \n Build URL : '${env.BUILD_URL}'"
            )
        }
        failure {
            echo "❌ Pipeline Failed."
            emailext(
                to:"sahilsaykar24@gmail.com",
                subject:"Failed Pipeline.. '${env.JOB_NAME}' with build Number: '${env.BUILD_NUMBER}'",
                body:"BAD NEWS \n Your Pipeline Is Failed ..\n Build URL : '${env.BUILD_URL}'"
            )
        }
    }
}
