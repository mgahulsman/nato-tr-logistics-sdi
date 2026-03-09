import json
import os
from pathlib import Path

import geopandas as gpd
import topojson as tp
from shapely.geometry import LineString, Point, Polygon

DATA_DIR = Path(__file__).parent.parent.parent / "data"


def osm_to_gdf(osm_data):
    nodes = {}
    ways = []

    for element in osm_data.get("elements", []):
        if element["type"] == "node":
            nodes[element["id"]] = (element["lon"], element["lat"])
        elif element["type"] == "way":
            ways.append(element)

    features = []
    for way in ways:
        coords = []
        for ref in way.get("nodes", []):
            if ref in nodes:
                coords.append(nodes[ref])

        if len(coords) >= 2:
            geom = LineString(coords)
            tags = {k: v for k, v in way.items() if k not in ["type", "id", "nodes"]}
            features.append({"geometry": geom, "properties": tags})

    if not features:
        return gpd.GeoDataFrame()

    return gpd.GeoDataFrame.from_features(features)


def convert_to_topojson(layer_type):
    input_file = DATA_DIR / "geo" / "raw" / f"{layer_type}.json"
    output_file = DATA_DIR / "istanbul" / f"infra_{layer_type}.topojson"

    if not os.path.exists(input_file):
        print(f"Skipping {layer_type}: file not found at {input_file}")
        return

    print(f"Minimization of {layer_type}...")

    with open(input_file, "r", encoding="utf-8") as f:
        osm_data = json.load(f)

    gdf = osm_to_gdf(osm_data)

    if gdf.empty:
        print(f"Skipping {layer_type}: no valid geometries found")
        return

    essential_cols = ["name", "maxweight", "maxheight", "lanes", "surface", "geometry"]
    gdf = gdf[[c for c in essential_cols if c in gdf.columns]]

    gdf["geometry"] = gdf["geometry"].simplify(tolerance=0.0001)

    topo = tp.Topology(gdf, prequantize=True)

    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    topo.to_json(output_file)
    print(f"Success! TopoJSON saved in: {output_file}")


if __name__ == "__main__":
    layers = ["tunnels", "bridges", "highways", "hospitals", "power", "ports", "fuel"]

    for layer in layers:
        convert_to_topojson(layer)
