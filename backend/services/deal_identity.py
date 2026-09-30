"""Transaction identity includes date and type, never just the two parties."""
from datetime import datetime

def deal_identity(deal):
    date = deal.get("announced_date")
    if isinstance(date, datetime):
        date = date.isoformat()
    if not date:
        raise ValueError("A transaction needs an explicit announcement date")
    return {
        "acquirer": deal["acquirer"], "target": deal["target"],
        "announced_date": date, "deal_type": deal["deal_type"],
    }
