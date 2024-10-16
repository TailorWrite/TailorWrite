import { Color } from "./components/common/BasicChip";

export const suppressMissingAttributes = {
    placeholder: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
};

// Exporting Types
export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    account_info: {
        first_name: string;
        last_name: string;
        bio: string;
        phone: string;
    };
}

// Exporting Interfaces
export interface UserProfile {
    name: string,
    email: string,
    img: string | null,
}

export interface StatusMap {
    Applied: Color,
    Interview: Color,
    Offer: Color,
    Rejected: Color,
}

export interface ApplicationDocuments {
    name: string,
    size: string,
    link: string,
    uploaded?: boolean; 
}

export interface ApplicationData {
    id: string,
    img: string | null,
    company_name: string,
    job_title: string,
    description?: string,
    status: ApplicationStatus,
    application_date: string,
    application_url: string,
    notes?: string,
    documents?: ApplicationDocuments[],
}

export interface ExperienceData {
    id: string,
    job_title: string,
    company_name: string,
    is_current_job: boolean,
    start_date: Date,
    end_date: Date,
    description: string,
}

export interface EducationData {
    id: string,
    institution_name: string,
    degree: string,
    field_of_study: string,
    start_date: Date,
    end_date: Date,
    description: string,
}

export interface ApplicationAction {
    name: string,
    color: string,
    icon: React.FC | React.ComponentType<React.SVGProps<SVGSVGElement>>,
    action: () => void,
}


export interface AxiosError {
    response: {
        data: {
            error: string,
        },
    },
}

export interface ActionDataProps { error: string, success: string }