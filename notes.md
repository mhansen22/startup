# GitHub Notes - 1/12/24:

## Creating and Cloning a Repository:

**Create a Repository on GitHub:**
  - Name: 'startup'
  - Public, with a default README.md and license.
  
**Clone Repository to Local Environment:**
  - git clone https://github.com/webprogramming260/startup-example.git
  - cd startup

## Making Changes to a File:

If the file is called test.md:
- printf "\nChange from my development environment!\n" >> test.md
- git add test.md
- git commit -am "update(notes) thoughts about startup applications"
- git push

This is the pattern that you want to make a reflexive part of your development process:
1. Pull the repository's latest changes from GitHub (git pull)
2. Make changes to the code
3. Commit the changes (git commit)
4. Push the changes to GitHub (git push)

Fetch: will get the latest information about the changes on GitHub without changing the local repository (see the differences between the clones and missing a commit). 

Pull: pull it down using the pull Git command.

EX:

➜  git fetch
➜  git status
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)

➜  git pull
Updating d13a9ce..cafe81a
Fast-forward
 test.md | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)

### Link to READ.me file:
 https://github.com/mhansen22/startup/blob/main/README.md

