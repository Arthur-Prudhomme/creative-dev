npm run build

CD "dist"

git "init"
git "add" "-A"
git "commit" "-m" "'deploy'"

git "push" "--force" "git@github.com:Arthur-Prudhomme/creative-dev.git" "master:gh-pages"

CD ".."