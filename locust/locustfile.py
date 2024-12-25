from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 2)  # Shorter wait time for more intensive testing

    def on_start(self):
        """Initial setup - visit signin page"""
        self.client.get("/signin")

  