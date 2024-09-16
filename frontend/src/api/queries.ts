import { ApplicationData } from "../types";

export async function fetchApplicationData(uuid: string): Promise<ApplicationData> {
    return  {
        id: uuid,
        img: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
        job_title: "Software Engineering Director",
        company_name: "Google",
        description: "As the Software Engineering Director for Cloud Observability in Hyderabad, you'll be the foundation of our team in India, responsible for hiring the team and developing them into a high-performing engineering organization. You'll oversee the migration of existing Application Monitoring projects (Cloud Error Reporting, Uptime Monitoring, and Cloud Profiler) to the team in Hyderabad, ensuring continuity for our customers and stakeholders. You'll also ramp up a new effort to improve the usability and integration of third-party observability tools with Google Cloud and Gemini Cloud Assist, our intelligent assistant that helps Google Cloud Platform (GCP) customers operate and troubleshoot their production services.",
        status: "Applied",
        application_date: "2024/08/27",
        application_url: "https://www.google.com/about/careers/applications/jobs/results/99640647849255622-software-engineering-director-cloud-observability?q=Engineering#!t=jo&jid=127025001&",
        notes: "these are the notes"
    }
}