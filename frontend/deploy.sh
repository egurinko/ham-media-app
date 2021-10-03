while getopts :y OPT
do
  case $OPT in
     y ) SKIP_DEPLOY_CHECK=true ;;
     * ) echo "$OPTARGは定義されていません（OPT=$OPT）" ;;
  esac
done


AWS_PROFILE=private

echo "aws profile: ${AWS_PROFILE}"
echo "environment: ${ENV}"

if [ -z "$SKIP_DEPLOY_CHECK" ]; then
  read -p "Deploy start?[y/n]:" YN
  if [ "${YN}" != "y" ]; then
    echo "exit!"
    exit 1
  fi
fi

echo "copy serverless-${ENV}.yml"
cp serverless-${ENV}.yml serverless.yml

yarn install

AWS_PROFILE=${AWS_PROFILE} aws s3 sync s3://ham-media-app-serverless-state/${ENV}/.serverless .serverless --delete

sls --stage ${ENV}

AWS_PROFILE=${AWS_PROFILE} aws s3 sync .serverless s3://ham-media-app-serverless-state/${ENV}/.serverless --delete

rm serverless.yml
