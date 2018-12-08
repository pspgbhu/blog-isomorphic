WORK_TREE="/opt/website/blog.pspgbhu.me/node-app"
APP_NAME="react-isomorphic"

git --work-tree=${WORK_TREE} --git-dir=${WORK_TREE}/.git checkout $WORK_TREE/.
git --work-tree=${WORK_TREE} --git-dir=${WORK_TREE}/.git checkout master
git --work-tree=${WORK_TREE} --git-dir=${WORK_TREE}/.git pull

# git --work-tree=${WORK_TREE} --git-dir=/var/www/repository/isomorphic.git pull

echo "server pull done."

cd $WORK_TREE

yarn

npm run build

pm2 delete $APP_NAME

npm run prd
