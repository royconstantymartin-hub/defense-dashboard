import requests
import sys
import json
from datetime import datetime

class DefenseDashboardAPITester:
    def __init__(self, base_url="https://weapontech-analytics.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        
    def log_result(self, test_name, passed, response_code=None, error_msg=None):
        """Log test results"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"✅ {test_name} - PASSED (Status: {response_code})")
        else:
            self.failed_tests.append({
                "test": test_name,
                "error": error_msg or f"HTTP {response_code}",
                "status_code": response_code
            })
            print(f"❌ {test_name} - FAILED ({error_msg or f'Status: {response_code}'})")
    
    def test_api_endpoint(self, method, endpoint, expected_status, data=None, headers=None, test_name=None):
        """Generic API test method"""
        url = f"{self.api_url}{endpoint}"
        test_name = test_name or f"{method} {endpoint}"
        
        if not headers:
            headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            
            passed = response.status_code == expected_status
            self.log_result(test_name, passed, response.status_code)
            
            return passed, response.json() if passed and response.content else {}
            
        except requests.exceptions.RequestException as e:
            self.log_result(test_name, False, error_msg=str(e))
            return False, {}
        except json.JSONDecodeError:
            self.log_result(test_name, False, error_msg="Invalid JSON response")
            return False, {}

    def test_health_check(self):
        """Test basic API connectivity"""
        print("\n🔍 Testing API Health Check...")
        return self.test_api_endpoint('GET', '/', 200, test_name="API Health Check")

    def test_seed_data(self):
        """Test data seeding endpoint"""
        print("\n🔍 Testing Data Seeding...")
        return self.test_api_endpoint('POST', '/seed-data', 200, test_name="Seed Data")

    def test_authentication(self):
        """Test user registration and authentication"""
        print("\n🔍 Testing Authentication...")
        
        # Test user registration
        timestamp = datetime.now().strftime('%H%M%S')
        test_user = {
            "email": f"test_user_{timestamp}@example.com",
            "password": "TestPass123!",
            "name": "Test User"
        }
        
        success, response = self.test_api_endpoint(
            'POST', '/auth/register', 200, 
            data=test_user,
            test_name="User Registration"
        )
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            
            # Test login with same credentials
            login_data = {
                "email": test_user["email"],
                "password": test_user["password"]
            }
            
            self.test_api_endpoint(
                'POST', '/auth/login', 200,
                data=login_data,
                test_name="User Login"
            )
            
            # Test get current user
            self.test_api_endpoint(
                'GET', '/auth/me', 200,
                test_name="Get Current User"
            )
            
            return True
        return False

    def test_dashboard_stats(self):
        """Test dashboard statistics endpoint"""
        print("\n🔍 Testing Dashboard Stats...")
        return self.test_api_endpoint('GET', '/dashboard/stats', 200, test_name="Dashboard Stats")

    def test_announcements_crud(self):
        """Test announcements CRUD operations"""
        print("\n🔍 Testing Announcements CRUD...")
        
        # GET announcements
        success, announcements = self.test_api_endpoint('GET', '/announcements', 200, test_name="Get Announcements")
        
        if not self.token:
            print("⚠️ Skipping Announcements CRUD (no auth token)")
            return False
            
        # CREATE announcement
        new_announcement = {
            "title": "Test Announcement",
            "content": "This is a test announcement for API testing",
            "source": "API Test",
            "category": "contract",
            "company": "Test Company"
        }
        
        success, created = self.test_api_endpoint(
            'POST', '/announcements', 200,
            data=new_announcement,
            test_name="Create Announcement"
        )
        
        if success and 'id' in created:
            # DELETE announcement
            self.test_api_endpoint(
                'DELETE', f'/announcements/{created["id"]}', 200,
                test_name="Delete Announcement"
            )
            return True
        return False

    def test_ma_activities_crud(self):
        """Test M&A activities CRUD operations"""
        print("\n🔍 Testing M&A Activities CRUD...")
        
        # GET M&A activities
        self.test_api_endpoint('GET', '/ma-activities', 200, test_name="Get M&A Activities")
        
        if not self.token:
            print("⚠️ Skipping M&A CRUD (no auth token)")
            return False
            
        # CREATE M&A activity
        new_ma = {
            "acquirer": "Test Acquirer Corp",
            "target": "Test Target Inc",
            "deal_value": 500.0,
            "status": "announced",
            "deal_type": "acquisition",
            "description": "Test acquisition for API validation"
        }
        
        success, created = self.test_api_endpoint(
            'POST', '/ma-activities', 200,
            data=new_ma,
            test_name="Create M&A Activity"
        )
        
        if success and 'id' in created:
            # DELETE M&A activity
            self.test_api_endpoint(
                'DELETE', f'/ma-activities/{created["id"]}', 200,
                test_name="Delete M&A Activity"
            )
            return True
        return False

    def test_defense_players_crud(self):
        """Test defense players CRUD operations"""
        print("\n🔍 Testing Defense Players CRUD...")
        
        # GET defense players
        self.test_api_endpoint('GET', '/defense-players', 200, test_name="Get Defense Players")
        
        if not self.token:
            print("⚠️ Skipping Defense Players CRUD (no auth token)")
            return False
            
        # CREATE defense player
        new_player = {
            "name": "Test Defense Corp",
            "ticker": "TDC",
            "country": "USA",
            "market_cap": 10.5,
            "stock_price": 150.25,
            "change_percent": 2.1,
            "revenue": 8.3,
            "employees": 25000,
            "specializations": ["Test Systems", "API Testing"]
        }
        
        success, created = self.test_api_endpoint(
            'POST', '/defense-players', 200,
            data=new_player,
            test_name="Create Defense Player"
        )
        
        if success and 'id' in created:
            # UPDATE defense player
            updated_player = new_player.copy()
            updated_player['market_cap'] = 11.0
            
            self.test_api_endpoint(
                'PUT', f'/defense-players/{created["id"]}', 200,
                data=updated_player,
                test_name="Update Defense Player"
            )
            
            # DELETE defense player
            self.test_api_endpoint(
                'DELETE', f'/defense-players/{created["id"]}', 200,
                test_name="Delete Defense Player"
            )
            return True
        return False

    def test_expenditures_crud(self):
        """Test expenditures CRUD operations"""
        print("\n🔍 Testing Expenditures CRUD...")
        
        # GET expenditures
        self.test_api_endpoint('GET', '/expenditures', 200, test_name="Get Expenditures")
        
        if not self.token:
            print("⚠️ Skipping Expenditures CRUD (no auth token)")
            return False
            
        # CREATE expenditure
        new_expenditure = {
            "country": "Test Country",
            "country_code": "TC",
            "year": 2024,
            "expenditure": 50.0,
            "gdp_percent": 2.5,
            "region": "Test Region"
        }
        
        success, created = self.test_api_endpoint(
            'POST', '/expenditures', 200,
            data=new_expenditure,
            test_name="Create Expenditure"
        )
        
        if success and 'id' in created:
            # DELETE expenditure
            self.test_api_endpoint(
                'DELETE', f'/expenditures/{created["id"]}', 200,
                test_name="Delete Expenditure"
            )
            return True
        return False

    def test_regulations_crud(self):
        """Test regulations CRUD operations"""
        print("\n🔍 Testing Regulations CRUD...")
        
        # GET regulations
        self.test_api_endpoint('GET', '/regulations', 200, test_name="Get Regulations")
        
        if not self.token:
            print("⚠️ Skipping Regulations CRUD (no auth token)")
            return False
            
        # CREATE regulation
        new_regulation = {
            "title": "Test Regulation Act",
            "country": "Test Country",
            "category": "export_control",
            "description": "This is a test regulation for API validation purposes.",
            "requirements": ["Test requirement 1", "Test requirement 2"],
            "effective_date": "2024-01-01"
        }
        
        success, created = self.test_api_endpoint(
            'POST', '/regulations', 200,
            data=new_regulation,
            test_name="Create Regulation"
        )
        
        if success and 'id' in created:
            # DELETE regulation
            self.test_api_endpoint(
                'DELETE', f'/regulations/{created["id"]}', 200,
                test_name="Delete Regulation"
            )
            return True
        return False

    def test_products_crud(self):
        """Test products CRUD operations"""
        print("\n🔍 Testing Products CRUD...")
        
        # GET products
        self.test_api_endpoint('GET', '/products', 200, test_name="Get Products")
        
        if not self.token:
            print("⚠️ Skipping Products CRUD (no auth token)")
            return False
            
        # CREATE product
        new_product = {
            "name": "Test Fighter X-1",
            "manufacturer": "Test Defense Systems",
            "category": "aircraft",
            "product_type": "fighter",
            "specifications": {
                "max_speed": "Mach 2.0",
                "range": "3000 km",
                "ceiling": "60000 ft"
            },
            "materials": ["Test Composite", "Test Alloy"],
            "status": "active",
            "image_url": None
        }
        
        success, created = self.test_api_endpoint(
            'POST', '/products', 200,
            data=new_product,
            test_name="Create Product"
        )
        
        if success and 'id' in created:
            # UPDATE product
            updated_product = new_product.copy()
            updated_product['status'] = 'development'
            
            self.test_api_endpoint(
                'PUT', f'/products/{created["id"]}', 200,
                data=updated_product,
                test_name="Update Product"
            )
            
            # DELETE product
            self.test_api_endpoint(
                'DELETE', f'/products/{created["id"]}', 200,
                test_name="Delete Product"
            )
            return True
        return False

    def test_filter_operations(self):
        """Test API filtering capabilities"""
        print("\n🔍 Testing API Filters...")
        
        # Test announcements filter by category
        self.test_api_endpoint('GET', '/announcements?category=contract', 200, test_name="Filter Announcements by Category")
        
        # Test M&A activities filter by status
        self.test_api_endpoint('GET', '/ma-activities?status=completed', 200, test_name="Filter M&A by Status")
        
        # Test defense players filter by country
        self.test_api_endpoint('GET', '/defense-players?country=USA', 200, test_name="Filter Defense Players by Country")
        
        # Test expenditures filter by year and region
        self.test_api_endpoint('GET', '/expenditures?year=2024', 200, test_name="Filter Expenditures by Year")
        self.test_api_endpoint('GET', '/expenditures?region=North%20America', 200, test_name="Filter Expenditures by Region")
        
        # Test regulations filter by category and country
        self.test_api_endpoint('GET', '/regulations?category=export_control', 200, test_name="Filter Regulations by Category")
        self.test_api_endpoint('GET', '/regulations?country=USA', 200, test_name="Filter Regulations by Country")
        
        # Test products filter by category and manufacturer
        self.test_api_endpoint('GET', '/products?category=aircraft', 200, test_name="Filter Products by Category")
        self.test_api_endpoint('GET', '/products?manufacturer=Lockheed%20Martin', 200, test_name="Filter Products by Manufacturer")

    def run_all_tests(self):
        """Run complete test suite"""
        print("🚀 Starting Defense Dashboard API Test Suite")
        print(f"📡 Testing API at: {self.api_url}")
        print("=" * 60)
        
        # Core connectivity tests
        self.test_health_check()
        self.test_seed_data()
        
        # Authentication tests
        auth_success = self.test_authentication()
        
        # Data access tests
        self.test_dashboard_stats()
        
        # CRUD operation tests
        self.test_announcements_crud()
        self.test_ma_activities_crud()
        self.test_defense_players_crud()
        self.test_expenditures_crud()
        self.test_regulations_crud()
        self.test_products_crud()
        
        # Filter tests
        self.test_filter_operations()
        
        # Print final results
        print("\n" + "=" * 60)
        print(f"📊 TEST SUMMARY")
        print(f"✅ Passed: {self.tests_passed}/{self.tests_run}")
        print(f"❌ Failed: {len(self.failed_tests)}/{self.tests_run}")
        print(f"📈 Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.failed_tests:
            print("\n💥 FAILED TESTS:")
            for failure in self.failed_tests:
                print(f"   • {failure['test']}: {failure['error']}")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test execution"""
    tester = DefenseDashboardAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())