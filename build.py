#!/usr/bin/env python

import argparse
import collections
import json
import os
import re
import subprocess
import sys

PACKAGE_JSON_FILE = 'package.json'


def echo(message):
    print '%s: %s' % (os.path.basename(__file__), message)


def check_call(command):
    echo(' '.join(command))
    return subprocess.check_call(command)


def check_output(command):
    echo(' '.join(command))
    return subprocess.check_output(command)


def read_package_json():
    with open(PACKAGE_JSON_FILE, 'r') as file:
        return json.load(file, object_pairs_hook=collections.OrderedDict)


def rev_version(version, args):
    match = re.match(r'(\d+)\.(\d+)\.(\d+)', version)
    major = match.group(1)
    minor = match.group(2)
    patch = match.group(3)

    inc_major = 1 if args.rev_major else 0
    inc_minor = 1 if args.rev_minor else 0
    inc_patch = 1 if args.rev_patch else 0

    return '%s.%s.%s' % (int(major) + inc_major, int(minor) + inc_minor, int(patch) + inc_patch)


def write_package_json(package_json):
    with open('package.json', 'w') as file:
        json.dump(package_json, file, indent=2)


def git_status():
    return check_output(["git", "status", "-s"])


def git_commit(message):
    return check_call(["git", "commit", "-am", message])


def docker_build():
    return check_call(["docker", "build", "-t", "pcars-leaderboard", "."])


def docker_tag(tag):
    return check_call(["docker", "tag", "pcars-leaderboard", tag])


def docker_push(name):
    return check_call(["docker", "push", name])


def main():
    parser = argparse.ArgumentParser()
    version_group = parser.add_mutually_exclusive_group()
    version_group.add_argument("--version", help="set app version")
    version_group.add_argument("--rev-major", action="store_true", help="rev major")
    version_group.add_argument("--rev-minor", action="store_true", help="rev minor")
    version_group.add_argument("--rev-patch", action="store_true", help="rev patch")
    git_group = parser.add_mutually_exclusive_group()
    git_group.add_argument("--no-commit", action="store_true", help="don't commit changes to git")
    git_group.add_argument("--no-push", action="store_true", help="don't push changes to git remote")
    args = parser.parse_args()

    package_json = read_package_json()
    current_version = package_json['version']
    if args.version:
        version = args.version
    elif args.rev_major or args.rev_minor or args.rev_patch:
        version = rev_version(current_version, args)
    else:
        version = current_version

    if not args.no_commit:
        changes = git_status()
        if changes:
            echo("error: please commit your changes:\n" + changes)
            sys.exit(1)

    if current_version != version:
        echo("writing version to package.json: " + version)
        package_json['version'] = version
        write_package_json(package_json)

    if not args.no_commit:
        git_commit("revved version to " + version)

    docker_build()
    registry_name = "registry.swervesoft.com/pcars-leaderboard"
    docker_tag(registry_name + ":" + version)
    docker_tag(registry_name + ":latest")
    docker_push(registry_name)


if __name__ == "__main__":
    main()
