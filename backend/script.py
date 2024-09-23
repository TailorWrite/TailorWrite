import requests
from bs4 import BeautifulSoup

def scrape_job_description(url, output_file):
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the page content with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Try a more generic CSS selector for the job title
        job_title_advert = soup.find('h1') 
        job_title = job_title_advert.get_text(strip=True) if job_title_advert else "No job title found"

        # Try a more generic CSS selector for the job description
        job_description = soup.find('section')
        
        if job_description:
            # Extract text and save to a file
            with open(output_file, 'w', encoding='utf-8') as file:
                file.write(f"Job Title: {job_title}\n\n")
                file.write(job_description.get_text(strip=True))
            print(f"Job description saved to {output_file}")
        else:
            print("Job description not found.")
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")

# URL and output file
url = 'https://www.seek.co.nz/job/78985106?ref=search-standalone&type=standout&origin=jobTitle#sol=7b8c825fd025bb5c27d94ef0d6134f51643b8b0c'
output_file = 'job_description.txt'

# Call the function
scrape_job_description(url, output_file)

