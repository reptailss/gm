"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppPipelinesModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppPipelinesModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'bitbucket-pipelines.yml');
        const content = `
definitions:
  steps:
    - step: &DEV_build_and_push_image_and_deploy
        services:
          - docker
        image: atlassian/default-image:3
        script:
          - curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && aws/./install && aws --version
          - curl -LO https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && kubectl version --client
          - export BITBUCKET_COMMIT_SHORT=$(echo $BITBUCKET_COMMIT | cut -c1-7)
          - export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
          - export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
          - aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL
          - docker build -t $ECR_URL/$ECR_REPOSITORY:dev-$BITBUCKET_COMMIT_SHORT-$BITBUCKET_BUILD_NUMBER .
          - docker images
          - docker push $ECR_URL/$ECR_REPOSITORY:dev-$BITBUCKET_COMMIT_SHORT-$BITBUCKET_BUILD_NUMBER
          - aws eks --region $AWS_REGION update-kubeconfig --name $EKS_NAME
          - kubectl set image deployment/$K8s_DEPLOYMENT_NAME $K8s_CONTAINER_NAME=$ECR_URL/$ECR_REPOSITORY:dev-$BITBUCKET_COMMIT_SHORT-$BITBUCKET_BUILD_NUMBER  -n $K8s_NAMESPACE

    - step: &PROD_build_and_push_image
        services:
          - docker
        image: atlassian/default-image:3
        script:
          - curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && aws/./install && aws --version
          - curl -LO https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && kubectl version --client
          - export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
          - export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
          - aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL
          - docker build -t $ECR_URL/$ECR_REPOSITORY:$BITBUCKET_TAG .
          - docker images
          - docker push $ECR_URL/$ECR_REPOSITORY:$BITBUCKET_TAG

    - step: &PROD_deploy
        services:
          - docker
        image: atlassian/default-image:3
        script:
          - curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && aws/./install && aws --version
          - curl -LO https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && kubectl version --client
          - export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
          - export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
          - aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL
          - aws eks --region $AWS_REGION update-kubeconfig --name $EKS_NAME_PROD
          - kubectl set image deployment/$K8s_DEPLOYMENT_NAME_PROD $K8s_CONTAINER_NAME_PROD=$ECR_URL/$ECR_REPOSITORY:$IMAGE_VERSION  -n $K8s_NAMESPACE_PROD

pipelines:
  branches:
    dev:
      - step: *DEV_build_and_push_image_and_deploy
  tags:
    '{*.*.*}':
      - step: *PROD_build_and_push_image
  custom:
    deploy-to-prod:
      - variables:
          - name: IMAGE_VERSION
      - step: *PROD_deploy

        `;
        fs_1.default.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppPipelinesModule = CreateAppPipelinesModule;
//# sourceMappingURL=CreateAppPipelinesModule.js.map