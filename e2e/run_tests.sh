#cucumber tag
tag=$1

export COMMON_CONFIG_FILE=env/common.env #makes all the env vars available to all the processes that result from this script

#run cucumber tests & on failure run postcucumber
npm run cucumber -- --profile $tag || npm run postcucumber