#!/bin/bash

# Define paths
base_path="/config/www/orisha"
template_file="$base_path/orisha_travels_template.xltx"
month=$(date +%m)
year=$(date +%Y)
new_file="$base_path/offereins_travels_${year}_${month}.xltx"

# Step 1: Archive the current xltx
cp "$template_file" "$new_file"
