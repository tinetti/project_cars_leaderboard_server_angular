#!/usr/bin/env python

import argparse
import collections
import json
import os
import re
import subprocess
import sys

PACKAGE_JSON_FILE = 'package.json'


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
    return subprocess.check_output(["git", "status", "-s"])


def git_commit(message):
    subprocess.check_call(["git", "commit", "-am", message])


def main():
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--version", help="set app version")
    group.add_argument("--rev-major", action="store_true", help="rev major")
    group.add_argument("--rev-minor", action="store_true", help="rev minor")
    group.add_argument("--rev-patch", action="store_true", help="rev patch")
    parser.add_argument("--no-commit", action="store_true", help="don't commit changes to git")
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
            print os.path.basename(__file__) + ": error: please commit your changes:\n" + changes
            sys.exit(1)

    if current_version != version:
        print "writing version to package.json: " + version
        package_json['version'] = version
        write_package_json(package_json)

    print "committing"
    git_commit("revved version to " + version)


if __name__ == "__main__":
    main()
