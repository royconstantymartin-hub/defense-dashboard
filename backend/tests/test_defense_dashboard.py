"""
Comprehensive Backend API Tests for Defense Industry Dashboard
Tests all endpoints: Dashboard, Market Data, Expenditures, Products, Announcements, M&A, Regulations
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndDashboard:
    """Health check and dashboard statistics tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print("✓ API root endpoint working")
    
    def test_dashboard_stats(self):
        """Test dashboard statistics endpoint"""
        response = requests.get(f"{BASE_URL}/api/dashboard/stats")
        assert response.status_code == 200
        data = response.json()
        # Verify expected fields
        assert "players_count" in data
        assert "announcements_count" in data
        assert "ma_count" in data
        assert "products_count" in data
        assert "total_market_cap" in data
        assert "total_expenditure" in data
        # Verify data values are reasonable
        assert data["players_count"] > 0, "Should have defense players"
        assert data["total_market_cap"] > 0, "Should have market cap"
        print(f"✓ Dashboard stats: {data['players_count']} players, ${data['total_market_cap']:.1f}B market cap")


class TestDefensePlayers:
    """Market Data / Defense Players API tests"""
    
    def test_get_all_players(self):
        """Test fetching all defense players"""
        response = requests.get(f"{BASE_URL}/api/defense-players")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Should have defense players"
        print(f"✓ Got {len(data)} defense players")
    
    def test_player_data_structure(self):
        """Test defense player data structure"""
        response = requests.get(f"{BASE_URL}/api/defense-players")
        assert response.status_code == 200
        data = response.json()
        player = data[0]
        # Verify required fields
        required_fields = ["id", "name", "ticker", "country", "market_cap", "stock_price", "change_percent", "revenue", "employees", "specializations"]
        for field in required_fields:
            assert field in player, f"Missing field: {field}"
        print(f"✓ Player data structure verified for {player['name']}")
    
    def test_player_filter_by_country(self):
        """Test filtering players by country"""
        response = requests.get(f"{BASE_URL}/api/defense-players?country=USA")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        if len(data) > 0:
            for player in data:
                assert player["country"] == "USA", "All players should be from USA"
        print(f"✓ Country filter working: {len(data)} USA players")


class TestExpenditures:
    """Defense Expenditures API tests"""
    
    def test_get_all_expenditures(self):
        """Test fetching all expenditures"""
        response = requests.get(f"{BASE_URL}/api/expenditures")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Should have expenditure data"
        print(f"✓ Got {len(data)} expenditure records")
    
    def test_expenditure_data_structure(self):
        """Test expenditure data structure"""
        response = requests.get(f"{BASE_URL}/api/expenditures")
        assert response.status_code == 200
        data = response.json()
        exp = data[0]
        required_fields = ["id", "country", "country_code", "year", "expenditure", "gdp_percent", "region"]
        for field in required_fields:
            assert field in exp, f"Missing field: {field}"
        print(f"✓ Expenditure structure verified: {exp['country']} - ${exp['expenditure']}B")
    
    def test_expenditure_filter_by_year(self):
        """Test filtering expenditures by year"""
        response = requests.get(f"{BASE_URL}/api/expenditures?year=2024")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            for exp in data:
                assert exp["year"] == 2024, "All records should be from 2024"
        print(f"✓ Year filter working: {len(data)} records for 2024")
    
    def test_expenditure_filter_by_region(self):
        """Test filtering expenditures by region"""
        response = requests.get(f"{BASE_URL}/api/expenditures?region=Europe")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            for exp in data:
                assert exp["region"] == "Europe", "All records should be from Europe"
        print(f"✓ Region filter working: {len(data)} European countries")


class TestProducts:
    """Product Portfolio API tests"""
    
    def test_get_all_products(self):
        """Test fetching all products"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Should have product data"
        print(f"✓ Got {len(data)} products")
    
    def test_product_data_structure(self):
        """Test product data structure"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        product = data[0]
        required_fields = ["id", "name", "manufacturer", "category", "product_type", "specifications", "materials", "status"]
        for field in required_fields:
            assert field in product, f"Missing field: {field}"
        print(f"✓ Product structure verified: {product['name']} by {product['manufacturer']}")
    
    def test_product_filter_by_category(self):
        """Test filtering products by category"""
        response = requests.get(f"{BASE_URL}/api/products?category=aircraft")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            for product in data:
                assert product["category"] == "aircraft", "All products should be aircraft"
        print(f"✓ Category filter working: {len(data)} aircraft products")
    
    def test_product_filter_by_manufacturer(self):
        """Test filtering products by manufacturer"""
        response = requests.get(f"{BASE_URL}/api/products?manufacturer=Lockheed%20Martin")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            for product in data:
                assert product["manufacturer"] == "Lockheed Martin"
        print(f"✓ Manufacturer filter working: {len(data)} Lockheed Martin products")
    
    def test_product_count_over_100(self):
        """Verify enriched product portfolio has 100+ products"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 100, f"Should have at least 100 products, got {len(data)}"
        print(f"✓ Product portfolio enriched: {len(data)} products (target: 102)")


class TestAnnouncements:
    """Announcements API tests"""
    
    def test_get_all_announcements(self):
        """Test fetching all announcements"""
        response = requests.get(f"{BASE_URL}/api/announcements")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Should have announcements"
        print(f"✓ Got {len(data)} announcements")
    
    def test_announcement_data_structure(self):
        """Test announcement data structure"""
        response = requests.get(f"{BASE_URL}/api/announcements")
        assert response.status_code == 200
        data = response.json()
        announcement = data[0]
        required_fields = ["id", "title", "content", "source", "category", "date"]
        for field in required_fields:
            assert field in announcement, f"Missing field: {field}"
        print(f"✓ Announcement structure verified: {announcement['title'][:50]}...")
    
    def test_announcement_filter_by_category(self):
        """Test filtering announcements by category"""
        response = requests.get(f"{BASE_URL}/api/announcements?category=contract")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            for ann in data:
                assert ann["category"] == "contract"
        print(f"✓ Category filter working: {len(data)} contract announcements")
    
    def test_announcement_limit(self):
        """Test announcement limit parameter"""
        response = requests.get(f"{BASE_URL}/api/announcements?limit=5")
        assert response.status_code == 200
        data = response.json()
        assert len(data) <= 5, "Should respect limit parameter"
        print(f"✓ Limit parameter working: returned {len(data)} announcements")


class TestMAActivities:
    """M&A Activities API tests"""
    
    def test_get_all_ma_activities(self):
        """Test fetching all M&A activities"""
        response = requests.get(f"{BASE_URL}/api/ma-activities")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Should have M&A activities"
        print(f"✓ Got {len(data)} M&A activities")
    
    def test_ma_data_structure(self):
        """Test M&A activity data structure"""
        response = requests.get(f"{BASE_URL}/api/ma-activities")
        assert response.status_code == 200
        data = response.json()
        activity = data[0]
        required_fields = ["id", "acquirer", "target", "deal_value", "status", "deal_type", "description", "announced_date"]
        for field in required_fields:
            assert field in activity, f"Missing field: {field}"
        print(f"✓ M&A structure verified: {activity['acquirer']} -> {activity['target']}")
    
    def test_ma_filter_by_status(self):
        """Test filtering M&A by status"""
        response = requests.get(f"{BASE_URL}/api/ma-activities?status=completed")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            for activity in data:
                assert activity["status"] == "completed"
        print(f"✓ Status filter working: {len(data)} completed deals")


class TestRegulations:
    """Regulations API tests"""
    
    def test_get_all_regulations(self):
        """Test fetching all regulations"""
        response = requests.get(f"{BASE_URL}/api/regulations")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Should have regulations"
        print(f"✓ Got {len(data)} regulations")
    
    def test_regulation_data_structure(self):
        """Test regulation data structure"""
        response = requests.get(f"{BASE_URL}/api/regulations")
        assert response.status_code == 200
        data = response.json()
        reg = data[0]
        required_fields = ["id", "title", "country", "category", "description", "requirements", "effective_date"]
        for field in required_fields:
            assert field in reg, f"Missing field: {field}"
        assert isinstance(reg["requirements"], list), "Requirements should be a list"
        print(f"✓ Regulation structure verified: {reg['title'][:50]}...")
    
    def test_regulation_filter_by_category(self):
        """Test filtering regulations by category"""
        response = requests.get(f"{BASE_URL}/api/regulations?category=export_control")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            for reg in data:
                assert reg["category"] == "export_control"
        print(f"✓ Category filter working: {len(data)} export control regulations")
    
    def test_regulation_filter_by_country(self):
        """Test filtering regulations by country"""
        response = requests.get(f"{BASE_URL}/api/regulations?country=USA")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            for reg in data:
                assert reg["country"] == "USA"
        print(f"✓ Country filter working: {len(data)} USA regulations")


class TestAuthentication:
    """Authentication API tests"""
    
    def test_register_user(self):
        """Test user registration"""
        import uuid
        test_email = f"test_{uuid.uuid4().hex[:8]}@test.com"
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": test_email,
            "password": "testpass123",
            "name": "Test User"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == test_email
        print(f"✓ User registration working: {test_email}")
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "nonexistent@test.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✓ Invalid credentials correctly rejected")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
