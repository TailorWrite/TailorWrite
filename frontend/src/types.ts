import { Color } from "./components/common/BasicChip";

export const suppressMissingAttributes = {
    placeholder: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
};

// Exporting Types
export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

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