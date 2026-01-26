import requests
import json
import sys

url = "http://localhost:8000/api/generate/plan"
payload = {
    "user_prompt": "Create a mind map about Artificial Intelligence",
    "image_base64": None
}
headers = {
    "Content-Type": "application/json"
}

print(f"Testing URL: {url}")
try:
    response = requests.post(url, json=payload, headers=headers, timeout=60)
    print(f"Status Code: {response.status_code}")
    print("Response Body:")
    print(response.text)
    
    if response.status_code == 200:
        print("SUCCESS: API responded correctly")
    else:
        print("FAILURE: API returned error status")
        
except Exception as e:
    print(f"ERROR: Failed to connect or request failed: {e}")
