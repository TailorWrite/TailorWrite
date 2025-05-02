import React from 'react';
import BasicChip, { Color } from '../components/common/BasicChip';
import { Typography } from '@material-tailwind/react';
import { ApplicationData, ApplicationStatus, suppressMissingAttributes } from '../types';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { formatDate, getCompanyLogoUrl } from '../utils';
import CompanyLogo from '../components/common/CompanyLogo';

const DashboardHome: React.FC = () => {

    const data = {
        applications: {
            total: 15,
            applied: 12,
            interviews: 2,
            offers: 1,
            interested: 1
        },
        applicationsLastMonth: {
            total: 5,
            applied: 4,
            interviews: 1,
            offers: 0,
            interested: 1
        }
    }; 
    

    return (
        <div className="relative pb-4 h-full flex ">

            <div className="px-4 grid grid-cols-4 grid-rows-5 gap-4 flex-grow dark:text-white">
                <div className="flex flex-col gap-4 border shadow-sm rounded-xl md:p-5 dark:bg-neutral-900 dark:border-neutral-700 p-4 overflow-hidden">
                    <div className="flex flex-row items-center gap-2 text-gray-800 dark:text-neutral-500">
                        <h3 className=" capitalize">
                            Total Applications This Month
                        </h3>
                    </div>

                    <div className="flex flex-row justify-between items-end gap-2 text-gray-800 dark:text-neutral-500">
                        <div className="flex flex-row items-end gap-2 text-gray-800 dark:text-neutral-500">
                            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 inline-block text-transparent bg-clip-text">{data.applications.total}</span>
                            <p className="text-sm font-thin  text-gray-800 dark:text-neutral-500">Submitted</p>
                        </div>

                        <div>
                            <BasicChip
                                className=""
                                color="green"
                                value={
                                    <div className="flex flex-row items-center gap-1">
                                        {data.applications.applied > data.applicationsLastMonth.applied ? (
                                            <svg className="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                                <polyline points="16 7 22 7 22 13" />
                                            </svg>
                                        ) : (
                                            <svg className="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                                                <polyline points="16 17 22 17 22 11" />
                                            </svg>
                                        )}
                                        <span className="inline-block text-sm">
                                            {data.applications.applied} <span className="text-xs font-thin ">({data.applicationsLastMonth.applied})</span>
                                        </span>
                                    </div>
                                }
                            />
                        </div>
                        
                    </div>
                </div>
                <div className="flex flex-col gap-6 border shadow-sm rounded-xl md:p-5 dark:bg-neutral-900 dark:border-neutral-700 p-4 overflow-hidden">
                        <div className="flex flex-row items-center gap-2 text-gray-800 dark:text-neutral-500">
                            <h3 className=" capitalize">
                                Total Offers This Month
                            </h3>
                        </div>

                        <div className="flex flex-row justify-between items-end gap-2 text-gray-800 dark:text-neutral-500">
                            <div className="flex flex-row items-end gap-2 text-gray-800 dark:text-neutral-500">
                                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 inline-block text-transparent bg-clip-text">{data.applications.offers}</span>
                                <p className="text-sm font-thin  text-gray-800 dark:text-neutral-500">{data.applications.offers > 1 ? "Offers" : "Offer"}</p>
                            </div>

                            <div>
                                <BasicChip
                                    className=""
                                    color="green"
                                    value={
                                        <div className="flex flex-row items-center gap-1">
                                            {data.applications.offers > data.applicationsLastMonth.offers ? (
                                                <svg className="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                                    <polyline points="16 7 22 7 22 13" />
                                                </svg>
                                            ) : (
                                                <svg className="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                                                    <polyline points="16 17 22 17 22 11" />
                                                </svg>
                                            )}
                                            <span className="inline-block text-sm">
                                                {data.applications.offers} <span className="text-xs font-thin ">({data.applicationsLastMonth.offers})</span>
                                            </span>
                                        </div>
                                    }
                                />
                            </div>

                        </div>
                </div>
                <div className="col-start-1 row-start-2 border shadow-sm rounded-xl md:p-5 dark:bg-neutral-900 dark:border-neutral-700 p-4 overflow-hidden">3</div>
                <div className="col-start-2 row-start-2 border shadow-sm rounded-xl md:p-5 dark:bg-neutral-900 dark:border-neutral-700 p-4 overflow-hidden">4</div>
                <div className="col-span-2 row-span-2 col-start-3 row-start-1 border shadow-sm rounded-xl md:p-5 dark:bg-neutral-900 dark:border-neutral-700 p-4 overflow-hidden">5</div>
                <div className="col-span-3 row-span-3 row-start-3 border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 overflow-hidden">
                    <InterestedApplications />
                </div>
                <div className="row-span-3 col-start-4 row-start-3 border shadow-sm rounded-xl md:p-5 dark:bg-neutral-900 dark:border-neutral-700 p-4 overflow-hidden">7</div>
            </div>
        </div>
    );
};

export default DashboardHome;

const InterestedApplications = () => {
    const TABLE_HEAD = ["Company", "Role", "Status", "Date"];
    
    const STATUS_MAP: Record<ApplicationStatus, Color> = {
        Applied: "blue",
        Interview: "yellow",
        Rejected: "red",
        Offer: "green",
        Interested: "gray",
    };

    const navigate = useNavigate();
    const loaderData = useLoaderData();

    const allApplications: ApplicationData[] = loaderData as ApplicationData[] ?? [];
    // const interestedApplications: ApplicationData[] = [
    //     {
    //         "application_date": "2025-04-22T12:00:00+00:00",
    //         "application_url": "https://www.seek.co.nz/job/83703286?savedSearchID=ee9bbe0b-fa69-433c-81e8-061da1ad2f15&tracking=JMC-SavedSearch-anz-2",
    //         "company_name": "BNZ",
    //         "created_at": "2025-04-23T06:15:09.568225+00:00",
    //         "description": "Ko m\u0101tou t\u0113nei | This is Us \n\n\nAre you starting a career in technology? Keen to build your career in one of the best Tech shops in New Zealand?  We have an exciting opportunity that we\u2019d love you to check out!\n\nBNZ Technology is a 1200+ strong team who build, run and support BNZers to serve our colleagues and customers brilliantly, and create world class digital experiences.\n\nM\u014d te H\u014dtaka | About the Programme\n\n\nOur Technology Graduate Programme runs from July - May and is designed to give you a well-rounded learning experience to develop your technical skills and understanding of how a large tech shop works. You\u2019ll get a taste of the variety of technologies, teams, and roles available at BNZ. We\u2019ll support you to focus on your personal development and help you navigate the exciting task of starting your technology career.\n\nAlongside your placement you\u2019ll be part of our Grad cohort with regular technical and personal learning & development sessions, plus a great social culture with your Graduate colleagues and team mates. Ideally you will be based in Wellington or Auckland.\n\nWhat happens at the end of the Technology Graduate Programme?\n\n\nAt the end of your Graduate year, we will chat with you and the teams to determine which team is the best fit, and help you transition into a team as a Junior. Don\u2019t worry, you\u2019re a permanent employee from day 1 so you\u2019re guaranteed a job with us, this will be your first promotion!\n\nWhat training is available?\n\n\nDuring the year we provide heaps of training! You will get support from your team, you\u2019ll get coaching from your leader throughout the year, plus a range of workshops (some technical and other more general subjects we know you\u2019ll benefit from \u2013 like some behind the scenes about how a bank works, and how to build your financial capability).  \n\nWhat are the different pathways?\n\n\nWe\u2019ll share full details of the pathways available during your recruitment process. Due to our size and scope there are opportunities galore, from the front-end teams who build our multi award-winning mobile app, to our core platform teams!\n\n\u014cu P\u016bkenga | About You \n\n\nWe are keen to hear from people with all types of backgrounds and experience, whether you are about to graduate with software engineering, or if you\u2019re self-taught while juggling another job. Tell us what attracts you to tech, what you have done to learn, what problems interest you, and why you have stuck with it.\n\nOur biggest priority is finding people with an awesome attitude. You aren\u2019t expected to know everything when you join, but you will need to apply yourself to understand our environment and technologies, and there\u2019s a lot to learn!\n\nSuccessful candidates will demonstrate: \n\nAn analytical approach to their work and a love for exploring problems to come up with great solutions - challenging the status quo to improve systems (asking \u201cwhy do we do things like this?\u201d). \nA genuine passion for technology and how it can help our customers. \nExcellent collaboration skills and the ability to relate well to others. \nResilience and willingness to roll up your sleeves and get stuck in. \n\nYou must also be: \n\nA NZ/ AUS resident or citizen \nAvailable to attend our Assessment Centre in Wellington and Auckland during the week commencing 19th May \u2013 exact date TBC \nAvailable to start a full-time role in July 2025. \n\nBNZ Hei W\u0101hi Mahi | Working culture at BNZ \n\n\nBNZ has an inclusive and supportive culture. Our people are passionate about tech and supportive of each other, even when we make mistakes (we own it and learn from them).\n\nWhat are some of the benefits at BNZ?\n\n\n\u2022 Good pay! We'll pay you right from the outset and as your skills grow, we\u2019ll make regular changes to make sure you're paid competitively.\n\u2022 6 weeks annual leave!\n\u2022 6000+ classroom and online courses, including platforms like Udemy\n\u2022 Flexible working hours and a mix of working from home & in the office\n\u2022 Staff banking & insurance discounts\n\nNau Mai ki te P\u0113ke o Aotearoa | Come to the Bank of New Zealand \n\n\nIf you're ready to join a supportive team of BNZers who are passionate about the work they do and the results they achieve, then apply now and let's create great together. \n\nPlease take note of the following important dates:\n\nApplications close: 11:55pm, Sunday 4th May 2025\nVideo Questions: from 14th May 2025\nAssessment Centres:  Week commencing 19th May 2025 \u2013 exact date TBC\nStart Date: 1 July 2025\n\nWe are excited to check out your application and can\u2019t wait to welcome an awesome group of Grads into our programme!",
    //         "id": 11,
    //         "job_title": "Technology Graduate Programme",
    //         "notes": "Submitted - May 1, 2025",
    //         "status": "Applied",
    //         "updated_at": "2025-05-01T06:38:42+00:00",
    //         "user_id": "0632b030-1a5a-4cfb-aab8-e2cdff33ddc5"
    //     },
    //     {
    //         "application_date": "2025-04-30T12:00:00+00:00",
    //         "application_url": "https://www.linkedin.com/jobs/view/4219079640",
    //         "company_name": "Datacom",
    //         "created_at": "2025-05-01T05:39:51.375512+00:00",
    //         "description": "Datacom works with organisations and communities across Australia and New Zealand to make a difference in people's lives and help organisations use the power of tech to innovate and grow.\n\nAbout The Role (your Why)\n\nAs an AI Developer at Datacom, you will be responsible for creating and enhancing powerful AI-driven tools that empower our business and customers. This role involves developing scalable solutions that leverage cutting-edge AI technologies, with a strong focus on improving efficiency, automation, and overall business operations.\n\nYou will work closely with cross-functional teams to identify opportunities for AI integration, build intuitive user-facing tools, and drive the adoption of AI capabilities throughout the business. Additionally, you'll be a key advocate for AI solutions, helping internal teams and customers understand, embrace, and implement AI-powered processes that deliver significant value.\n\nYour work will be instrumental in transforming business practices, supporting customer success, and leading the charge in innovative AI adoption.\n\nWhat you'll do:\n\nDesign, build, and deploy scalable AI solutions that improve operational efficiency and automation for internal teams and customers\nCollaborate with cross-functional teams to identify opportunities where AI can deliver measurable business value\nDevelop intuitive, user-facing tools and APIs that make AI capabilities accessible and easy to use\nStay across the latest AI trends, models, and tools, and bring innovative ideas into solution design\nAdvocate for the adoption of AI across Datacom by presenting solutions, conducting workshops, and producing clear documentation\nSupport the end-to-end AI project lifecycle, from ideation and prototyping through to production deployment and monitoring\nContribute to establishing best practices, frameworks, and reusable components for AI development at Datacom\nWork closely with customers to understand their needs and tailor AI solutions that solve real-world business challenges\nHelp shape Datacom's AI strategy by participating in internal communities of practice and external thought leadership initiatives\nEnsure solutions meet security, ethical, and compliance standards for responsible AI use\n\n\nWhat You'll Bring\n\nPython expertise: Strong skills in building LLM applications, integrating APIs, and deploying machine learning models\nFrontend development with React: Ability to create intuitive, interactive UIs that showcase AI-driven capabilities\nApplied AI knowledge: Hands-on experience working with foundational models, vector databases, retrieval-augmented generation (RAG), basic fine-tuning, and prompt chaining techniques\n\n\nExperience:\n\nProven track record of delivering AI-powered features and systems - not just experimenting, but building solutions that are used in production\nStrong understanding of the engineering challenges involved in deploying AI at scale, including managing latency, handling token limits, and monitoring model performance (e.g., hallucinations)\nIdeally experienced with Machine Learning Operations (MLOps), evaluation pipelines, and integrating AI capabilities into broader product development workflows\nFamiliarity with industry-standard tools and frameworks such as LangChain, AutoGPT, local models, and other leading open-source AI projects\n\n\nWhy join us here at Datacom?\n\nDatacom is one of Australia and New Zealand's largest suppliers of Information Technology professional services. We have managed to maintain a dynamic, agile, small business feel that is often diluted in larger organisations of our size. It's our people that give Datacom its unique culture and energy that you can feel from the moment you meet with us.\n\nWe care about our people and provide a range of perks such as social events, chill-out spaces, remote working, flexi-hours and professional development courses to name a few. You'll have the opportunity to learn, develop your career, connect and bring your true self to work. You will be recognised and valued for your contributions and be able to do your work in a collegial, flat-structured environment.\n\nWe operate at the forefront of technology to help Australia and New Zealand's largest enterprise organisations explore possibilities and solve their greatest challenges, so you will never run out of interesting new challenges and opportunities.\n\nWe want Datacom to be an inclusive and welcoming workplace for everyone and take pride in the steps we have taken and continue to take to make our environment fun and friendly, and our people feel supported.",
    //         "id": 13,
    //         "job_title": "AI Developer",
    //         "notes": "",
    //         "status": "Applied",
    //         "updated_at": "2025-05-01T05:39:51.375512+00:00",
    //         "user_id": "0632b030-1a5a-4cfb-aab8-e2cdff33ddc5"
    //     },
    //     {
    //         "application_date": "2025-04-09T12:00:00+00:00",
    //         "application_url": "https://www.seek.co.nz/job/83191980",
    //         "company_name": "Magritek Limited",
    //         "created_at": "2025-04-23T06:17:27.756635+00:00",
    //         "description": "About the role\n\nMagritek is seeking a software developer who can support the quality of the software developed by our software team. The role is based in our Wellington office and involves developing and writing Windows desktop software applications for our Spinsolve products.\n\nThe job involves:\n\nMVVM experience and core understanding of software architecture design patterns.\nPrimary development skills C# / XAML.\nDatabase management experience to access and modify information in an SQL database.\nExtending XML schemas and supported programming.\nSoftware maintenance, bug fixing and refactoring.\nParticipation in team meetings and code reviews with the software development team.\n \n\nThe successful candidate will be:\n\nA .NET developer with experience in desktop application development for businesses using MVVM (C# / XAML) to implement solutions that manage the interaction between data and user interface.\nExcels in working collaboratively and constructively as part of a small, but vibrant software development team.\nStrong problem-solving and fluent English language skills.\nMust have NZ residency or a valid NZ work visa.\nExperience working and interacting with SQL databases.\nExperience with Git.\n \n\nRequired Software Development Skills\n\nLanguages: C#, XAML, SQL, XML\nTools: Visual Studio, Git\nDesirable additional knowledge: GitLab, C++, ANTLR, HTML, MadCap Flare, MediaWiki, design/ drawing skills using vector graphics.\n \n\nAbout Magritek\n\nMagritek designs and manufactures innovative scientific instruments in the field of Nuclear Magnetic Resonance (NMR) and is the global leader in the Benchtop NMR Spectrometer market. Magritek has operations in Europe, North America and Asia/Pacific with markets in Analytical Instruments, Fine Chemicals, Pharma, Foods, and Academic Research & Education.",
    //         "id": 12,
    //         "job_title": "Software Developer",
    //         "notes": "",
    //         "status": "Applied",
    //         "updated_at": "2025-04-23T06:17:39+00:00",
    //         "user_id": "0632b030-1a5a-4cfb-aab8-e2cdff33ddc5"
    //     },
    //     {
    //         "application_date": "2025-04-12T12:00:00+00:00",
    //         "application_url": "https://www.linkedin.com/posts/spotyaa_softwaredevelopment-internship-techjobs-activity-7316930751185264640-7HtD?utm_source=share&utm_medium=member_desktop&rcm=ACoAADsTzncBwQpYjNGVoq1jH_Y3Xq0ewqr5LaM",
    //         "company_name": "Spotyaa",
    //         "created_at": "2025-04-13T04:07:09.915436+00:00",
    //         "description": "\ud83d\ude80 Exciting Internship Opportunity in Software Development (Frontend & Backend) - Wellington, NZ \ud83d\ude80\n\nAre you a passionate software developer looking to gain hands-on experience in both frontend and backend development for web and mobile applications? We\u2019re hiring 2-4 motivated interns to join our dynamic team in Wellington, New Zealand for a 3-month internship!\n\nAbout the Role:\n\ud83d\udc49 Work alongside current interns under the leadership of our newly appointed Software Engineer at SPOTYAA.\n\ud83d\udc49 Our lead brings an amazing scope of work, quick responsiveness, sharp attention to detail, and proven leadership & mentoring skills\u2014making him an invaluable asset to our team. We\u2019re extremely lucky to have him drive clean, efficient tech learning and development!\n\ud83d\udc49 Contribute to real-world projects being brought to New Zealand, with a structured timeline and task tracking.\n\ud83d\udc49 Develop skills in full-stack development (frontend & backend) for apps and web platforms.\n\ud83d\udc49Adhere to project deadlines in a fast-paced, results-driven environment.\n\nWhat We\u2019re Looking For:\n\n\u2705 Strong foundation in software development (web/mobile).\n\u2705Familiarity with frontend (e.g., React/Native, Swift) & backend (e.g. Java, SQL, .NET) technologies.\n\u2705Ability to work within a structured timeline and meet project milestones.\n\u2705Proactive, eager to learn, and ready to onboard quickly.\n\nWhy Join?\n\ud83d\udc49 Gain real industry experience on live projects under expert mentorship.\n\ud83d\udc49Work in a collaborative, high-performing team with a leader who fosters growth.\n\ud83d\udc49Opportunity to enhance your portfolio while mastering clean, efficient coding practices.\n\n\ud83d\ude4c Not an Intern? No Problem!\nIf you're not currently enrolled as an intern but want to boost your CV and gain valuable experience in the field, we'd still love to hear from you! Please mention this in your CV and email when applying.\n\n\u23f3 Applications are open NOW \u2013 we\u2019re looking to onboard ASAP!\n\ud83d\udce9 Send your CV & portfolio to: admin@spotyaa.com (Applications via email only)\n\ud83d\udccd Location: Wellington, NZ | Duration: 3 months",
    //         "id": 9,
    //         "job_title": "Software Development Internship",
    //         "notes": "\ud83d\udccd Location: Wellington, NZ | Duration: 3 months",
    //         "status": "Rejected",
    //         "updated_at": "2025-04-23T02:06:01+00:00",
    //         "user_id": "0632b030-1a5a-4cfb-aab8-e2cdff33ddc5"
    //     },
    //     {
    //         "application_date": "2025-04-15T12:00:00+00:00",
    //         "application_url": "https://www.linkedin.com/jobs/view/4208473883/",
    //         "company_name": "Starboard Maritime Intelligence",
    //         "created_at": "2025-04-15T22:05:28.710805+00:00",
    //         "description": "Build software that defends the frontlines of the global ocean.\n\nAt Starboard, we develop mission-critical systems that protect maritime borders, infrastructure, and national interests. Our platform fuses multi-source data into real-time geospatial intelligence \u2014 trusted by defence, intelligence, and commercial operators around the world.\n\nFrom intercepting illicit vessels to safeguarding submarine cables, our software powers decision-making where failure isn\u2019t an option.\n\nWe\u2019re a rapidly scaling global team headquartered in Wellington, deploying modern, high-performance software to solve hard, real-world problems. As part of high-performance engineering team who care deeply about quality, ownership, and pace, you\u2019ll ship production code that drives mission outcomes.\nOur stack includes Go, Python, React, Postgres, Kubernetes, GCP, and Terraform.\n\nIf you\u2019re a mission-driven engineer ready to make an impact at the edge of national security and innovation, reach out. Email work@starboard.nz with your cover letter and CV.\n\nWe are a Wellington-based company, working primarily from our central office. We value in-person collaboration but also offer flexibility to work from home when it makes sense.\n\n(You must be a New Zealand Citizen to apply and be eligible for a government security clearance.) ",
    //         "id": 10,
    //         "job_title": "Software Engineers, All Levels",
    //         "notes": "",
    //         "status": "Interested",
    //         "updated_at": "2025-04-15T22:05:28.710805+00:00",
    //         "user_id": "0632b030-1a5a-4cfb-aab8-e2cdff33ddc5"
    //     },
    //     {
    //         "application_date": "2025-04-15T12:00:00+00:00",
    //         "application_url": "https://www.linkedin.com/jobs/view/4208473883/",
    //         "company_name": "Starboard Maritime Intelligence",
    //         "created_at": "2025-04-15T22:05:28.710805+00:00",
    //         "description": "Build software that defends the frontlines of the global ocean.\n\nAt Starboard, we develop mission-critical systems that protect maritime borders, infrastructure, and national interests. Our platform fuses multi-source data into real-time geospatial intelligence \u2014 trusted by defence, intelligence, and commercial operators around the world.\n\nFrom intercepting illicit vessels to safeguarding submarine cables, our software powers decision-making where failure isn\u2019t an option.\n\nWe\u2019re a rapidly scaling global team headquartered in Wellington, deploying modern, high-performance software to solve hard, real-world problems. As part of high-performance engineering team who care deeply about quality, ownership, and pace, you\u2019ll ship production code that drives mission outcomes.\nOur stack includes Go, Python, React, Postgres, Kubernetes, GCP, and Terraform.\n\nIf you\u2019re a mission-driven engineer ready to make an impact at the edge of national security and innovation, reach out. Email work@starboard.nz with your cover letter and CV.\n\nWe are a Wellington-based company, working primarily from our central office. We value in-person collaboration but also offer flexibility to work from home when it makes sense.\n\n(You must be a New Zealand Citizen to apply and be eligible for a government security clearance.) ",
    //         "id": 10,
    //         "job_title": "Software Engineers, All Levels",
    //         "notes": "",
    //         "status": "Interested",
    //         "updated_at": "2025-04-15T22:05:28.710805+00:00",
    //         "user_id": "0632b030-1a5a-4cfb-aab8-e2cdff33ddc5"
    //     },
    //     {
    //         "application_date": "2025-04-15T12:00:00+00:00",
    //         "application_url": "https://www.linkedin.com/jobs/view/4208473883/",
    //         "company_name": "Starboard Maritime Intelligence",
    //         "created_at": "2025-04-15T22:05:28.710805+00:00",
    //         "description": "Build software that defends the frontlines of the global ocean.\n\nAt Starboard, we develop mission-critical systems that protect maritime borders, infrastructure, and national interests. Our platform fuses multi-source data into real-time geospatial intelligence \u2014 trusted by defence, intelligence, and commercial operators around the world.\n\nFrom intercepting illicit vessels to safeguarding submarine cables, our software powers decision-making where failure isn\u2019t an option.\n\nWe\u2019re a rapidly scaling global team headquartered in Wellington, deploying modern, high-performance software to solve hard, real-world problems. As part of high-performance engineering team who care deeply about quality, ownership, and pace, you\u2019ll ship production code that drives mission outcomes.\nOur stack includes Go, Python, React, Postgres, Kubernetes, GCP, and Terraform.\n\nIf you\u2019re a mission-driven engineer ready to make an impact at the edge of national security and innovation, reach out. Email work@starboard.nz with your cover letter and CV.\n\nWe are a Wellington-based company, working primarily from our central office. We value in-person collaboration but also offer flexibility to work from home when it makes sense.\n\n(You must be a New Zealand Citizen to apply and be eligible for a government security clearance.) ",
    //         "id": 10,
    //         "job_title": "Software Engineers, All Levels",
    //         "notes": "",
    //         "status": "Interested",
    //         "updated_at": "2025-04-15T22:05:28.710805+00:00",
    //         "user_id": "0632b030-1a5a-4cfb-aab8-e2cdff33ddc5"
    //     },
    //     {
    //         "application_date": "2025-04-15T12:00:00+00:00",
    //         "application_url": "https://www.linkedin.com/jobs/view/4208473883/",
    //         "company_name": "Starboard Maritime Intelligence",
    //         "created_at": "2025-04-15T22:05:28.710805+00:00",
    //         "description": "Build software that defends the frontlines of the global ocean.\n\nAt Starboard, we develop mission-critical systems that protect maritime borders, infrastructure, and national interests. Our platform fuses multi-source data into real-time geospatial intelligence \u2014 trusted by defence, intelligence, and commercial operators around the world.\n\nFrom intercepting illicit vessels to safeguarding submarine cables, our software powers decision-making where failure isn\u2019t an option.\n\nWe\u2019re a rapidly scaling global team headquartered in Wellington, deploying modern, high-performance software to solve hard, real-world problems. As part of high-performance engineering team who care deeply about quality, ownership, and pace, you\u2019ll ship production code that drives mission outcomes.\nOur stack includes Go, Python, React, Postgres, Kubernetes, GCP, and Terraform.\n\nIf you\u2019re a mission-driven engineer ready to make an impact at the edge of national security and innovation, reach out. Email work@starboard.nz with your cover letter and CV.\n\nWe are a Wellington-based company, working primarily from our central office. We value in-person collaboration but also offer flexibility to work from home when it makes sense.\n\n(You must be a New Zealand Citizen to apply and be eligible for a government security clearance.) ",
    //         "id": 10,
    //         "job_title": "Software Engineers, All Levels",
    //         "notes": "",
    //         "status": "Interested",
    //         "updated_at": "2025-04-15T22:05:28.710805+00:00",
    //         "user_id": "0632b030-1a5a-4cfb-aab8-e2cdff33ddc5"
    //     },
    //     {
    //         "application_date": "2025-04-15T12:00:00+00:00",
    //         "application_url": "https://www.linkedin.com/jobs/view/4208473883/",
    //         "company_name": "Starboard Maritime Intelligence",
    //         "created_at": "2025-04-15T22:05:28.710805+00:00",
    //         "description": "Build software that defends the frontlines of the global ocean.\n\nAt Starboard, we develop mission-critical systems that protect maritime borders, infrastructure, and national interests. Our platform fuses multi-source data into real-time geospatial intelligence \u2014 trusted by defence, intelligence, and commercial operators around the world.\n\nFrom intercepting illicit vessels to safeguarding submarine cables, our software powers decision-making where failure isn\u2019t an option.\n\nWe\u2019re a rapidly scaling global team headquartered in Wellington, deploying modern, high-performance software to solve hard, real-world problems. As part of high-performance engineering team who care deeply about quality, ownership, and pace, you\u2019ll ship production code that drives mission outcomes.\nOur stack includes Go, Python, React, Postgres, Kubernetes, GCP, and Terraform.\n\nIf you\u2019re a mission-driven engineer ready to make an impact at the edge of national security and innovation, reach out. Email work@starboard.nz with your cover letter and CV.\n\nWe are a Wellington-based company, working primarily from our central office. We value in-person collaboration but also offer flexibility to work from home when it makes sense.\n\n(You must be a New Zealand Citizen to apply and be eligible for a government security clearance.) ",
    //         "id": 10,
    //         "job_title": "Software Engineers, All Levels",
    //         "notes": "",
    //         "status": "Interested",
    //         "updated_at": "2025-04-15T22:05:28.710805+00:00",
    //         "user_id": "0632b030-1a5a-4cfb-aab8-e2cdff33ddc5"
    //     },
    // ].filter( (application) => application.status === "Interested") as ApplicationData[];
    const interestedApplications: ApplicationData[] = allApplications.filter( (application) => application.status === "Interested");


    console.log("interestedApplications", interestedApplications);

    if (interestedApplications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-normal dark:text-white"
                    {...suppressMissingAttributes}
                >
                    No interested applications found.
                </Typography>
            </div>
        )
    }

    return (
        <table className="w-full min-w-max table-auto text-left  dark:border-t-darkBorder">
            <thead className="sticky top-0 z-10 ">
                <tr>
                    {TABLE_HEAD.map((head, index) => (
                        <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 dark:bg-primaryDark dark:border-darkBorder" {...suppressMissingAttributes}
                        >
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className={`flex items-center justify-between gap-2 font-normal leading-none opacity-70 ${(index === TABLE_HEAD.length - 1) ? "justify-end pr-4" : ""} dark:text-white`}
                                {...suppressMissingAttributes}
                            >
                                {head}{" "}
                                {index < TABLE_HEAD.length - 1 && (
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                )}
                            </Typography>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="overflow-x-scroll">
                {
                    interestedApplications.map(
                        ({ id, img, job_title, company_name, status, application_date }: ApplicationData, index) => {
                            const viewApplication = () => navigate(`/dashboard/applications/${id}`);

                            const imgUrl = img ? img : getCompanyLogoUrl(company_name);

                            return (
                                <tr key={index} onClick={viewApplication} className="hover:cursor-pointer border-b dark:border-darkBorder">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <CompanyLogo url={imgUrl} alt={company_name} />
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal dark:text-white"
                                                    {...suppressMissingAttributes}
                                                >
                                                    {company_name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal dark:text-white"
                                                {...suppressMissingAttributes}
                                            >
                                                {job_title}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="w-max">
                                            <BasicChip value={status} color={STATUS_MAP[status]} />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal dark:text-white"
                                            {...suppressMissingAttributes}
                                        >
                                            {formatDate(application_date)}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        }
                    )
                }
            </tbody>
        </table>
    )
}

