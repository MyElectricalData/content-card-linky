version=
ifneq ($(version),)
$(eval VERSION=$(version))
endif

commit_msg=
ifneq ($(commit_msg),)
$(eval COMMIT_MSG=$(commit_msg))
endif


define check_version
	if [ -z "$(VERSION)" ]; then echo "Version paramater is mandatory (ex : make create-release version=v1.5.4)"; exit; fi
endef
define check_commit
	if [ -z "$(COMMIT_MSG)" ]; then echo "Commit msg paramater is mandatory (ex : make create-release version=v1.5.4 commit_msg="test")"; exit; fi
endef


.ONESHELL:

create-pre-release: git-add git-commit git git-push
	@$(call check_version)
	@$(call check_commit)
	gh release delete $(VERSION) -y
	git tag -d $(VERSION)
	git push --delete origin $(VERSION)
	git tag $(VERSION)
	git push origin $(VERSION)
	gh release create -t $(VERSION) --generate-notes --prerelease $(VERSION)

create-release: git-add git-commit git git-push
	@$(call check_version)
	@$(call check_commit)
	gh release delete $(VERSION) -y
	git tag -d $(VERSION)
	git push --delete origin $(VERSION)
	git tag $(VERSION)
	git push origin $(VERSION)
	gh release create -t $(VERSION) --generate-notes --prerelease $(VERSION)

git-add:
	git add --all;

git-commit:
	@$(call check_commit)
	git commit -m "$(commit_msg)";

git-push:
	git push origin dev