#!/usr/bin/env bash

set -euo pipefail

usage() {
  echo "Usage: $0 <tag>"
  echo "Example: $0 v1.2.3"
}

if [[ $# -ne 1 ]]; then
  usage
  exit 1
fi

tag="$1"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: this script must be run inside a git repository." >&2
  exit 1
fi

if git rev-parse --verify "refs/tags/$tag" >/dev/null 2>&1; then
  echo "Error: tag '$tag' already exists locally." >&2
  exit 1
fi

echo "Creating annotated tag '$tag'..."
git tag -a "$tag" -m "Release $tag"

echo "Pushing tag '$tag' to origin..."
git push origin "$tag"

echo "Release tag '$tag' created and pushed."
