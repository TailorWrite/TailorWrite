# Run `pip install -r requirements.txt -t . --upgrade` to install the required packages.

import json
import requests
from bs4 import BeautifulSoup

def lambda_handler(event, context):
    url = event.get('url', 'https://example.com')

    # Check if the URL is not an seek.co.nz/jobs URL
    if 'seek.co.nz/job' not in url:
        return {
            'statusCode': 400,
            'body': 'Invalid URL. Please provide a valid seek.co.nz/job URL'
        }
    
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the page content with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract the job title
        job_title_advert = soup.find('h1')
        job_title = job_title_advert.get_text(strip=True) if job_title_advert else "No job title found"

        # Extract the job description
        job_description_section = soup.find('section')
        job_description = job_description_section.get_text(strip=True) if job_description_section else "No job description found"

        # Extract the company name via the element with data-automation="advertiser-name"
        company_name = soup.find('span', {'data-automation': 'advertiser-name'}).get_text(strip=True)

        payload = {
            "job_title": job_title,
            "company_name": company_name,
            "job_description": job_description
        }
        
        # Return the data as a JSON object
        return {
            'statusCode': 200,
            'body': json.dumps(payload)
        }
    
    else:
        # Handle the error when the page couldn't be retrieved
        return {
            'statusCode': response.status_code,
            'body': f"Failed to retrieve the page. Status code: {response.status_code}"
        }
    

if __name__ == '__main__':
    event = {
        'url': "https://www.seek.co.nz/job/79067731?ref=search-standalone&type=promoted&origin=jobTitle#sol=afb5cbfcff9a8d06c58551e98ff7278e985577af"
    }

    response = lambda_handler(event, None)
    print(response)