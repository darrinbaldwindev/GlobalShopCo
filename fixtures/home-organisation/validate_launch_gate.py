#!/usr/bin/env python3
import json
from pathlib import Path

REQUIRED_FOR_LAUNCH = [
    "supplier",
    "sku",
    "identity_state",
    "wholesale_cost",
    "supplier_freight",
    "dropship_permission_state",
    "stock_state",
    "returns_warranty_state",
    "proposed_retail",
    "free_delivery_contribution",
]


def is_launch_ready(record):
    for field in REQUIRED_FOR_LAUNCH:
        value = record.get(field)
        if value is None or value == "" or value == "UNKNOWN":
            return False
    if record.get("identity_state") != "VERIFIED":
        return False
    if record.get("dropship_permission_state") not in {"VERIFIED", "NOT_REQUIRED"}:
        return False
    if record.get("stock_state") != "VERIFIED":
        return False
    if record.get("returns_warranty_state") != "VERIFIED":
        return False
    try:
        return float(record.get("free_delivery_contribution")) > 0
    except (TypeError, ValueError):
        return False


def main():
    path = Path(__file__).with_name("launch-gate.synthetic.json")
    record = json.loads(path.read_text(encoding="utf-8"))

    assert record["sku"] == "15510"
    assert record["ean"] == "9340957115510"
    assert record["identity_state"] == "VERIFIED"
    assert record["commercial_state"] == "HOLD"
    assert record["launch_ready"] is False
    assert not is_launch_ready(record), "candidate with UNKNOWN freight/economics must fail closed"

    adversarial = dict(record)
    adversarial["launch_ready"] = True
    assert not is_launch_ready(adversarial), "self-asserted launch_ready must not override missing evidence"

    almost = dict(record)
    almost.update({
        "wholesale_cost": 10.0,
        "supplier_freight": 5.0,
        "dropship_permission_state": "VERIFIED",
        "stock_state": "VERIFIED",
        "returns_warranty_state": "VERIFIED",
        "proposed_retail": 29.95,
        "free_delivery_contribution": 0.0,
    })
    assert not is_launch_ready(almost), "zero contribution must not pass launch gate"

    complete = dict(almost)
    complete["free_delivery_contribution"] = 4.25
    assert is_launch_ready(complete), "evidence-complete positive synthetic fixture should be pass-eligible"

    print("PASS: Home Organisation launch gate fails closed on missing freight/economics and self-asserted readiness")


if __name__ == "__main__":
    main()
