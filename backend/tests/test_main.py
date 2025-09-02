import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from datetime import datetime, timedelta, timezone

client = TestClient(app)


# ---------- AUTH TESTS ----------
def test_register_and_login():
    # Register user
    response = client.post("/auth/register", json={
        "email": "testuser@example.com",
        "password": "secret123",
        "role": "donor"
    })
    assert response.status_code in [200, 201]
    data = response.json()
    assert "access_token" in data
    assert data["role"] == "donor"

    # Login user
    response = client.post(
        "/auth/login",
        data={"username": "testuser@example.com", "password": "secret123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


# ---------- DONORS TESTS ----------
def test_create_and_list_donors():
    response = client.post("/donors", json={
        "name": "Donor A",
        "city": "Cape Town",
        "contact_email": "donor@example.com"
    })
    assert response.status_code in [200, 201]
    donor = response.json()
    assert donor["name"] == "Donor A"

    response = client.get("/donors")
    assert response.status_code == 200
    donors = response.json()
    assert any(d["name"] == "Donor A" for d in donors)


# ---------- NGOS TESTS ----------
def test_create_and_list_ngos():
    response = client.post("/ngos", json={
        "name": "NGO A",
        "city": "Johannesburg",
        "contact_email": "ngo@example.com"
    })
    assert response.status_code in [200, 201]
    ngo = response.json()
    assert ngo["name"] == "NGO A"

    response = client.get("/ngos")
    assert response.status_code == 200
    ngos = response.json()
    assert any(n["name"] == "NGO A" for n in ngos)


# ---------- LISTINGS TESTS ----------
def test_create_and_list_listings():
    # First create donor
    donor_response = client.post("/donors", json={
        "name": "Donor B",
        "city": "Pretoria",
        "contact_email": "donorb@example.com"
    })
    donor_id = donor_response.json()["id"]

    # Create listing
    response = client.post(f"/listings?donor_id={donor_id}", json={
        "title": "Food Donation",
        "description": "Boxes of canned food",
        "quantity": 10,
        "unit": "boxes",
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=1)).isoformat(),
        "city": "Pretoria"
    })
    assert response.status_code in [200, 201]
    listing = response.json()
    assert listing["title"] == "Food Donation"

    # List listings
    response = client.get("/listings")
    assert response.status_code == 200
    listings = response.json()
    assert any(l["title"] == "Food Donation" for l in listings)

    # Search listings
    response = client.get("/listings/search", params={"city": "Pretoria", "status": "OPEN"})
    assert response.status_code == 200
    results = response.json()
    assert any(r["city"] == "Pretoria" for r in results)


# ---------- CLAIMS TESTS ----------
def test_create_claim():
    # Create donor
    donor_response = client.post("/donors", json={
        "name": "Donor C",
        "city": "Durban",
        "contact_email": "donorc@example.com"
    })
    donor_id = donor_response.json()["id"]

    # Create NGO
    ngo_response = client.post("/ngos", json={
        "name": "NGO B",
        "city": "Durban",
        "contact_email": "ngob@example.com"
    })
    ngo_id = ngo_response.json()["id"]

    # Create listing
    listing_response = client.post(f"/listings?donor_id={donor_id}", json={
        "title": "Clothes Donation",
        "description": "Winter jackets",
        "quantity": 20,
        "unit": "items",
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=1)).isoformat(),
        "city": "Durban"
    })
    listing_id = listing_response.json()["id"]

    # Create claim
    claim_response = client.post("/claims", json={
        "listing_id": listing_id,
        "ngo_id": ngo_id,
        "note": "Urgent need"
    })
    assert claim_response.status_code in [200, 201]
    claim = claim_response.json()
    assert claim["listing_id"] == listing_id
    assert claim["ngo_id"] == ngo_id