import requests
from bs4 import BeautifulSoup

def scrape_job_description(url, output_file):
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the page content with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Store the job title
        job_title_advert = soup.select_one("#app > div > div:nth-child(8) > div > div > div._1vpsrtt0._1ix67su82.o143of18.o143of1b._1ix67su32._1ix67su35 > div._1vpsrtt0.h7xm3i0.h7xm3i7 > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(1) > h1")
        job_title = job_title_advert.get_text(strip=True) if job_title_advert else "No job title found"

        # Store all the job description
        job_description = soup.select_one("#app > div > div:nth-child(8) > div > div > div._1vpsrtt0._1ix67su82.o143of18.o143of1b._1ix67su32._1ix67su35 > div._1vpsrtt0.h7xm3i0.h7xm3i7 > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(1) > section > div")
        
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
url = 'https://www.seek.co.nz/job/78932186?ref=recom-homepage#sol=328e33ea55344a7d564fce55a6e5b83644385fde'  # Replace with the actual URL
output_file = 'job_description.txt'

# Call the function
scrape_job_description(url, output_file)
