import * as cdk from "@aws-cdk/core"
import * as amplify from '@aws-cdk/aws-amplify';
import * as codebuild from '@aws-cdk/aws-codebuild';

export class AmplifyInfraStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const intercompAmplifyApp = new amplify.App(this, 'intercompAmplifyApp', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'gpspelle',
        repository: 'intercomp',
        oauthToken: cdk.SecretValue.secretsManager('github-access-token'),
      }),
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({ // Alternatively add a `amplify.yml` to the repo
        version: '1.0',
        frontend: {
          phases: {
            preBuild: {
              commands: [
                'npm install'
              ]
            },
            build: {
              commands: [
                'npm run build'
              ]
            }
          },
          artifacts: {
            baseDirectory: 'build',
            files: [
              '**/*'
            ]
          },
          cache: {
            paths: [
              'node_modules/**/*'
            ]
          }
        }
      }),
    });

    // fixes https://github.com/aws-amplify/amplify-cli/issues/3606
    const fixReactRouterDom403CloudFrontIssueCustomRule = new amplify.CustomRule({
      source: '</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>',
      target: '/index.html',
      status: amplify.RedirectStatus.REWRITE,
    })

    intercompAmplifyApp.addCustomRule(fixReactRouterDom403CloudFrontIssueCustomRule)
    const mainBranch = intercompAmplifyApp.addBranch("main");

    const eCommerceDomain = new amplify.Domain(this, "intercomp-domain", {
      app: intercompAmplifyApp,
      domainName: "intercomp.com.br",
    });
 
    eCommerceDomain.mapRoot(mainBranch)
  }
}
