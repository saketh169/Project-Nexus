# GitHub Workflow

## Initial Setup
```bash
git init
git remote add origin "https://github.com/saketh169/Project-Nexus.git"
```

## Complete Workflow (Pull → Commit → Push → PR)
```bash
# 1. Pull latest from main
git pull origin main

# 2. Add and commit changes
git add .
git commit -m "Your commit message"

# 3. Switch to required branch (saketh)
git checkout saketh

# 4. Push to required branch
git push -u origin saketh

# 5. Create Pull Request to main on GitHub
# Visit: https://github.com/saketh169/Project-Nexus/pull/new/saketh
```

## Handling Conflicts When Pulling
```bash
# Before pulling, stash your changes
git stash

# Pull from main
git pull origin main

# Apply stashed changes
git stash pop

# If conflicts occur
git status
# Resolve conflicts manually in files
git add .
git commit -m "Merge conflicts resolved"
git push
```

## Remote Commands
```bash
git remote -v                           # View all remotes
git remote add origin <url>             # Add new remote
git remote rename origin oldname         # Rename remote
git remote remove origin                # Delete remote
git remote set-url origin <new-url>     # Change remote URL
```

## Branch Commands
```bash
git branch -a                           # View all branches
git branch -d saketh                    # Delete branch
git branch -m saketh new-branch-name    # Rename branch
git checkout saketh                     # Switch to branch
git checkout -b saketh                  # Create and switch to new branch
git branch -m old-name new-name         # Rename local branch
git push origin --delete saketh         # Delete remote branch
```

## Stash Commands
```bash
git stash                                           # Stash changes
git stash save "Your stash name"                   # Stash with custom name
git stash list                                     # View all stashes
git stash pop                                      # Apply latest stash and remove
git stash apply stash@{0}                          # Apply stash without removing
git stash drop stash@{0}                           # Delete specific stash
git stash clear                                    # Delete all stashes
git stash show stash@{0}                           # View stash changes
```

## Other Useful Commands
```bash
git log                         # View commit history
git status                      # Check current status
git diff                        # See changes before committing
```
