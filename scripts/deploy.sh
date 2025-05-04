#!/bin/bash
# Placeholder for deployment scripts
echo "Building smart contract..."
cd smart-contract
linera project build
linera project publish --json > ../app_id.json
linera project deploy --json > ../service_id.json
echo "Deployment complete. IDs in app_id.json and service_id.json"