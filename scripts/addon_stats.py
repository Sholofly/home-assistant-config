#!/usr/bin/env python3
"""Collect add-on CPU/memory stats from the Supervisor API."""

import json
import os
import subprocess
import sys


def main():
    token = os.environ.get("SUPERVISOR_TOKEN", "")
    if not token:
        print(json.dumps({"addons": [], "total_cpu": 0, "total_mem": 0}))
        sys.exit(0)

    headers = f"Authorization: Bearer {token}"

    # Get all add-ons
    try:
        result = subprocess.run(
            ["curl", "-s", "-H", headers, "http://supervisor/addons"],
            capture_output=True,
            text=True,
            timeout=10,
        )
        addons = json.loads(result.stdout)["data"]["addons"]
    except Exception:
        print(json.dumps({"addons": [], "total_cpu": 0, "total_mem": 0}))
        sys.exit(0)

    running = [a for a in addons if a.get("state") == "started"]
    stats = []

    for addon in running:
        try:
            result = subprocess.run(
                [
                    "curl",
                    "-s",
                    "-H",
                    headers,
                    f"http://supervisor/addons/{addon['slug']}/stats",
                ],
                capture_output=True,
                text=True,
                timeout=5,
            )
            s = json.loads(result.stdout)["data"]
            stats.append(
                {
                    "name": addon["name"],
                    "slug": addon["slug"],
                    "version": addon.get("version", "?"),
                    "cpu": round(s["cpu_percent"], 1),
                    "mem_mb": round(s["memory_usage"] / 1048576, 1),
                    "mem_pct": round(s["memory_percent"], 1),
                }
            )
        except Exception:
            stats.append(
                {
                    "name": addon["name"],
                    "slug": addon["slug"],
                    "version": addon.get("version", "?"),
                    "cpu": 0,
                    "mem_mb": 0,
                    "mem_pct": 0,
                }
            )

    # Sort by memory usage (highest first)
    stats.sort(key=lambda x: x["mem_mb"], reverse=True)

    total_mem = round(sum(s["mem_mb"] for s in stats), 0)
    total_cpu = round(sum(s["cpu"] for s in stats), 1)

    output = {
        "addons": stats,
        "total_cpu": total_cpu,
        "total_mem": total_mem,
        "count": len(stats),
    }

    print(json.dumps(output))


if __name__ == "__main__":
    main()
