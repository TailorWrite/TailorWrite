import { useEffect, useState } from 'react';
import clsx from 'clsx';

import Nav from '../common/Nav'; 

import lightModeProjectImage from '../../assets/lightMode.png';
import darkModeProjectImage from '../../assets/darkMode.png';
import { useDarkMode } from '../../hooks/useDarkMode';
import PathConstants from '../../pathConstants';
import { Link } from 'react-router-dom';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function Example() {
    
    return (
        <div className="dark:bg-primaryDark overflow-x-hidden">
            <NewHeroSection />
            <FeaturesSection />
            {/* <ConcaveConnector className="z-10 w-full bg-secondaryDark fill-neutral-100 dark:fill-primaryDarkAccent" /> */}
            <Testimonials />
            <SetUpInstructions />
        </div>
    )
}

const NewHeroSection = () => {

    const [isDarkMode, ] = useDarkMode();
    const [projectImage, setProjectImage] = useState(lightModeProjectImage);

    // If darkmode changes update the image
    useEffect(() => {
        if (isDarkMode) {
            setProjectImage(darkModeProjectImage);
        } else {
            setProjectImage(lightModeProjectImage);
        }
    } , [isDarkMode]);


    return (
        <div className="relative">
            <Nav /> 

            <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
                
                <div className="mx-auto max-w-6xl pt-32 sm:pt-32 lg:pt-32">
                    <div className="text-center flex flex-col gap-10 ">

                        <div>
                            <h1 className="text-8xl font-bold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
                                    Track <span className="text-blue-500">your</span> <br /> Job Applications <span className="text-blue-400"></span>
                            </h1>
                            <p className="mt-6 text-xl font-bold text-gray-600 dark:text-gray-400">
                                Get started for <span className="text-blue-500 dark:text-blue-400">free</span> and on your device.
                            </p>
                        </div>

                        <ActionButtons />

                        <img 
                            className="mx-auto rounded-xl shadow-lg dark:shadow-2xl dark:shadow-white/20"
                            src={projectImage} 
                        />
                    </div>

                    <div className="-z-10 absolute bottom-0 left-0 w-full fill-primaryDarkAccent">

                        <CustomSVG />


                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 90.85"><path d="M0 0v90.85h1920V.37C1634.07 53 1307.62 82.85 961 82.85 613.57 82.85 286.41 52.88 0 0" data-name="Layer 2" style={{fill:"#101010"}} /></svg> */}
                        {/* <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                            </svg> */}
                    </div>
                </div>
                
            </div>

            <ConcaveConnector className="absolute -bottom-1 fill-neutral-100 dark:fill-secondaryDark" />
        </div>
    )
}

const FeaturesSection = () => {

    const FeatureList = [
        {
            title: "Track Applications",
            description: "Keep track of all your job applications in one place. Never lose track of your applications again.",
            icon: "📝",
            image: lightModeProjectImage
        },
        {
            title: "Generate Cover Letters",
            description: "Utilize our cover letter generator tailored cover letters for each application.",
            icon: "🚀",
            image: darkModeProjectImage
        },
        {
            title: "Personalised Cover Letters",
            description: "Integrate your personal information to generate cover letters that are unique to you.",
            icon: "🗂",
            image: lightModeProjectImage
        },
        {
            title: "Mobile Friendly",
            description: "Use TailorWrite on your phone, tablet, or computer. Access your applications from anywhere.",
            icon: "📱",
            image: lightModeProjectImage
        }

    ]

    const [currentFeature, setCurrentFeature] = useState(FeatureList[0]);


    return (
        <div id="features" className="relative w-screen bg-neutral-100 dark:bg-secondaryDark">
            <div className="relative flex flex-col gap-20 mx-auto max-w-xl lg:max-w-6xl pt-20 sm:pt-20 lg:pt-20">
                <div className="text-center flex flex-col gap-10 ">
                    <div className="flex flex-col gap-5">
                        <span className="text-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 inline-block text-transparent bg-clip-text">
                            What is TailorWrite?
                        </span>
                        <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            A <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 inline-block text-transparent bg-clip-text">simple</span> way to track your job applications.
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-[33%_auto] gap-10">

                    {/* Buttons for large screen size */}
                    <div className="hidden lg:flex flex-col gap-5">

                        {FeatureList.map((feature, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentFeature(feature)}
                                className={clsx(
                                    "p-4 rounded-lg bg-neutral-200 dark:bg-neutral-800 border-2",
                                    currentFeature.title === feature.title ? "border-blue-500" : "border-transparent"
                                )}
                            >
                                <div className="flex flex-row gap-5 text-left">

                                    {typeof feature.icon === "string" ? (
                                        <span className="text-3xl">{feature.icon}</span>
                                    ) : (
                                        feature.icon
                                    )}


                                    <div>
                                        <h2 className="text-xl font-bold dark:text-white">{feature.title}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>

                                    </div>
                                </div>
                            </button>
                        ))
                        
                        }

                    </div>

                    {/* Buttons for mobile */}
                    <div className="flex flex-row justify-around gap-5 lg:hidden">

                        {FeatureList.map((feature, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentFeature(feature)}
                                className={clsx(
                                    "p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 border-2 w-48",
                                    currentFeature.title === feature.title ? "border-blue-500" : "border-transparent"
                                )}
                            >
                                <div className="flex flex-row justify-around text-left">

                                    {typeof feature.icon === "string" ? (
                                        <span className="text-xl">{feature.icon}</span>
                                    ) : (
                                        feature.icon
                                    )}


                                    <h2 className="text-xl font-bold dark:text-white">{feature.title.split(' ')[0]}</h2>
                                </div>
                            </button>
                        ))

                        }

                    </div>

                    {/* Image */}
                    <div className="hidden lg:flex flex-col gap-5 justify-center rounded-xl bg-neutral-100 dark:bg-secondaryDark border dark:border-darkBorder/50 overflow-hidden">

                        <div className="relative h-full">
                            <img 
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-10 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-white/10"
                                src={currentFeature.image} 
                            />
                        </div>
                    </div>

                    <span className="lg:hidden border dark:border-darkBorder rounded-full opacity-50 mx-5 -mt-5"></span>

                    <p className="lg:hidden text-lg text-center text-gray-600 dark:text-gray-400">{currentFeature.description}</p>
                    <img id="mobile-img" className="lg:hidden rounded-xl shadow-lg dark:shadow-2xl dark:shadow-white/5" src={currentFeature.image} />
                    

                </div>
                
                <ActionButtons /> 

            </div>
        </div>
    )
}

interface Testimonial {
    name: string;
    title: string;
    feedback: string;
    image: string;
    link: string;
}

const Testimonials = () => {

    const Testimonials: Testimonial[] = [
        {
            name: "Ben Sampson",
            title: "Photographer",
            feedback: "I have been using TailorWrite for a while now and it has helped me stay organized in my job search. The UI is clean and easy to use and the cover letter generator is a game changer when applying to jobs.",
            image: "https://media.licdn.com/dms/image/v2/D5635AQFtN8CwbkeWxg/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1712377661621?e=1745359200&v=beta&t=auTY1mosAW4D6grLhhV6DlSzbmWYNUlhI9saqFGI-1Y",
            link: "https://stobitephotography.mypixieset.com"
        },
        {
            name: "Kevin Albert",
            title: "Student at University of Otago",
            feedback: "TailorWrite has helped me keep track of all my job applications. I love the cover letter generator.",
            image: "https://www.kevinalbert.life/_next/image?url=%2Fassets%2Fphoto.png&w=1920&q=100",
            link: "https://www.kevinalbert.life"
        },
        {
            name: "James Robiony-Rogers",
            title: "Student at University of Otago",
            feedback: "I love the mobile friendly design. I can access my applications from anywhere. I love the mobile friendly design. I can access my applications from anywhere. I love the mobile friendly design. I can access my applications from anywhere.",
            image: "https://avatars.githubusercontent.com/u/43721451?v=4",
            link: "https://github.com/JamesRobionyRogers"
        },
        {
            name: "Dyrel Lumiwes",
            title: "Student at University of Otago",
            feedback: "Thanks to TailorWrite, I have been able to keep track of all my job applications. Keeping track of my applications enabled me to easily recap cover letters I had submitted prior to interviews.",
            image: "https://media.licdn.com/dms/image/v2/D5603AQGBCJkL-nO0NA/profile-displayphoto-shrink_800_800/B56ZYrvaylHQAc-/0/1744490574806?e=1750291200&v=beta&t=Ry9LtYAqH_jzZV4UhbN07rgLd25uOGZaZy7zJLAlnLw",
            link: "https://www.linkedin.com/in/dyrel-lumiwes-2b1686245/"
        },
        {
            name: "Jess Tyrrell",
            title: "Quantitative Trader at SIG",
            feedback: "Wow, the web scraping feature is amazing. Simply pasting a seek link and having the job description auto populate is a game changer.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS4Jqxv1lHuM7dHDNl6lM45KXlQBWYxxmgvQ&s",
            link: "https://www.linkedin.com/in/jess-tyrrell-420a63287/"
        },
        {
            name: "Corban Surtees",
            title: "Software Engineer at Magiq Software",
            feedback: "Wow, the web scraping feature is amazing. Simply pasting a seek link and having the job description auto populate is a game changer.",
            image: "https://waicol.digi.school.nz/year11/2019/surteesc/Assesment/images/hayday.jpg",
            link: "https://github.com/CorbanSurtees"
        },
    ]

    const testimonialsInColumns = (testimonials: Testimonial[]): Testimonial[][] => {
        const columns = 3;
        const result: Testimonial[][] = Array.from({ length: columns }, () => []);
        const maxColumnHeight = Math.ceil(testimonials.length / columns);

        // Order testimonials based on length - longest to shortest
        testimonials.sort((a, b) => b.feedback.length - a.feedback.length);
        console.log(testimonials);

        // Add the longest testimonials to the middle column
        const middleColumnIndex = 1;
        while (result[middleColumnIndex].length < maxColumnHeight && testimonials.length > 0) {
            result[middleColumnIndex].push(testimonials.shift() as Testimonial);
        }

        // Alternate between the other columns adding the next longest testimonial
        let columnIndex = 0;
        testimonials.forEach((testimonial) => {
            result[columnIndex].push(testimonial);
            columnIndex = (columnIndex == 0) ? 2 : 0;
        });

        return result;



        // let columnIndex = 0;

        // testimonials.forEach((testimonial) => {
        //     result[columnIndex].push(testimonial);
        //     columnIndex = (columnIndex + 1) % columns;
        // });

        // // Ensure the middle column has the least amount of testimonials
        // if (columns > 1) {
        //     const middleIndex = Math.floor(columns / 2);
        //     for (let i = 0; i < columns; i++) {
        //         if (i !== middleIndex && result[i].length < result[middleIndex].length) {
        //             [result[i], result[middleIndex]] = [result[middleIndex], result[i]];
        //         }
        //     }
        // }

        // return result;
    }

    const testimonialsMasonry = testimonialsInColumns(Testimonials);

    const Metrics = [
        {
            title: "Users",
            count: 1000
        },
        {
            title: "Applications Tracked",
            count: 10000
        },
        {
            title: "Cover Letters Generated",
            count: 5000
        },
    ]

    return (
        <div id="why-use" className="relative w-screen bg-neutral-100 dark:bg-secondaryDark">

            <div className="relative flex flex-col gap-20 mx-auto max-w-xl lg:max-w-6xl py-20 sm:py-20 lg:py-20">
                <div className="text-center flex flex-col gap-10 ">
                    <div className="flex flex-col gap-5">
                        <span className="text-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 inline-block text-transparent bg-clip-text">
                            Why use TailorWrite?
                        </span>
                        <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            Don't take our word. 
                            <br />
                            Take <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 inline-block text-transparent bg-clip-text">our</span> users'.
                        </h1>
                    </div>

                    {/* Masonry Grid of twitter style feedback */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                        {testimonialsMasonry.map((column, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                {column.map((testimonial, index) => (
                                    <div key={index} className="flex flex-col gap-5 p-5 rounded-lg border border-lightBorder dark:border-darkBorder bg-neutral-200 dark:bg-neutral-800 shadow-lg dark:shadow-2xl">
                                        {/* Card heading: Profile picture, name, username, and twitter icon */}
                                        <div className="flex flex-row text-left justify-between">
                                            <div className="flex flex-row gap-3">
                                                <img className="rounded-full size-12 bg-secondaryDark" src={testimonial.image} />
                                                <div>
                                                    <p className=" text-lg font-bold dark:text-white">{testimonial.name}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p> 
                                                </div>
                                            </div>

                                            {/* Verified logo */}
                                            <a href={testimonial.link} target="_blank" >
                                                <CheckBadgeIcon className="size-5 text-blue-500" />
                                            </a>
                                        </div>

                                        <p className="text-left text-md text-gray-600 dark:text-gray-400">{testimonial.feedback}</p>
                                    </div>
                                ))}
                            </div>
                        ))}

                        
                    </div>

                    {/* User Metrics */}
                    <div className="mt-10 flex flex-row justify-around">

                        {Metrics.map((metric, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 inline-block text-transparent bg-clip-text">
                                    {metric.count}
                                    <span className="my-auto">+</span>
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400">{metric.title}</p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

const SetUpInstructions: React.FC = () => (
    <></>
)

const ActionButtons = () => {

    const handleSmoothScroll = () => {
        document.getElementById("features")?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="flex flex-row justify-center gap-5">
            <Link to={PathConstants.SIGNUP}>
                <button className="min-w-52 bg-primaryDarkAccent text-white p-4 font-bold text-lg rounded-lg">
                    Get started
                </button>
            </Link>

            {/* <a href="#features"> */}
            <button className="min-w-52 border border-darkBorder p-4 font-bold text-lg rounded-lg dark:text-white" onClick={handleSmoothScroll}>
                    Learn more <span aria-hidden="true">→</span>
                </button>
            {/* </a> */}
        </div>
    )
}

const CustomSVG: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="0 0 1920 852.6"
        xmlSpace="preserve"
        className="scale-[180%]"
    >
        <style type="text/css">
            {`
        .st0 { clip-path: url(#SVGID_2_); }
        .st1 { clip-path: url(#SVGID_4_); }
        .st2 { fill: #0C49C2; }
        .st3 { clip-path: url(#SVGID_6_); }
        .st4 { fill: #1D63ED; }
      `}
        </style>
        <g>
            <defs>
                <rect id="SVGID_1_" y="-25.3" width="1920" height="878" />
            </defs>
            <clipPath id="SVGID_2_">
                <use xlinkHref="#SVGID_1_" style={{ overflow: 'visible' }} />
            </clipPath>
            <g className="st0">
                <g>
                    <defs>
                        <rect
                            id="SVGID_3_"
                            x="306.7"
                            y="-394.8"
                            transform="matrix(0.2579 -0.9662 0.9662 0.2579 46.3515 1342.8112)"
                            width="1181.3"
                            height="2072.1"
                        />
                    </defs>
                    <clipPath id="SVGID_4_">
                        <use xlinkHref="#SVGID_3_" style={{ overflow: 'visible' }} />
                    </clipPath>
                    <g className="st1">
                        <path
                            className="st2"
                            d="M-4.8,3.5C124.8-17.2,245.6,57,346.7,140.9S544,323,666.9,361.9c130.5,41.3,274.3,9.9,408.8-34s268.5-100.5,406.7-109.9c187.6-12.7,373.6,67.8,497.7,215.4c-47.9,231.1-96.7,472.9-144.6,703.9c-9.7,47-21.1,97.1-53,130.9c-42.9,45.3-107.4,46.2-164.6,43.3c-383.3-19.7-763.9-76.7-1136.1-170.4c-110.5-27.8-221.6-59.5-318.6-121.3S-16.5,862.1-45,740.4c-20.1-85.8-12.2-178.1-4.3-268.2C-35.5,316.7-18.5,159.1-4.8,3.5z"
                        />
                    </g>
                </g>
                <g>
                    <defs>
                        <rect
                            id="SVGID_5_"
                            x="393.2"
                            y="-337.7"
                            transform="matrix(0.2626 -0.9649 0.9649 0.2626 2.4456 1396.17)"
                            width="1043"
                            height="2068.3"
                        />
                    </defs>
                    <clipPath id="SVGID_6_">
                        <use xlinkHref="#SVGID_5_" style={{ overflow: 'visible' }} />
                    </clipPath>
                    <g className="st3">
                        <path
                            className="st4"
                            d="M5.7,98.2c127.8-14.2,249.3,56,351.5,134.1S557,401.2,679.6,440c130.3,41.2,271.9,18,404.1-16.6s263.5-80.5,400.1-84.2c185.4-5,371.6,72.9,498.1,208.6c-41.8,204.2-84.2,417.9-126,622.2c-8.5,41.5-18.5,85.8-49.3,114.8c-41.4,39-105.3,37.6-161.9,33c-381.2-30.5-759-94.1-1129.3-189.8c-110.1-28.5-220.9-60.4-318.5-118.7C99.3,950.9,15,862.6-16.1,753.3c-22-77.1-16.5-159.1-10.8-239.1C-17.1,376.1-4.1,236.3,5.7,98.2z"
                        />
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

interface ConcaveConnectorProps {
    className: string;
}

const ConcaveConnector: React.FC<ConcaveConnectorProps> = ({ className }) => (
    <svg 
        className={clsx(className)}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 90.85">
        <path d="M0 0v90.85h1920V.37C1634.07 53 1307.62 82.85 961 82.85 613.57 82.85 286.41 52.88 0 0" data-name="Layer 2" />
    </svg>
)