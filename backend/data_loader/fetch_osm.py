from pathlib import Path

import requests
import os
import time
import json
from datetime import datetime

# Safety limits defined by the user
MAX_REQUESTS_PER_DAY = 9000
MAX_BYTES_PER_DAY = 800 * 1024 * 1024 # 800 MB in bytes
STATS_FILE = os.getcwd() + '..\\..\\data\\usage_stats.json'

DATA_DIR = Path(__file__).parent.parent.parent / "data"
STATS_FILE = DATA_DIR / "usage_stats.json"


def load_stats():
    with open(STATS_FILE, "r") as f:
        stats = json.load(f)
        if stats.get("date") == datetime.now().strftime("%Y-%m-%d"):
            return stats
    return {"date": datetime.now().strftime("%Y-%m-%d"), "request_count": 0, "bytes_downloaded": 0}

def save_stats(stats):
    os.makedirs(os.path.dirname(STATS_FILE), exist_ok=True)
    with open(STATS_FILE, "w") as f:
        json.dump(stats, f)

def fetch_istanbul_infra(layer_type, stats):
    if stats["request_count"] >= MAX_REQUESTS_PER_DAY:
        print(f"Daily request limit reached ({MAX_REQUESTS_PER_DAY}). Skipping {layer_type}.")

    if stats["bytes_downloaded"] >= MAX_BYTES_PER_DAY:
        print(f"Daily download limit reached (800 MB). Skipping {layer_type}.")

    bbox = "40.845,28.784,41.161,29.341" # Istanbul
    queries = {
        "tunnels": f'way["tunnel"="yes"]["highway"~"motorway|trunk|primary|secondary"]({bbox});',
        "bridges": f'way["bridge"="yes"]["highway"~"motorway|trunk|primary|secondary"]({bbox});',
        "highways": f'way["highway"~"motorway|trunk"]({bbox});',
        "hospitals": f'node["amenity"="hospital"]({bbox});way["amenity"="hospital"]({bbox});relation["amenity"="hospital"]({bbox});',
        "power": f'node["power"~"substation|plant"]({bbox});way["power"~"substation|plant"]({bbox});',
        "ports": f'node["industrial"~"port|harbour"]({bbox});way["industrial"~"port|harbour"]({bbox});',
        "fuel": f'node["amenity"="fuel"]({bbox});way["amenity"="fuel"]({bbox});'
    }


    # "You can safely assume that you don't disturb other users when you do less than 10,000 queries per day and download less than 1 GB data per day"
    # Source: https://wiki.openstreetmap.org/wiki/Overpass_API
    # Therefore we choose a save option: max. 9000 requests per day and download max. 800mb per day
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"[out:json][timeout:90];({queries[layer_type]});out body;>;out skel qt;"

    max_retries = 3
    for attempt in range(max_retries):
        print(f"Fetching {layer_type} (Attempt {attempt + 1})...")
        try:
            response = requests.post(overpass_url, data={'data': overpass_query})
            
            if response.status_code == 200:
                content = response.content
                file_size = len(content)
                
                # Check if this specific download will push us over the 800MB limit
                if stats["bytes_downloaded"] + file_size > MAX_BYTES_PER_DAY:
                    print(f"Warning: Downloading {layer_type} would exceed 800 MB limit. Aborting.")
                    return

                file_path = f"data/raw_{layer_type}.json"
                os.makedirs("data", exist_ok=True)
                with open(file_path, "wb") as f:
                    f.write(content)
                
                # Update usage stats
                stats["request_count"] += 1
                stats["bytes_downloaded"] += file_size
                save_stats(stats)
                
                print(f"Successfully saved {layer_type} ({file_size} bytes)")
                return
                
            elif response.status_code == 429:
                print(f"Rate limited (429) for {layer_type}. Waiting 30s...")
                time.sleep(30)
            else:
                print(f"Server error {response.status_code} for {layer_type}")
                break
                
        except Exception as e:
            print(f"Connection error for {layer_type}: {str(e)}")
            time.sleep(5)

if __name__ == "__main__":
    current_stats = load_stats()
    layers = ["tunnels", "bridges", "highways", "hospitals", "power", "ports", "fuel"]
    
    for layer in layers:
        fetch_istanbul_infra(layer, current_stats)
        time.sleep(2) # Minimum delay between requests to remain polite